const express = require('express');
const router = express.Router();
const fuelController = require('../controllers/fuel');
const { verifyToken } = require('../middlewares/authJwt');

router.get('/', verifyToken, fuelController.getAllFuels);
router.get('/:id', verifyToken, fuelController.getFuelById);

module.exports = router;