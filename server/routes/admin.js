const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth'); // middleware to check token
const checkAdmin = require('../middleware/checkAdmin'); // middleware to ensure only admin can access

// 👮 Admin-only route to get all users
router.get('/users', authMiddleware, checkAdmin, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).lean(); // ✅ .lean() ensures plain JS objects
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

module.exports = router;
