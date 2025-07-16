// src/pages/Dashboard.js

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error('❌ Failed to load user:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading user data...</div>;
  if (!user) return <div className="text-center mt-5 text-danger">Failed to load user data.</div>;

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow" style={{ background: '#fff8f9', borderRadius: '15px' }}>
        <h4 className="mb-3 text-center">Welcome, {user.name} 👋</h4>

        <p><strong>Login ID:</strong> {user.loginId}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>WhatsApp:</strong> {user.whatsapp}</p>
        <p><strong>State:</strong> {user.state}</p>
        <p><strong>City:</strong> {user.city}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Pincode:</strong> {user.pinCode}</p>
        <p><strong>Referral Code:</strong> {user.referralCode}</p>
        {user.referredBy && <p><strong>Referred By:</strong> {user.referredBy}</p>}

        <div className="text-center mt-4 d-flex justify-content-center gap-3">
          <button
            className="btn btn-outline-primary"
            onClick={() => alert(`Share this referral code with your friend: ${user.referralCode}`)}
          >
            Refer a Friend
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate('/edit-profile')}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
