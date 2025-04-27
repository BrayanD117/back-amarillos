const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicle');
const { verifyToken, isAdmin } = require('../middlewares/authJwt');

router.post('/', verifyToken, vehicleController.createVehicle);
router.get('/', verifyToken, vehicleController.getAllVehicles);
router.get('/options', verifyToken, vehicleController.getVehicleOptions);
router.get('/relations/:id', verifyToken, vehicleController.getVehicleWithRelations);
router.get('/:id', verifyToken, vehicleController.getVehicleById);
router.put('/:id', verifyToken, vehicleController.updateVehicle);
router.delete('/:id', verifyToken, vehicleController.deleteVehicle);

module.exports = router;