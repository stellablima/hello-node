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

/*const mongoose = require('mongoose');
require('../models/Champion');
const Champion = mongoose.model('champions');*/
