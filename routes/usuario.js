const express = require('express');
const router = express.Router();
const { crearUsuario } = require('../controllers/usuario');

router.post('/', crearUsuario);

module.exports = router;
