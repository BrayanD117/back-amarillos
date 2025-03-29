const { Vehiculo } = require('../models');

exports.createVehicle = async (req, res) => {
    try {
        const vehicle = await Vehiculo.create(req.body);
        res.status(201).json({
            success: true,
            data: vehicle
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al crear el vehículo",
            error: error.message
        });
    }
};

exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehiculo.findAll();
        res.status(200).json({
            success: true,
            data: vehicles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener los vehículos",
            error: error.message
        });
    }
};

exports.getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehiculo.findByPk(req.params.id);

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehículo no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            data: vehicle
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener el vehículo",
            error: error.message
        });
    }
};

exports.updateVehicle = async (req, res) => {
    try {
        const vehicle = await Vehiculo.findByPk(req.params.id);

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehículo no encontrado"
            });
        }

        await vehicle.update(req.body);

        res.status(200).json({
            success: true,
            data: vehicle,
            message: "Vehículo actualizado exitosamente"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar el vehículo",
            error: error.message
        });
    }
};

exports.deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehiculo.findByPk(req.params.id);

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehículo no encontrado"
            });
        }

        await vehicle.destroy();

        res.status(200).json({
            success: true,
            message: "Vehículo eliminado exitosamente"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar el vehículo",
            error: error.message
        });
    }
};