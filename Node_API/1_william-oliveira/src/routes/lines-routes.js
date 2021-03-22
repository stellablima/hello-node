const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const linesController = require('../controllers/lines-controller');

router.get('/', linesController.listLines);
router.post('/', [
    check('champion').isLength({ min: 1}).withMessage("Campeão não encontrado"), //provisorio
    check('line').isLength({ min: 1, max:100 }).withMessage("A fala deve ter no mínimo 1 caracter.")
], linesController.createLine);
router.put('/:id', [//provisorio repetição?
    check('line').isLength({ min: 1, max:100 }).withMessage("A fala deve ter no mínimo 1 caracter.") 
], linesController.updateLine);
router.delete('/:id', linesController.deleteLine);

module.exports = router;