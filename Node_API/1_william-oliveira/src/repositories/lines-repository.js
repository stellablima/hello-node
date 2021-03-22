const mongoose = require('mongoose');
//require('../models/Line');
const Line = mongoose.model('lines'); //fazer com uma linha só no champion

exports.listLines = async () => {
  const res = await Line.find({}, 'line -_id');
  return res;
};

exports.createLine = async data => {
  const line = new Line(data);
  await line.save();
};

exports.updateLine = async (id, data) => {
  await Line.findByIdAndUpdate(id, {
    $set: data
  });
};

exports.deleteLine = async id => {
  await Line.findByIdAndDelete(id);
};