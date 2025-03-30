const express = require('express');
const router = express.Router();

const rolesRoutes = require('./rol');
const estadoRoutes = require('./estado');
const vehiclesRoutes = require('./vehiculo');
const usuarioRoutes = require('./usuario');

router.use('/rol', rolesRoutes);
router.use('/estado', estadoRoutes);
router.use('/vehiculos', vehiclesRoutes);
router.use('/usuario', usuarioRoutes);
module.exports = router;