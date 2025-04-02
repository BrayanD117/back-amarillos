const { Vehiculo, Persona, Usuario, Estado, Servicio, Combustible, Tarjetas } = require('../models');
const { Op } = require('sequelize');

exports.createVehicle = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({
            include: [{
                model: Persona,
                where: {
                    numeroDocumento: req.body.cedula
                }
            }]
        });

        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "No se encontró el usuario asociado con ese número de documento"
            });
        }

        const existingVehicle = await Vehiculo.findOne({
            where: {
                placa: req.body.placa.toUpperCase()
            }
        });

        if (existingVehicle) {
            return res.status(400).json({
                success: false,
                message: "La placa ya está registrada"
            });
        }

        const vehicleData = {
            ...req.body,
            idUsuario: usuario.id,
        };

        for (const key in vehicleData) {
            if (typeof vehicleData[key] === 'string') {
                vehicleData[key] = vehicleData[key].toUpperCase().trimEnd();
            }
        }

        const vehicle = await Vehiculo.create(vehicleData);
        
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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const search = req.query.search || '';

        const whereClause = search ? {
            [Op.or]: [
                { placa: { [Op.like]: `%${search}%` } },
                { marca: { [Op.like]: `%${search}%` } },
                ...((!isNaN(search) ? [{ modelo: parseInt(search) }] : []))
            ]
        } : {};

        const { count, rows: vehicles } = await Vehiculo.findAndCountAll({
            where: whereClause,
            limit,
            offset
        });

        const totalPages = Math.ceil(count / limit);

        res.status(200).json({
            success: true,
            data: {
                vehicles,
                pagination: {
                    total: count,
                    page,
                    totalPages,
                    limit
                }
            }
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
        const vehicle = await Vehiculo.findByPk(req.params.id, {
            include: [{
                model: Usuario,
                include: [{
                    model: Persona,
                    attributes: ['numeroDocumento']
                }]
            }]
        });

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehículo no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            data: {
                ...vehicle.toJSON(),
                cedula: vehicle.Usuario.Persona.numeroDocumento
            }
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

        const usuario = await Usuario.findOne({
            include: [{
                model: Persona,
                where: {
                    numeroDocumento: req.body.cedula
                }
            }]
        });

        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "No se encontró el usuario asociado con ese número de documento"
            });
        }

        const existingVehicle = await Vehiculo.findOne({
            where: {
                placa: req.body.placa.toUpperCase(),
                id: { [Op.ne]: vehicle.id }
            }
        });

        if (existingVehicle) {
            return res.status(400).json({
                success: false,
                message: "La placa ya está registrada"
            });
        }

        const vehicleData = {
            ...req.body,
            idUsuario: vehicle.idUsuario,
        };

        for (const key in vehicleData) {
            if (typeof vehicleData[key] === 'string') {
                vehicleData[key] = vehicleData[key].toUpperCase().trimEnd();
            }
        }

        await vehicle.update(vehicleData);

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

exports.getVehicleOptions = async (req, res) => {
    try {
        const [usuarios, estados, servicios, combustibles, tarjetas] = await Promise.all([
            Usuario.findAll({
                attributes: ['id'],
            }),
            Estado.findAll({
                attributes: ['id', 'nombre']
            }),
            Servicio.findAll({
                attributes: ['id', 'nombre'] 
            }),
            Combustible.findAll({
                attributes: ['id', 'nombre']
            }),
            Tarjetas.findAll({
                attributes: ['id', 'numero']
            })
        ]);

        res.status(200).json({
            success: true,
            data: {
                usuarios,
                estados,
                servicios,
                combustibles,
                tarjetas
            },
            message: "Relaciones obtenidas exitosamente"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener las relaciones",
            error: error.message
        });
    }
};

exports.getVehicleWithRelations = async (req, res) => {
    try {
        const vehicle = await Vehiculo.findByPk(req.params.id, {
            include: [
                {
                    model: Usuario,
                    attributes: ['id', 'nombre', 'apellido']
                },
                {
                    model: Estado,
                    attributes: ['id', 'nombre']
                },
                {
                    model: Servicio,
                    attributes: ['id', 'nombre']
                },
                {
                    model: Combustible,
                    attributes: ['id', 'nombre']
                },
                {
                    model: Tarjetas,
                    attributes: ['id', 'numero']
                }
            ]
        });

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehículo no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            data: vehicle,
            message: "Vehículo y sus relaciones obtenidos exitosamente"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener el vehículo y sus relaciones",
            error: error.message
        });
    }
};
