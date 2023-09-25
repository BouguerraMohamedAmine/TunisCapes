const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const desertSchema = new Schema({
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
    required: false,
  },
  pictures: [{
    type: String,
    required: false,
  }],
});

module.exports = mongoose.model('Desert', desertSchema);
