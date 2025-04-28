const express = require('express');
const router = express.Router();
const fareController = require('../controllers/fare');
const { verifyToken } = require('../middlewares/authJwt');

router.get('/options', verifyToken, fareController.getOptions);

router.get('/transport-secretary/:transportSecretaryId', verifyToken, fareController.getFaresByTransportSecretary);

router.get('/', verifyToken, fareController.getFares);

router.get('/:id', verifyToken, fareController.getFareById);

router.post('/', verifyToken, fareController.createFare);

router.put('/:id', verifyToken, fareController.updateFare);

router.delete('/:id', verifyToken, fareController.deleteFare);

module.exports = router;