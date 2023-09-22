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
  pictures: [{
    type: String, // Array of strings (image URLs or paths)
    required: false, // Whether pictures are required or not depends on your use case
  }],

  // Add any other restaurant-specific fields you need
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
