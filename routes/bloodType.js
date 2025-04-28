const express = require('express');
const router = express.Router();
const bloodTypeController = require('../controllers/bloodType');
const { verifyToken } = require('../middlewares/authJwt');

router.get('/', verifyToken, bloodTypeController.getAllBloodTypes);
router.get('/:id', verifyToken, bloodTypeController.getBloodTypeById);

module.exports = router;