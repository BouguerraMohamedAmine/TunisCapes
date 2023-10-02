const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  pictures: [{
    type: String, // Array of strings (image URLs or paths)
    required: false, // Whether pictures are required or not depends on your use case
  }],
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
  // Add any other city-specific fields you need
});

module.exports = mongoose.model('City', citySchema);
