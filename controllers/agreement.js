const { Agreement, TransportSecretary } = require('../models');
const { Op } = require('sequelize');

exports.getAgreements = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Agreement.findAndCountAll({
      include: [
        {
          model: TransportSecretary,
          as: 'transportSecretary',
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
    console.error('Error getting agreements:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener los convenios',
      error: error.message
    });
  }
};

exports.getAgreementById = async (req, res) => {
  const { id } = req.params;
  try {
    const agreement = await Agreement.findByPk(id, {
      include: [
        {
          model: TransportSecretary,
          as: 'transportSecretary',
          attributes: ['id', 'name']
        }
      ]
    });

    if (!agreement) {
      return res.status(404).json({
        success: false,
        message: 'Convenio no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      data: agreement
    });
  } catch (error) {
    console.error('Error getting agreement by ID:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener el convenio',
      error: error.message
    });
  }
};

exports.createAgreement = async (req, res) => {
  try {
    const { transportSecretaryId, name, kilometer } = req.body;

    // Validate required fields
    if (!transportSecretaryId || !name || !kilometer) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios'
      });
    }

    // Check if transportSecretary exists
    const transportSecretary = await TransportSecretary.findByPk(transportSecretaryId);
    if (!transportSecretary) {
      return res.status(404).json({
        success: false,
        message: 'La Secretaría de Transporte no existe'
      });
    }

    // Get the next available ID
    const lastAgreement = await Agreement.findOne({
      order: [['id', 'DESC']]
    });
    const nextId = lastAgreement ? lastAgreement.id + 1 : 1;

    const agreement = await Agreement.create({
      id: nextId,
      transportSecretaryId,
      name,
      kilometer: parseFloat(kilometer)
    });

    return res.status(201).json({
      success: true,
      message: 'Convenio creado exitosamente',
      data: agreement
    });
  } catch (error) {
    console.error('Error creating agreement:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al crear el convenio',
      error: error.message
    });
  }
};

exports.updateAgreement = async (req, res) => {
  const { id } = req.params;
  try {
    const { transportSecretaryId, name, kilometer } = req.body;

    const agreement = await Agreement.findByPk(id);
    if (!agreement) {
      return res.status(404).json({
        success: false,
        message: 'Convenio no encontrado'
      });
    }

    // If transportSecretaryId is provided, check if it exists
    if (transportSecretaryId) {
      const transportSecretary = await TransportSecretary.findByPk(transportSecretaryId);
      if (!transportSecretary) {
        return res.status(404).json({
          success: false,
          message: 'La Secretaría de Transporte no existe'
        });
      }
    }

    // Update the agreement
    await agreement.update({
      transportSecretaryId: transportSecretaryId || agreement.transportSecretaryId,
      name: name || agreement.name,
      kilometer: kilometer ? parseFloat(kilometer) : agreement.kilometer
    });

    return res.status(200).json({
      success: true,
      message: 'Convenio actualizado exitosamente',
      data: agreement
    });
  } catch (error) {
    console.error('Error updating agreement:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar el convenio',
      error: error.message
    });
  }
};

// Delete an agreement
exports.deleteAgreement = async (req, res) => {
  const { id } = req.params;
  try {
    const agreement = await Agreement.findByPk(id);
    if (!agreement) {
      return res.status(404).json({
        success: false,
        message: 'Convenio no encontrado'
      });
    }

    await agreement.destroy();

    return res.status(200).json({
      success: true,
      message: 'Convenio eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error deleting agreement:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar el convenio',
      error: error.message
    });
  }
};

exports.getOptions = async (req, res) => {
  try {
    // Get all transport secretaries for the dropdown
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