const crypto = require('crypto');

function generateLoginId() {
  return 'ID-' + crypto.randomBytes(3).toString('hex').toUpperCase();
}

function generateReferralCode() {
  return 'REF-' + crypto.randomBytes(3).toString('hex').toUpperCase();
}

module.exports = {
  generateLoginId,
  generateReferralCode
};
