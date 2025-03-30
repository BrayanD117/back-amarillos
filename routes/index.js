const express = require('express');
const router = express.Router();

const rolesRoutes = require('./rol');
const statusRoutes = require('./estado');
const vehiclesRoutes = require('./vehiculo');
const servicesRoutes = require('./servicio');
const fuelsRoutes = require('./combustible');
const docTypesRoutes = require('./tipoDocumento');
const bloodTypesRoutes = require('./grupoSanguineo');
const licenseCategoriesRoutes = require('./categoriaLicencia');

router.use('/roles', rolesRoutes);
router.use('/estados', statusRoutes);
router.use('/vehiculos', vehiclesRoutes);
router.use('/servicios', servicesRoutes);
router.use('/combustibles', fuelsRoutes);
router.use('/tipos-documento', docTypesRoutes);
router.use('/grupos-sanguineos', bloodTypesRoutes);
router.use('/categorias-licencia', licenseCategoriesRoutes);

module.exports = router;