const express = require('express');
const router = express.Router();

const rolesRoutes = require('./rol');
const estadoRoutes = require('./estado');

router.use('/rol', rolesRoutes);
router.use('/estado', estadoRoutes);

module.exports = router;
