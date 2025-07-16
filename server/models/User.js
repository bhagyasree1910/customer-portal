const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  whatsapp: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  state: { type: String },
  city: { type: String },
  address: { type: String },
  pinCode: { type: String },
  password: { type: String, required: true },
  loginId: { type: String, required: true, unique: true },
  referralCode: { type: String, required: true, unique: true },
  referredBy: { type: String, default: '' },
  role: { type: String, default: 'user' }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
