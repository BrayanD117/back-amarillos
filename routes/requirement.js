const express = require('express');
const router = express.Router();
const requirementController = require('../controllers/requirement');
const { verifyToken } = require('../middlewares/authJwt');

router.get('/options', verifyToken, requirementController.getOptions);

router.get('/vehicles-without-requirements', verifyToken, requirementController.getVehiclesWithoutRequirements);

router.get('/vehicle/:vehicleId', verifyToken, requirementController.getRequirementByVehicle);

router.get('/', verifyToken, requirementController.getRequirements);

router.get('/:id', verifyToken, requirementController.getRequirementById);

router.post('/', verifyToken, requirementController.createRequirement);

router.put('/:id', verifyToken, requirementController.updateRequirement);

router.delete('/:id', verifyToken, requirementController.deleteRequirement);

module.exports = router;