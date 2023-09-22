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
  review: {
    type: String,
    required: false,
  },
  pictures: [{
    type: String,
    required: false,
  }],
});

// Create and export the Museum model based on the schema
module.exports = mongoose.model('Museum', museumSchema);
