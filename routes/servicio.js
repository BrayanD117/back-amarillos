const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/servicio');
const { verifyToken } = require('../middlewares/autenticacionJwt');

router.get('/', verifyToken, serviceController.getAllServices);
router.get('/:id', verifyToken, serviceController.getServiceById);

module.exports = router;