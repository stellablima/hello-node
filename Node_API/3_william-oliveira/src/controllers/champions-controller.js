const { validationResult } = require('express-validator');
const repository = require('../repositories/champions-repository');

// list
exports.listChampions = async (req, res) => {
    try {
      const data = await repository.listChampions();
      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({message: 'Falha ao carregar as campeões.'});
    }
  };
  
  // create
  exports.createChampion = async (req, res) => {
    const {errors} = validationResult(req);
    if(errors.length > 0) {
      return res.status(400).send({message: errors})
    }
    
    try {
     await repository.createChampion({
        name: req.body.name,
        route: req.body.route
      });
      res.status(201).send({message: 'Campeão cadastrado com sucesso!'});
    } catch (e) {
      res.status(500).send({message: 'Falha ao cadastrar campeão.'});
    }
  };