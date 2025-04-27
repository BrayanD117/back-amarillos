const { Fuel } = require('../models');

exports.getAllFuels = async (req, res) => {
    try {
        const fuels = await Fuel.findAll();
        res.status(200).json(fuels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getFuelById = async (req, res) => {
    try {
        const fuel = await Fuel.findByPk(req.params.id);
        if (fuel) {
            res.status(200).json(fuel);
        } else {
            res.status(404).json({ message: 'Combustible no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};