const express = require('express');
const router = express.Router();
const licenseCategoryController = require('../controllers/categoriaLicencia');

router.get('/', licenseCategoryController.getAllLicenseCategories);
router.get('/:id', licenseCategoryController.getLicenseCategoryById);

module.exports = router;