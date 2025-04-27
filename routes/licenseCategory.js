const express = require('express');
const router = express.Router();
const licenseCategoryController = require('../controllers/licenseCategory');
const { verifyToken } = require('../middlewares/authJwt');

router.get('/', verifyToken, licenseCategoryController.getAllLicenseCategories);
router.get('/:id', verifyToken, licenseCategoryController.getLicenseCategoryById);

module.exports = router;