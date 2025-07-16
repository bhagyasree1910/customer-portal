// src/App.js

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';              // ✅ FIXED
import Login from './pages/Login';                    // ✅ FIXED
import Dashboard from './pages/Dashboard';            // ✅ FIXED
import AdminPanel from './pages/AdminPanel';          // ✅ FIXED
import Navbar from './components/Navbar';             // ✅ FIXED
import ProtectedRoute from './components/ProtectedRoute'; // ✅ FIXED
import MyReferrals from './pages/MyReferrals';
import AdminReferrals from './pages/AdminReferrals';
import EditProfile from './pages/EditProfile';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        } />
        <Route path="/my-referrals" element={
  <ProtectedRoute>
    <MyReferrals />
  </ProtectedRoute>
} />

<Route path="/admin/referrals" element={
  <ProtectedRoute>
    <AdminReferrals />
  </ProtectedRoute>
} />
<Route path="/edit-profile" element={
  <ProtectedRoute>
    <EditProfile />
  </ProtectedRoute>
} />
      </Routes>
    </Router>
  );
}

export default App;
