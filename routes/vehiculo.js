const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehiculo');

router.post('/', vehiclesController.createVehicle);
router.get('/', vehiclesController.getAllVehicles);
router.get('/opciones', vehiclesController.getVehicleOptions);
router.get('/relaciones/:id', vehiclesController.getVehicleWithRelations);
router.get('/:id', vehiclesController.getVehicleById);
router.put('/:id', vehiclesController.updateVehicle);
router.delete('/:id', vehiclesController.deleteVehicle);

module.exports = router;