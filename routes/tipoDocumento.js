const express = require('express');
const router = express.Router();
const docTypeController = require('../controllers/tipoDocumento');

router.get('/', docTypeController.getAllDocTypes);
router.get('/:id', docTypeController.getDocTypeById);

module.exports = router;