const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  reviews: [
    {
      username: String,
      rating: Number,
      comment: String,
    },
  ],
  // Add any other hotel-specific fields you need
});

module.exports = mongoose.model('Hotel', hotelSchema);
