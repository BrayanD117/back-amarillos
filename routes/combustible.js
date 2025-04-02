const express = require('express');
const router = express.Router();
const fuelController = require('../controllers/combustible');
const { verifyToken } = require('../middlewares/autenticacionJwt');

router.get('/', verifyToken, fuelController.getAllFuels);
router.get('/:id', verifyToken, fuelController.getFuelById);

module.exports = router;