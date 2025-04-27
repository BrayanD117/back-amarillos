const { LicenseCategory } = require('../models');

exports.getAllLicenseCategories = async (req, res) => {
    try {
        const licenseCategories = await LicenseCategory.findAll();
        res.status(200).json(licenseCategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getLicenseCategoryById = async (req, res) => {
    try {
        const licenseCategory = await LicenseCategory.findByPk(req.params.id);
        if (licenseCategory) {
            res.status(200).json(licenseCategory);
        } else {
            res.status(404).json({ message: 'Categoría de licencia no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};