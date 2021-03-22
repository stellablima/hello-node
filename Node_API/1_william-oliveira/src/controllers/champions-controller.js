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

  exports.updateChampion = async (req, res) => {
    const {errors} = validationResult(req);
    if(errors.length > 0) {
      return res.status(400).send({message: errors})
    }
    try {
      await repository.updateChampion(req.params.id, req.body);
      res.status(200).send({
        message: 'Campeão atualizado com sucesso!'
      });
    } catch (e) {
      res.status(500).send({message: 'Falha ao atualizar campeão.'});
    }
  };

  exports.deleteChampion = async (req, res) => {
    try {
      await repository.deleteChampion(req.params.id);
      res.status(200).send({
        message: 'Campeão removido com sucesso!'
      });
    } catch (e) {
      res.status(500).send({message: 'Falha ao remover campeão.'});
    }
  };