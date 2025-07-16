import { useEffect, useState } from 'react';
import axios from 'axios';

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/user/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
        setForm(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/user/update', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUpdated(true);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  if (loading) return <div className="text-light text-center mt-5">Loading...</div>;
  if (!user) return <div className="text-danger text-center mt-5">User not found</div>;

  return (
    <div className="container mt-5 text-light" style={{ maxWidth: '600px' }}>
      <h3 className="text-center mb-4">Edit Profile</h3>

      {updated && <div className="alert alert-success">✅ Profile updated!</div>}

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="name"
          value={form.name || ''}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          className="form-control mb-2"
          name="whatsapp"
          value={form.whatsapp || ''}
          onChange={handleChange}
          placeholder="WhatsApp"
        />
        <input
          className="form-control mb-2"
          name="email"
          value={form.email || ''}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          className="form-control mb-2"
          name="state"
          value={form.state || ''}
          onChange={handleChange}
          placeholder="State"
        />
        <input
          className="form-control mb-2"
          name="city"
          value={form.city || ''}
          onChange={handleChange}
          placeholder="City"
        />
        <textarea
          className="form-control mb-2"
          name="address"
          value={form.address || ''}
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          className="form-control mb-3"
          name="pinCode"
          value={form.pinCode || ''}
          onChange={handleChange}
          placeholder="Pin Code"
        />

        <button type="submit" className="btn btn-primary w-100">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
