const express = require('express');
const router = express.Router();
const transportSecretaryController = require('../controllers/transportSecretary');
const { verifyToken } = require('../middlewares/authJwt');

router.get('/options', verifyToken, transportSecretaryController.getOptions);

router.get('/', verifyToken, transportSecretaryController.getTransportSecretaries);

router.get('/:id', verifyToken, transportSecretaryController.getTransportSecretaryById);

router.post('/', verifyToken, transportSecretaryController.createTransportSecretary);

router.put('/:id', verifyToken, transportSecretaryController.updateTransportSecretary);

router.delete('/:id', verifyToken, transportSecretaryController.deleteTransportSecretary);

module.exports = router;