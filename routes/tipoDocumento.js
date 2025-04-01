const express = require('express');
const router = express.Router();
const docTypeController = require('../controllers/tipoDocumento');
const { verifyToken } = require('../middlewares/autenticacionJwt');

router.get('/', verifyToken, docTypeController.getAllDocTypes);
router.get('/:id', verifyToken, docTypeController.getDocTypeById);

module.exports = router;