const mongoose = require('mongoose');
const Champion = mongoose.model('champions');

exports.listChampions = async () => {
  const res = await Champion.find({}, 'name -_id');
  return res;
};

exports.createChampion = async data => {
  const champion = new Champion(data);
  await champion.save();
};

exports.updateChampion = async (id, data) => {
  await Champion.findByIdAndUpdate(id, {
    $set: data
  });
};

exports.deleteChampion = async id => {
  await Champion.findByIdAndDelete(id);
};

/*const mongoose = require('mongoose');
require('../models/Champion');
const Champion = mongoose.model('champions');*/
