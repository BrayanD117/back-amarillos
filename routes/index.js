const express = require('express');
const router = express.Router();

const rolesRoutes = require('./rol');
const estadoRoutes = require('./estado');
const vehiclesRoutes = require('./vehiculo');

router.use('/rol', rolesRoutes);
router.use('/estado', estadoRoutes);
router.use('/vehiculos', vehiclesRoutes);

module.exports = router;