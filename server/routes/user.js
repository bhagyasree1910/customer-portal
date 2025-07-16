const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// ✅ Custom inline auth middleware (this works fine)
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// ✅ Get user profile
router.get('/me', auth, async (req, res) => {
  try {
    console.log('🔐 Authenticated User ID:', req.user.userId);
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error('❌ Error fetching user data:', err);
    res.status(500).json({ message: 'Failed to load user data' });
  }
});


// ✅ Update user profile
router.put('/update', authenticate, async (req, res) => {
  try {
    const updates = (({
      name, whatsapp, email, state, city, address, pinCode
    }) => ({ name, whatsapp, email, state, city, address, pinCode }))(req.body);

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

module.exports = router;
