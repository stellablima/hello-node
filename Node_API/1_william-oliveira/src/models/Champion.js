const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const schema
const Champion = new Schema({
  name: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('champions', Champion);
//module.exports = mongoose.model('Champions', schema);