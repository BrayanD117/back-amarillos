const { Service } = require('../models');

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (service) {
            res.status(200).json(service);
        } else {
            res.status(404).json({ message: 'Servicio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};