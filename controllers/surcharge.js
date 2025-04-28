const { Surcharge, TransportSecretary } = require('../models');
const { Op } = require('sequelize');

exports.getSurcharges = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Surcharge.findAndCountAll({
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
    console.error('Error al obtener los recargos:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener los convenios',
      error: error.message
    });
  }
};

exports.getSurchargeById = async (req, res) => {
  const { id } = req.params;
  try {
    const surcharge = await Surcharge.findByPk(id, {
      include: [
        {
          model: TransportSecretary,
          attributes: ['id', 'name']
        }
      ]
    });

    if (!surcharge) {
      return res.status(404).json({
        success: false,
        message: 'Recargo no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      data: surcharge
    });
  } catch (error) {
    console.error('Error al obtener el convenio:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener el convenio',
      error: error.message
    });
  }
};

exports.createSurcharge = async (req, res) => {
  try {
    const { transportSecretaryId, airport, terminal, law } = req.body;

    if (!transportSecretaryId || !airport || !terminal || !law) {
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

    const surcharge = await Surcharge.create({
        transportSecretaryId,
        airport: parseFloat(airport),
        terminal: parseFloat(terminal),
        law
    });

    return res.status(201).json({
      success: true,
      message: 'Recargo creado exitosamente',
      data: surcharge
    });
  } catch (error) {
    console.error('Error al crear el recargo:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al crear el recargo',
      error: error.message
    });
  }
};

exports.updateSurcharge = async (req, res) => {
  const { id } = req.params;
  try {
    const { transportSecretaryId, airport, terminal, law } = req.body;

    const surcharge = await Surcharge.findByPk(id);
    if (!surcharge) {
      return res.status(404).json({
        success: false,
        message: 'Recargo no encontrado'
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

    await surcharge.update({
        transportSecretaryId: transportSecretaryId || surcharge.transportSecretaryId,
        airport: airport ? parseFloat(airport) : surcharge.airport,
        terminal: terminal ? parseFloat(terminal) : surcharge.terminal,
        law: law || surcharge.law
    });

    return res.status(200).json({
      success: true,
      message: 'Recargo actualizado exitosamente',
      data: surcharge
    });
  } catch (error) {
    console.error('Error al actualizar el recargo:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar el recargo',
      error: error.message
    });
  }
};

exports.deleteSurcharge = async (req, res) => {
  const { id } = req.params;
  try {
    const surcharge = await Surcharge.findByPk(id);
    if (!surcharge) {
      return res.status(404).json({
        success: false,
        message: 'Recargo no encontrado'
      });
    }

    await surcharge.destroy();

    return res.status(200).json({
      success: true,
      message: 'Recargo eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar el recargo:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar el recargo',
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
    console.error('Error al obtener opciones:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener opciones',
      error: error.message
    });
  }
};