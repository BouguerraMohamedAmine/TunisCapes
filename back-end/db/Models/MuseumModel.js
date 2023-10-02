const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Museum model
const museumSchema = new Schema({
  name: {
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

// Create and export the Museum model based on the schema
module.exports = mongoose.model('Museum', museumSchema);
