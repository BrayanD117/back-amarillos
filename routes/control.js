const express = require('express');
const router = express.Router();
const controlController = require('../controllers/control');
const { verifyToken } = require('../middlewares/authJwt');

router.get('/options', verifyToken, controlController.getOptions);

router.get('/vehicle/:vehicleId', verifyToken, controlController.getControlsByVehicle);

router.get('/person/:personId', verifyToken, controlController.getControlsByPerson);

router.get('/', verifyToken, controlController.getControls);

router.get('/:id', verifyToken, controlController.getControlById);

router.post('/', verifyToken, controlController.createControl);

router.put('/:id', verifyToken, controlController.updateControl);

router.delete('/:id', verifyToken, controlController.deleteControl);

module.exports = router;