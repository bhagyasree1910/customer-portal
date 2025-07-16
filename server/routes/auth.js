const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateLoginId, generateReferralCode } = require('../utils/generateCodes');

// Register
router.post('/register', async (req, res) => {
  try {
    const {
      referredByCode,
      name,
      whatsapp,
      email,
      state,
      city,
      address,
      pinCode,
      password
    } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const loginId = generateLoginId();
    const referralCode = generateReferralCode();

    let referredBy = '';
    if (referredByCode) {
      const referrer = await User.findOne({ referralCode: referredByCode });
      if (referrer) {
        referredBy = referrer.name;
      }
    }

    const newUser = await User.create({
      name,
      whatsapp,
      email,
      state,
      city,
      address,
      pinCode,
      password: hashedPassword,
      loginId,
      referralCode,
      referredBy
    });

    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role, name: newUser.name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, loginId: newUser.loginId });
  } catch (err) {
    console.error('❌ Registration error:', err);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { loginId, password } = req.body;
    const user = await User.findOne({ loginId });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, user });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: 'Login failed' });
  }
});

module.exports = router;
