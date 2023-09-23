const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City',
    required: true,
  },
  depth: {
    type: Number,
    required: true,
  },
  pictures: [{
    type: String,
    required: false,
  }],
});

module.exports = mongoose.model('Sea', seaSchema);
