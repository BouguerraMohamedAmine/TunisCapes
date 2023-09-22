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
  pictures: [{
    type: String,
    required: false,
  }],
});

module.exports = mongoose.model('Mountain', mountainSchema);
