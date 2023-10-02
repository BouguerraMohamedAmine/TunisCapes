const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mountainSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City',
    required: true},
  height: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
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
  pictures: [{
    type: String,
    required: false,
  }],
});

module.exports = mongoose.model('Mountain', mountainSchema);
