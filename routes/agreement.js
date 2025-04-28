const express = require('express');
const router = express.Router();
const agreementController = require('../controllers/agreement');
const { verifyToken } = require('../middlewares/authJwt');

router.get('/options', verifyToken, agreementController.getOptions);

router.get('/', verifyToken, agreementController.getAgreements);

router.get('/:id', verifyToken, agreementController.getAgreementById);

router.post('/', verifyToken, agreementController.createAgreement);

router.put('/:id', verifyToken, agreementController.updateAgreement);

router.delete('/:id', verifyToken, agreementController.deleteAgreement);

module.exports = router;