const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
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
  // Add any other restaurant-specific fields you need
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
