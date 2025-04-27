const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service');
const { verifyToken } = require('../middlewares/authJwt');

router.get('/', verifyToken, serviceController.getAllServices);
router.get('/:id', verifyToken, serviceController.getServiceById);

module.exports = router;