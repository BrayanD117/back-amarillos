const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/rol');

router.post('/', rolesController.createRol);
router.get('/', rolesController.getAllRoles);
router.get('/:id', rolesController.getRolById);
router.put('/:id', rolesController.updateRol);
router.delete('/:id', rolesController.deleteRol);

module.exports = router;
