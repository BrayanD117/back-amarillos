const express = require('express');
const router = express.Router();
const estadoController = require('../controllers/estado');

router.post('/', estadoController.createStatus);
router.get('/', estadoController.getAllStatus);
router.get('/:id', estadoController.getStatusById);
router.put('/:id', estadoController.updateStatus);
router.delete('/:id', estadoController.deleteStatus);

module.exports = router;
