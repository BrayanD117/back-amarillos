const express = require('express');
const router = express.Router();
const bloodTypeController = require('../controllers/grupoSanguineo');

router.get('/', bloodTypeController.getAllBloodTypes);
router.get('/:id', bloodTypeController.getBloodTypeById);

module.exports = router;