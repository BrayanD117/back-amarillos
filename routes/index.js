const express = require('express');
const router = express.Router();

const rolesRoutes = require('./rol');

router.use('/rol', rolesRoutes);

module.exports = router;
