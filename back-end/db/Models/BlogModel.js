const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
  userId: String,
  username: String,
  body: String,
  date: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  profileImage: String,
  images: [String],
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = { Blog };
