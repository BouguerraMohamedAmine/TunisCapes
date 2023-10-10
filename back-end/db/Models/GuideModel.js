const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  name: String,
  location: String,
  phoneNumber: String,
  languagesSpoken: String,
  email: String,
  password: String,
  username: String,
  profileImage: String, // Profile image URL or path
});

const Guide = mongoose.model('Guide', guideSchema);

module.exports = Guide;
