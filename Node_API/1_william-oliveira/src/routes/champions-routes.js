const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const championsController = require('../controllers/champions-controller');

router.get('/', championsController.listChampions);
router.post('/',[
    check('name').isLength({ min: 1, max: 20}).withMessage("O nome precisa ter no mínimo 1 caracter."),
    check('route').isLength({ min: 2, max:3 }).withMessage("A rota deve ter 2 caracteres.")
], championsController.createChampion);
router.put('/:id', [
    //check if dado que recebi?
], championsController.updateChampion);
router.delete('/:id', championsController.deleteChampion);


module.exports = router;