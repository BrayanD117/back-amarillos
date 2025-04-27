const { Fare, TransportSecretary } = require('../models');
const { Op } = require('sequelize');

exports.getFares = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Fare.findAndCountAll({
      include: [
        {
          model: TransportSecretary,
          attributes: ['id', 'name']
        }
      ],
      limit,
      offset,
      order: [['id', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      data: rows,
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Error getting fares:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener las tarifas',
      error: error.message
    });
  }
};

exports.getFareById = async (req, res) => {
  const { id } = req.params;
  try {
    const fare = await Fare.findByPk(id, {
      include: [
        {
          model: TransportSecretary,
          attributes: ['id', 'name']
        }
      ]
    });

    if (!fare) {
      return res.status(404).json({
        success: false,
        message: 'Tarifa no encontrada'
      });
    }

    return res.status(200).json({
      success: true,
      data: fare
    });
  } catch (error) {
    console.error('Error getting fare by ID:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener la tarifa',
      error: error.message
    });
  }
};

exports.getFaresByTransportSecretary = async (req, res) => {
  const { transportSecretaryId } = req.params;
  try {
    const fares = await Fare.findAll({
      where: { transportSecretaryId },
      include: [
        {
          model: TransportSecretary,
          attributes: ['id', 'name']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      data: fares
    });
  } catch (error) {
    console.error('Error getting fares by transport secretary:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener las tarifas por secretaría de transporte',
      error: error.message
    });
  }
};

exports.createFare = async (req, res) => {
  try {
    const { transportSecretaryId, minimum, flagDown, drop70m, drop35s, hour } = req.body;

    if (!transportSecretaryId || !minimum || !flagDown || !drop70m || !drop35s || !hour) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios'
      });
    }

    const transportSecretary = await TransportSecretary.findByPk(transportSecretaryId);
    if (!transportSecretary) {
      return res.status(404).json({
        success: false,
        message: 'La Secretaría de Transporte no existe'
      });
    }

    const fare = await Fare.create({
      transportSecretaryId,
      minimum,
      flagDown,
      drop70m,
      drop35s,
      hour
    });

    return res.status(201).json({
      success: true,
      message: 'Tarifa creada exitosamente',
      data: fare
    });
  } catch (error) {
    console.error('Error creating fare:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al crear la tarifa',
      error: error.message
    });
  }
};

exports.updateFare = async (req, res) => {
  const { id } = req.params;
  try {
    const { transportSecretaryId, minimum, flagDown, drop70m, drop35s, hour } = req.body;

    const fare = await Fare.findByPk(id);
    if (!fare) {
      return res.status(404).json({
        success: false,
        message: 'Tarifa no encontrada'
      });
    }

    if (transportSecretaryId) {
      const transportSecretary = await TransportSecretary.findByPk(transportSecretaryId);
      if (!transportSecretary) {
        return res.status(404).json({
          success: false,
          message: 'La Secretaría de Transporte no existe'
        });
      }
    }

    await fare.update({
      transportSecretaryId: transportSecretaryId || fare.transportSecretaryId,
      minimum: minimum !== undefined ? minimum : fare.minimum,
      flagDown: flagDown !== undefined ? flagDown : fare.flagDown,
      drop70m: drop70m !== undefined ? drop70m : fare.drop70m,
      drop35s: drop35s !== undefined ? drop35s : fare.drop35s,
      hour: hour || fare.hour
    });

    return res.status(200).json({
      success: true,
      message: 'Tarifa actualizada exitosamente',
      data: fare
    });
  } catch (error) {
    console.error('Error updating fare:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar la tarifa',
      error: error.message
    });
  }
};

exports.deleteFare = async (req, res) => {
  const { id } = req.params;
  try {
    const fare = await Fare.findByPk(id);
    if (!fare) {
      return res.status(404).json({
        success: false,
        message: 'Tarifa no encontrada'
      });
    }

    await fare.destroy();

    return res.status(200).json({
      success: true,
      message: 'Tarifa eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error deleting fare:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar la tarifa',
      error: error.message
    });
  }
};

exports.getOptions = async (req, res) => {
  try {
    const transportSecretaries = await TransportSecretary.findAll({
      attributes: ['id', 'name'],
      order: [['name', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      data: {
        transportSecretaries
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