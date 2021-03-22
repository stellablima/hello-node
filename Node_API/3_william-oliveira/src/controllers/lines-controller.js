const { validationResult } = require('express-validator');
const repository = require('../repositories/lines-repository');

// list
exports.listLines = async (req, res) => {
    try {
      const data = await repository.listLines();
      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({message: 'Falha ao carregar as falas.'});
    }
  };
  
  // create
  exports.createLine = async (req, res) => {
    const {errors} = validationResult(req);
    if(errors.length > 0) {
      return res.status(400).send({message: errors})
    }//validação se ja existe no banco?
    try {
      await repository.createLine({
        champion: req.body.champion,
        line: req.body.line
      }); 
      res.status(201).send({message: 'Fala cadastrada com sucesso!'});
    } catch (e) {
      res.status(500).send({message: 'Falha ao cadastrar fala.'});
    }
  };