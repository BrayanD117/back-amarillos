const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/user');
const { verifyToken, isAdmin } = require('../middlewares/authJwt');

router.post('/', usuarioController.createUser);


router.get('/options', usuarioController.getUserOptions);
router.get('/', verifyToken, isAdmin, usuarioController.getAllUsers);
router.get('/:id', verifyToken, usuarioController.getUserById);


router.put('/:id', verifyToken, isAdmin, usuarioController.updateUser);


router.delete('/:id', verifyToken, isAdmin, usuarioController.deleteUser);

module.exports = router;