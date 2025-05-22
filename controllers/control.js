const { Control, Vehicle, Driver, User } = require('../models');
const { Op } = require('sequelize');

exports.getControls = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: controls } = await Control.findAndCountAll({
      include: [
        {
          model: Vehicle,
          attributes: ['id', 'licensePlate']
        },
        {
          model: Driver,
          attributes: ['id'],
          include: [
            {
              model: User,
              attributes: ['id', 'firstName', 'lastName']
            }
          ]
        }
      ],
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      data: {
        controls,
        pagination: {
          total: count,
          page,
          limit,
          totalPages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error getting controls:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener los controles',
      error: error.message
    });
  }
};

exports.getControlById = async (req, res) => {
  const { id } = req.params;
  try {
    const control = await Control.findByPk(id, {
      include: [
        {
          model: Vehicle,
          attributes: ['id', 'licensePlate']
        },
        {
          model: Driver,
          attributes: ['id'],
          include: [
            {
              model: User,
              attributes: ['id', 'firstName', 'lastName']
            }
          ]
        }
      ]
    });

    if (!control) {
      return res.status(404).json({
        success: false,
        message: 'Control no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      data: control
    });
  } catch (error) {
    console.error('Error getting control by ID:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener el control',
      error: error.message
    });
  }
};

exports.getControlsByVehicle = async (req, res) => {
  const { vehicleId } = req.params;
  try {
    const controls = await Control.findAll({
      where: { vehicleId },
      include: [
        {
          model: Vehicle,
          attributes: ['id', 'plate', 'model', 'brand']
        },
        {
          model: Driver,
          attributes: ['id'],
          include: [
            {
              model: User,
              attributes: ['id', 'documentNumber',  'firstName', 'lastName']
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      data: controls
    });
  } catch (error) {
    console.error('Error getting controls by vehicle:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener los controles por vehículo',
      error: error.message
    });
  }
};

exports.getControlsByDriver = async (req, res) => {
  const { driverId } = req.params;
  try {
    const controls = await Control.findAll({
      where: { driverId },
      include: [
        {
          model: Vehicle,
          attributes: ['id', 'plate', 'model', 'brand']
        },
        {
          model: Driver,
          attributes: ['id'],
          include: [
            {
              model: User,
              attributes: ['id', 'documentNumber', 'firstName', 'lastName']
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      data: controls
    });
  } catch (error) {
    console.error('Error getting controls by person:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener los controles por persona',
      error: error.message
    });
  }
};

exports.createControl = async (req, res) => {
  try {
    const { vehicleId, driverId, news, accident, validation, control } = req.body;

    if (!vehicleId || !driverId) {
      return res.status(400).json({
        success: false,
        message: 'El vehículo y el conductor son campos obligatorios'
      });
    }

    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'El vehículo no existe'
      });
    }

    const driver = await Driver.findByPk(driverId);
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'El conductor no existe'
      });
    }

    const newControl = await Control.create({
      vehicleId,
      driverId,
      news,
      accident,
      validation,
      control
    });

    return res.status(201).json({
      success: true,
      message: 'Control creado exitosamente',
      data: newControl
    });
  } catch (error) {
    console.error('Error creating control:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al crear el control',
      error: error.message
    });
  }
};

exports.updateControl = async (req, res) => {
  const { id } = req.params;
  try {
    const { vehicleId, driverId, news, accident, validation, control } = req.body;

    const existingControl = await Control.findByPk(id);
    if (!existingControl) {
      return res.status(404).json({
        success: false,
        message: 'Control no encontrado'
      });
    }

    if (vehicleId) {
      const vehicle = await Vehicle.findByPk(vehicleId);
      if (!vehicle) {
        return res.status(404).json({
          success: false,
          message: 'El vehículo no existe'
        });
      }
    }

    if (driverId) {
      const driver = await Driver.findByPk(driverId);
      if (!driver) {
        return res.status(404).json({
          success: false,
          message: 'El conductor no existe'
        });
      }
    }

    await existingControl.update({
      vehicleId: vehicleId || existingControl.vehicleId,
      driverId: driverId || existingControl.driverId,
      news: news !== undefined ? news : existingControl.news,
      accident: accident !== undefined ? accident : existingControl.accident,
      validation: validation !== undefined ? validation : existingControl.validation,
      control: control !== undefined ? control : existingControl.control
    });

    return res.status(200).json({
      success: true,
      message: 'Control actualizado exitosamente',
      data: existingControl
    });
  } catch (error) {
    console.error('Error updating control:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar el control',
      error: error.message
    });
  }
};

exports.deleteControl = async (req, res) => {
  const { id } = req.params;
  try {
    const control = await Control.findByPk(id);
    if (!control) {
      return res.status(404).json({
        success: false,
        message: 'Control no encontrado'
      });
    }

    await control.destroy();

    return res.status(200).json({
      success: true,
      message: 'Control eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error deleting control:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar el control',
      error: error.message
    });
  }
};

exports.getOptions = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({
      attributes: ['id', 'licensePlate'],
      order: [['licensePlate', 'ASC']]
    });

    const drivers = await Driver.findAll({
      attributes: ['id'],
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });

    return res.status(200).json({
      success: true,
      data: {
        vehicles,
        drivers
      }
    });
  } catch (error) {
    console.error('Error getting options:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener opciones',
      error: error.message
    });
  }
};