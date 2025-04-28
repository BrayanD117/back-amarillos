const express = require('express');
const router = express.Router();
const docTypeController = require('../controllers/documentType');
const { verifyToken } = require('../middlewares/authJwt');

router.get('/', verifyToken, docTypeController.getAllDocTypes);
router.get('/:id', verifyToken, docTypeController.getDocTypeById);

module.exports = router;