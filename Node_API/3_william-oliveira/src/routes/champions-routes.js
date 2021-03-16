const express = require('express');
const router = express.Router();
const championsController = require('../controllers/champions-controller');

router.get('/', championsController.listChampions);
router.post('/', championsController.createChampion);

module.exports = router;