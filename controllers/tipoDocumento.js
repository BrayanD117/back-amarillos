const { TipoDocumento } = require('../models');

exports.getAllDocTypes = async (req, res) => {
    try {
        const docTypes = await TipoDocumento.findAll();
        res.status(200).json(docTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDocTypeById = async (req, res) => {
    try {
        const docType = await TipoDocumento.findByPk(req.params.id);
        if (docType) {
            res.status(200).json(docType);
        } else {
            res.status(404).json({ message: 'Tipo de documento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};