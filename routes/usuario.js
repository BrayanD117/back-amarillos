const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario');
const { verifyToken, isAdmin } = require('../middlewares/autenticacionJwt');

router.post('/', usuarioController.crearUsuario);
router.get('/', verifyToken, isAdmin, usuarioController.obtenerUsuarios);
router.get('/:id', verifyToken, usuarioController.obtenerUsuarioPorId);
router.put('/:id', verifyToken, isAdmin, usuarioController.actualizarUsuario);
router.delete('/:id', verifyToken, isAdmin, usuarioController.eliminarUsuario);

module.exports = router;