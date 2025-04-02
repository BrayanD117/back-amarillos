const express = require('express');
const router = express.Router();
const authController = require('../controllers/autenticacion');

router.post('/', authController.login);

module.exports = router;