const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City',
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  picture: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Event', eventSchema);
