const { Vehicle, Person, User, Status, Service, Fuel, Card } = require('../models');
const { Op } = require('sequelize');

exports.createVehicle = async (req, res) => {
    try {
        const user = await User.findOne({
            include: [{
                model: Person,
                where: {
                    documentNumber: req.body.documentNumber
                }
            }]
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No se encontró el usuario asociado con ese número de documento"
            });
        }

        const existingVehicle = await Vehicle.findOne({
            where: {
                licensePlate: req.body.licensePlate.toUpperCase()
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
            userId: user.id
        };

        for (const key in vehicleData) {
            if (typeof vehicleData[key] === 'string') {
                vehicleData[key] = vehicleData[key].toUpperCase().trimEnd();
            }
        }

        const vehicle = await Vehicle.create(vehicleData);
        
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
                { licensePlate: { [Op.like]: `%${search}%` } },
                { brand: { [Op.like]: `%${search}%` } },
                ...((!isNaN(search) ? [{ modelo: parseInt(search) }] : []))
            ]
        } : {};

        const { count, rows: vehicles } = await Vehicle.findAndCountAll({
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
        const vehicle = await Vehicle.findByPk(req.params.id, {
            include: [{
                model: User,
                include: [{
                    model: Person,
                    attributes: ['documentNumber']
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
                documentNumber: vehicle.User.Person.documentNumber
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
        const vehicle = await Vehicle.findByPk(req.params.id);

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehículo no encontrado"
            });
        }

        const user = await User.findOne({
            include: [{
                model: Person,
                where: {
                    documentNumber: req.body.documentNumber
                }
            }]
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No se encontró el usuario asociado con ese número de documento"
            });
        }

        const existingVehicle = await Vehicle.findOne({
            where: {
                licensePlate: req.body.licensePlate.toUpperCase(),
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
            userId: vehicle.userId
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
        const vehicle = await Vehicle.findByPk(req.params.id);

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
        const [users, status, services, fuels, cards] = await Promise.all([
            User.findAll({
                attributes: ['id'],
            }),
            Status.findAll({
                attributes: ['id', 'name']
            }),
            Service.findAll({
                attributes: ['id', 'name'] 
            }),
            Fuel.findAll({
                attributes: ['id', 'name']
            }),
            Card.findAll({
                attributes: ['id', 'number']
            })
        ]);

        res.status(200).json({
            success: true,
            data: {
                users,
                status,
                services,
                fuels,
                cards
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
        const vehicle = await Vehicle.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: Status,
                    attributes: ['id', 'name']
                },
                {
                    model: Service,
                    attributes: ['id', 'name']
                },
                {
                    model: Fuel,
                    attributes: ['id', 'name']
                },
                {
                    model: Card,
                    attributes: ['id', 'number']
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