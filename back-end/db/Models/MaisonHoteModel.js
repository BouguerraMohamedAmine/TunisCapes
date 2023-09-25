const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const maisonHoteSchema = new Schema({
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
    required: false, // Change flase to false
  },
  price: {
    type: Number,
    required: true,
  },
  pictures: [{
    type: String,
    required: false,
  }],
  // Add any other maisonHote-specific fields you need
});

module.exports = mongoose.model('MaisonHote', maisonHoteSchema);
