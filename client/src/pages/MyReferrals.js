import { useEffect, useState } from 'react';
import axios from 'axios';

const MyReferrals = () => {
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    const fetchReferrals = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/user/my-referrals', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReferrals(res.data);
    };

    fetchReferrals();
  }, []);

  return (
    <div className="container mt-4">
      <h3>My Referrals</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Joined On</th>
          </tr>
        </thead>
        <tbody>
          {referrals.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyReferrals;
