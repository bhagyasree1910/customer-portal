import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminReferrals = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchUsers = async () => {
      const res = await axios.get('/api/admin/referrals', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Referral Overview (Admin)</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>User</th><th>Email</th><th>Referral Code</th><th>Referred By</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.referralCode || '—'}</td>
              <td>{user.referredBy || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReferrals;
