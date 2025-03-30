const { GrupoSanguineo } = require('../models');

exports.getAllBloodTypes = async (req, res) => {
    try {
        const bloodTypes = await GrupoSanguineo.findAll();
        res.status(200).json(bloodTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBloodTypeById = async (req, res) => {
    try {
        const bloodType = await GrupoSanguineo.findByPk(req.params.id);
        if (bloodType) {
            res.status(200).json(bloodType);
        } else {
            res.status(404).json({ message: 'Grupo sanguíneo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};