const { Rol } = require('../models');

exports.createRole = async (req, res) => {
    try {
        const role = await Rol.create(req.body);
        res.status(201).json({
            success: true,
            data: role
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al crear el rol",
            error: error.message
        });
    }
};

exports.getAllRoles = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const { count, rows: roles } = await Rol.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        res.status(200).json({
            success: true,
            data: roles,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(count / limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener los roles",
            error: error.message
        });
    }
};

exports.getRoleById = async (req, res) => {
    try {
        const role = await Rol.findByPk(req.params.id);

        if (!role) {
            return res.status(404).json({
                success: false,
                message: "Rol no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            data: role
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener el rol",
            error: error.message
        });
    }
};

exports.updateRole = async (req, res) => {
    try {
        const role = await Rol.findByPk(req.params.id);

        if (!role) {
            return res.status(404).json({
                success: false,
                message: "Rol no encontrado"
            });
        }

        await role.update(req.body);

        res.status(200).json({
            success: true,
            data: role,
            message: "Rol actualizado exitosamente"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar el rol",
            error: error.message
        });
    }
};

exports.deleteRole = async (req, res) => {
    try {
        const role = await Rol.findByPk(req.params.id);

        if (!role) {
            return res.status(404).json({
                success: false,
                message: "Rol no encontrado"
            });
        }

        await role.destroy();

        res.status(200).json({
            success: true,
            message: "Rol eliminado exitosamente"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar el rol",
            error: error.message
        });
    }
};