import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ loginId: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      alert('Login failed. Please check Member ID and Password.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100" style={{ background: '#1c1b2f' }}>
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%', background: '#811c63', color: 'white', borderRadius: '15px' }}>
        <h4 className="text-center mb-3">Welcome Back</h4>
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" placeholder="Member ID" name="loginId" onChange={handleChange} required />
          <div className="input-group mb-3">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter password"
              name="password"
              onChange={handleChange}
              required
            />
            <span className="input-group-text" onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
              👁
            </span>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary w-50 me-2">Login</button>
            <button className="btn btn-secondary w-50" onClick={() => navigate('/')}>Home</button>
          </div>
        </form>
        <p className="mt-3 text-center">Don't have an account? <a href="/" className="text-light text-decoration-underline">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;
