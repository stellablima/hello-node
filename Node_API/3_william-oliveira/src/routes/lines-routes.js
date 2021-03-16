const express = require('express');
const router = express.Router();
const linesController = require('../controllers/lines-controller');

router.get('/', linesController.listLines);
router.post('/', linesController.createLine);

module.exports = router;