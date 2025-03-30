const express = require('express');
const router = express.Router();
const fuelController = require('../controllers/combustible');

router.get('/', fuelController.getAllFuels);
router.get('/:id', fuelController.getFuelById);

module.exports = router;