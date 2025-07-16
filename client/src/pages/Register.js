import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({
    referredByCode: '',
    name: '',
    whatsapp: '',
    email: '',
    state: '',
    city: '',
    address: '',
    pinCode: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', form);
      alert(`Registration successful!\nLogin ID: ${res.data.loginId}`);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'user');
      navigate('/dashboard');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100"
      style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
      <div className="card p-4"
        style={{
          maxWidth: '500px', width: '100%', background: '#d5e9eeff',
          color: '#1f2937', borderRadius: '20px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
        }}>
        <h4 className="text-center mb-3" style={{ color: '#764ba2', fontWeight: '600' }}>
          Create New Account
        </h4>

        <form onSubmit={handleSubmit}>
          <label>Referral Code (Optional)</label>
          <input className="form-control mb-2" name="referredByCode" onChange={handleChange} />

          <label>Name</label>
          <input className="form-control mb-2" name="name" onChange={handleChange} required />

          <label>WhatsApp</label>
          <input className="form-control mb-2" name="whatsapp" onChange={handleChange} required />

          <label>Email</label>
          <input className="form-control mb-2" type="email" name="email" onChange={handleChange} required />

          <label>State</label>
          <select className="form-control mb-2" name="state" onChange={handleChange} required>
            <option value="">Select State</option>
            <option>Andhra Pradesh</option>
            <option>Tamil Nadu</option>
            <option>Telangana</option>
            <option>Maharashtra</option>
          </select>

          <label>City</label>
          <input className="form-control mb-2" name="city" onChange={handleChange} required />

          <label>Address</label>
          <textarea className="form-control mb-2" name="address" rows={2} onChange={handleChange} required></textarea>

          <label>Pin Code</label>
          <input className="form-control mb-2" name="pinCode" onChange={handleChange} required />

          <label>Password</label>
          <div className="input-group mb-3">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="password"
              onChange={handleChange}
              required
            />
            <span className="input-group-text" onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
              👁
            </span>
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary w-50 me-2">Register</button>
            <button type="button" className="btn btn-secondary w-50" onClick={() => navigate('/')}>Home</button>
          </div>
        </form>

        <p className="mt-3 text-center">
          Have an account? <a href="/login" className="text-primary text-decoration-underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
