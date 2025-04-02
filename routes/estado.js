const express = require('express');
const router = express.Router();
const statusController = require('../controllers/estado');
const { verifyToken } = require('../middlewares/autenticacionJwt');

router.post('/', verifyToken, statusController.createStatus);
router.get('/', verifyToken, statusController.getAllStatus);
router.get('/:id', verifyToken, statusController.getStatusById);
router.put('/:id', verifyToken, statusController.updateStatus);
router.delete('/:id', verifyToken, statusController.deleteStatus);

module.exports = router;