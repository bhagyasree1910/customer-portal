import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/users', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      const allUsers = res.data;
      setUsers(allUsers);
      setFilteredUsers(allUsers);

      // 🔍 Extract unique cities for dropdown
      const uniqueCities = [
        ...new Set(allUsers.map(user => user.city).filter(Boolean)),
      ];
      setCities(uniqueCities);
    } catch (err) {
      console.error('Error fetching users:', err);
      alert('Failed to fetch user data.');
    }
  };

  const handleFilter = () => {
    const from = fromDate ? new Date(fromDate + 'T00:00:00') : null;
    const to = toDate ? new Date(toDate + 'T23:59:59') : null;

    const filtered = users.filter(user => {
      const createdAt = new Date(user.createdAt);
      if (isNaN(createdAt)) return false;

      const cityMatch = selectedCity ? user.city === selectedCity : true;
      const dateMatch =
        (!from || createdAt >= from) && (!to || createdAt <= to);

      return cityMatch && dateMatch;
    });

    setFilteredUsers(filtered);
  };

  const handleExport = () => {
    const formattedUsers = filteredUsers.map(user => ({
      Name: user.name,
      Email: user.email,
      'Login ID': user.loginId,
      'Referral Code': user.referralCode,
      'Referred By': user.referredBy || '—',
      City: user.city || '—',
      'Created At': user.createdAt
        ? new Date(user.createdAt).toLocaleString('en-IN')
        : 'N/A',
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedUsers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

    XLSX.writeFile(workbook, 'Filtered_Users.xlsx');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Admin Panel - All Users</h2>

      {/* 🔍 Filters */}
      <div className="row mb-3">
        <div className="col-md-3">
          <label><strong>📅 From Date</strong></label>
          <input
            type="date"
            className="form-control"
            value={fromDate}
            onChange={e => setFromDate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label><strong>📅 To Date</strong></label>
          <input
            type="date"
            className="form-control"
            value={toDate}
            onChange={e => setToDate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label><strong>🏙️ Filter by City</strong></label>
          <select
            className="form-control"
            value={selectedCity}
            onChange={e => setSelectedCity(e.target.value)}
          >
            <option value="">All Cities</option>
            {cities.map((city, idx) => (
              <option key={idx} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3 d-flex align-items-end justify-content-between">
          <button className="btn btn-primary me-2" onClick={handleFilter}>
            🔍 Filter
          </button>
          <button className="btn btn-success" onClick={handleExport}>
            📥 Export to Excel
          </button>
        </div>
      </div>

      {/* 📊 Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Login ID</th>
              <th>Referral Code</th>
              <th>Referred By</th>
              <th>City</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.loginId}</td>
                  <td>{user.referralCode}</td>
                  <td>{user.referredBy || '—'}</td>
                  <td>{user.city || '—'}</td>
                  <td>
                    {user.createdAt && !isNaN(new Date(user.createdAt))
                      ? new Date(user.createdAt).toLocaleString('en-IN')
                      : 'N/A'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
