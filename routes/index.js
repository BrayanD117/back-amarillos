const express = require('express');
const router = express.Router();

const rolesRoutes = require('./role');
const statusRoutes = require('./status');
const vehiclesRoutes = require('./vehicle');
const servicesRoutes = require('./service');
const fuelsRoutes = require('./fuel');
const docTypesRoutes = require('./documentType');
const bloodTypesRoutes = require('./bloodType');
const licenseCategoriesRoutes = require('./licenseCategory');
const usuarioRoutes = require('./user');
const authRoutes = require('./auth');
const cardRoutes = require('./card');
const agreementRoutes = require('./agreement');
const companyRoutes = require('./company');
const controlRoutes = require('./control');
const fareRoutes = require('./fare');
const requirementRoutes = require('./requirement');
const reviewRoutes = require('./review');
const surchargeRoutes = require('./surcharge');

router.use('/roles', rolesRoutes);
router.use('/status', statusRoutes);
router.use('/vehicles', vehiclesRoutes);
router.use('/services', servicesRoutes);
router.use('/fuels', fuelsRoutes);
router.use('/document-types', docTypesRoutes);
router.use('/blood-types', bloodTypesRoutes);
router.use('/license-categories', licenseCategoriesRoutes);
router.use('/users', usuarioRoutes);
router.use('/auth', authRoutes);
router.use('/cards', cardRoutes);
router.use('/agreements', agreementRoutes);
router.use('/companies', companyRoutes);
router.use('/controls', controlRoutes);
router.use('/fares', fareRoutes);
router.use('/requirements', requirementRoutes);
router.use('/reviews', reviewRoutes);
router.use('/surcharges', surchargeRoutes);

router.get('/test', (req, res) => {
    res.json({ message: 'API funcionando correctamente 🚀' });
});

module.exports = router;