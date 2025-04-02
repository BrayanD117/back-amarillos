const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/rol');
const { verifyToken, isAdmin } = require('../middlewares/autenticacionJwt');

router.post('/', verifyToken, isAdmin, rolesController.createRole);
router.get('/', verifyToken, rolesController.getAllRoles);
router.get('/:id', verifyToken, rolesController.getRoleById);
router.put('/:id', verifyToken, isAdmin, rolesController.updateRole);
router.delete('/:id', verifyToken, isAdmin, rolesController.deleteRole);

module.exports = router;