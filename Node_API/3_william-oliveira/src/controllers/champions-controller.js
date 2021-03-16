const mongoose = require('mongoose');
require('../models/Champion');
const Champion = mongoose.model('champions');

// list
exports.listChampions = async (req, res) => {
    try {
      const data = await Champion.find({});
      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({message: 'Falha ao carregar as campeões.'});
    }
  };
  
  // create
  exports.createChampion = async (req, res) => {
    try {
      const champion = new Champion({
        name: req.body.name,
        route: req.body.route
      });
  
      console.log(champion)
  
      await champion.save();
  
      res.status(201).send({message: 'Campeão cadastrado com sucesso!'});
    } catch (e) {
      res.status(500).send({message: 'Falha ao cadastrar campeão.'});
    }
  };