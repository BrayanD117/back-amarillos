const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehiculo');
const { verifyToken, isAdmin } = require('../middlewares/autenticacionJwt');

router.post('/', verifyToken, isAdmin, vehiclesController.createVehicle);
router.get('/', verifyToken, isAdmin, vehiclesController.getAllVehicles);
router.get('/:id', verifyToken, vehiclesController.getVehicleById);
router.put('/:id',  verifyToken, isAdmin, vehiclesController.updateVehicle);
router.delete('/:id', verifyToken, isAdmin, vehiclesController.deleteVehicle);

module.exports = router;