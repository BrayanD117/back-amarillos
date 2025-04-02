const express = require('express');
const router = express.Router();
const licenseCategoryController = require('../controllers/categoriaLicencia');
const { verifyToken } = require('../middlewares/autenticacionJwt');

router.get('/', verifyToken, licenseCategoryController.getAllLicenseCategories);
router.get('/:id', verifyToken, licenseCategoryController.getLicenseCategoryById);

module.exports = router;