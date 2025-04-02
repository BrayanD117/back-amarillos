const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehiculo');
const { verifyToken, isAdmin } = require('../middlewares/autenticacionJwt');

router.post('/', verifyToken, vehiclesController.createVehicle);
router.get('/', verifyToken, vehiclesController.getAllVehicles);
router.get('/opciones', verifyToken, vehiclesController.getVehicleOptions);
router.get('/relaciones/:id', verifyToken, vehiclesController.getVehicleWithRelations);
router.get('/:id', verifyToken, vehiclesController.getVehicleById);
router.put('/:id', verifyToken, vehiclesController.updateVehicle);
router.delete('/:id', verifyToken, vehiclesController.deleteVehicle);

module.exports = router;