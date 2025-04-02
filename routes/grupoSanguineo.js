const express = require('express');
const router = express.Router();
const bloodTypeController = require('../controllers/grupoSanguineo');
const { verifyToken } = require('../middlewares/autenticacionJwt');

router.get('/', verifyToken, bloodTypeController.getAllBloodTypes);
router.get('/:id', verifyToken, bloodTypeController.getBloodTypeById);

module.exports = router;