const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true, // Ensure that this field is required
  },
  email: {
    type: String,
    required: true,
    // ...
  },
  password: {
    type: String,
    required: true,
  },
  reviews: [
    {
      reviewType: {
        type: String, // You can use "Hotel" or "Restaurant" to identify the review type
        required: false,
      },
      reviewId: {
        type: Schema.Types.ObjectId, // Reference to the hotel or restaurant review
        required: false,
      },
      rating: Number,
      comment: String,
    },
  ],
  profileImage: {
    type: String, // You can store the URL or path to the user's profile image
    // Add any validation rules or default values as needed
  },

});

module.exports = mongoose.model('User', userSchema);
