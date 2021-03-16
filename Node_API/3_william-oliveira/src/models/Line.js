const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//
const Line = new Schema({
  champion: {
    type: Schema.Types.ObjectId,
    ref: "champions",
    required: true,
    trim: true
  },
  line: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('lines', Line);