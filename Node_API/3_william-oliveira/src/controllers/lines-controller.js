const mongoose = require('mongoose');
require('../models/Line');
const Line = mongoose.model('lines');

// list
exports.listLines = async (req, res) => {
    try {
      const data = await Line.find({});
      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({message: 'Falha ao carregar as falas.'});
    }
  };
  
  // create
  exports.createLine = async (req, res) => {
    try {
      const line = new Line({
        champion: req.body.champion,
        line: req.body.line
      });
  
      console.log(line)
  
      await line.save();
  
      res.status(201).send({message: 'Fala cadastrada com sucesso!'});
    } catch (e) {
      res.status(500).send({message: 'Falha ao cadastrar fala.'});
    }
  };