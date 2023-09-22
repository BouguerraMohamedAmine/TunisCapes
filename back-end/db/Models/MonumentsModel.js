const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const monumentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City',
    required: true,
  },
  pictures: [{
    type: String,
    required: false,
  }],
  reviews: [
    {
      username: String,
      rating: Number,
      comment: String,
    },
  ],
  // Add any other monument-specific fields you need
});

module.exports = mongoose.model('Monument', monumentSchema);