const { TransportSecretary, City, Status } = require('../models');
const { Op } = require('sequelize');

exports.getTransportSecretaries = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = String(req.query.search || '').trim().toUpperCase();

    const whereClause = search ? {
      [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { address: { [Op.like]: `%${search}%` } }
      ]
  } : {};

    const { count, rows: transportSecretaries } = await TransportSecretary.findAndCountAll({
      include: [
        {
          model: City,
          attributes: ['id', 'name']
        },
        {
          model: Status,
          attributes: ['id', 'name']
        }
      ],
      where: whereClause,
      limit,
      offset,
      order: [['id', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      data: {
        transportSecretaries,
        pagination: {
          total: count,
          page,
          limit,
          totalPages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error al obtener las Secretarías de Transporte:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener las Secretarías de Transporte',
      error: error.message
    });
  }
};

exports.getTransportSecretaryById = async (req, res) => {
  const { id } = req.params;
  try {
    const transportSecretary = await TransportSecretary.findByPk(id, {
      include: [
        {
          model: City,
          attributes: ['id', 'name']
        }
      ]
    });

    if (!transportSecretary) {
      return res.status(404).json({
        success: false,
        message: 'Secretaría de Transporte no encontrada'
      });
    }

    return res.status(200).json({
      success: true,
      data: transportSecretary
    });
  } catch (error) {
    console.error('Error al obtener la Secretaría de Transporte:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener la Secretaría de Transporte',
      error: error.message
    });
  }
};

exports.createTransportSecretary = async (req, res) => {
  try {
    const { name, cityId, address, phoneNumber, statusId } = req.body;

    if (!name || !cityId || !address || !phoneNumber || !statusId) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios'
      });
    }

    const city = await City.findByPk(cityId);
    if (!city) {
      return res.status(404).json({
        success: false,
        message: 'La ciudad no existe'
      });
    }

    const transportSecretary = await TransportSecretary.create({
        name,
        cityId,
        address,
        phoneNumber,
        statusId
    });

    return res.status(201).json({
      success: true,
      message: 'Secretaría de Transporte creada exitosamente',
      data: transportSecretary
    });
  } catch (error) {
    console.error('Error al crear la Secretaría de Transporte:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al crear la Secretaría de Transporte',
      error: error.message
    });
  }
};

exports.updateTransportSecretary = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, cityId, address, phoneNumber, statusId } = req.body;

    const transportSecretary = await Surcharge.findByPk(id);
    if (!transportSecretary) {
      return res.status(404).json({
        success: false,
        message: 'Secretaría de Transporte no encontrada'
      });
    }

    if (cityId) {
      const city = await City.findByPk(cityId);
      if (!city) {
        return res.status(404).json({
          success: false,
          message: 'La ciudad no existe'
        });
      }
    }

    await transportSecretary.update({
        name: name || transportSecretary.name,
        cityId: cityId || transportSecretary.cityId,
        address: address || transportSecretary.address,
        phoneNumber: phoneNumber || transportSecretary.phoneNumber,
        statusId: statusId || transportSecretary.statusId
    });

    return res.status(200).json({
      success: true,
      message: 'Secretaría de Transporte actualizada exitosamente',
      data: surcharge
    });
  } catch (error) {
    console.error('Error al actualizar la Secretaría de Transporte:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar la Secretaría de Transporte',
      error: error.message
    });
  }
};

exports.deleteTransportSecretary = async (req, res) => {
  const { id } = req.params;
  try {
    const transportSecretary = await TransportSecretary.findByPk(id);
    if (!transportSecretary) {
      return res.status(404).json({
        success: false,
        message: 'Secretaría de Transporte no encontrada'
      });
    }

    await transportSecretary.destroy();

    return res.status(200).json({
      success: true,
      message: 'Secretaría de Transporte eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar la Secretaría de Transporte:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar la Secretaría de Transporte',
      error: error.message
    });
  }
};

exports.getOptions = async (req, res) => {
  try {
    const cities = await City.findAll({
      attributes: ['id', 'name'],
      order: [['name', 'ASC']]
    });

    const statuses = await Status.findAll({
      attributes: ['id', 'name'],
      order: [['name', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      data: {
        cities,
        statuses,
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