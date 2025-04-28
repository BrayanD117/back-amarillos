const express = require('express');
const router = express.Router();
const surchargeController = require('../controllers/surcharge');
const { verifyToken } = require('../middlewares/authJwt');

router.get('/options', verifyToken, surchargeController.getOptions);

router.get('/', verifyToken, surchargeController.getSurcharges);

router.get('/:id', verifyToken, surchargeController.getSurchargeById);

router.post('/', verifyToken, surchargeController.createSurcharge);

router.put('/:id', verifyToken, surchargeController.updateSurcharge);

router.delete('/:id', verifyToken, surchargeController.deleteSurcharge);

module.exports = router;