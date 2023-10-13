const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const City = require ("./CityModel")
const desertSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City',
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  pictures: [{
    type: String,
    required: false,
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
});

module.exports = mongoose.model('Desert', desertSchema);
