const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company');
const { verifyToken } = require('../middlewares/authJwt');

router.get('/options', verifyToken, companyController.getOptions);

router.get('/', verifyToken, companyController.getCompanies);

router.get('/:id', verifyToken, companyController.getCompanyById);

router.post('/', verifyToken, companyController.createCompany);

router.put('/:id', verifyToken, companyController.updateCompany);

router.delete('/:id', verifyToken, companyController.deleteCompany);

module.exports = router;