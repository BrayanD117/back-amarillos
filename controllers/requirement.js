const { Requirement, Vehicle, Service, Status, Fuel, TransportSecretary, User } = require('../models');
const { Op } = require('sequelize');

exports.getRequirements = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Requirement.findAndCountAll({
      include: [
        {
          model: Vehicle,
          include: [
            { model: Service, attributes: ['name'] },
            { model: Status, attributes: ['name'] },
            { model: Fuel, attributes: ['name'] },
            { model: TransportSecretary, attributes: ['name'] },
            { model: User, attributes: ['id', 'username'] }
          ]
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
    console.error('Error getting requirements:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener los requisitos',
      error: error.message
    });
  }
};

exports.getRequirementById = async (req, res) => {
  const { id } = req.params;
  try {
    const requirement = await Requirement.findByPk(id, {
      include: [
        {
          model: Vehicle,
          attributes: ['id', 'internalNumber', 'licensePlate', 'brand', 'line', 'model'],
          include: [
            { model: Service, attributes: ['name'] },
            { model: Status, attributes: ['name'] }
          ]
        }
      ]
    });

    if (!requirement) {
      return res.status(404).json({
        success: false,
        message: 'Requisito no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      data: requirement
    });
  } catch (error) {
    console.error('Error getting requirement by ID:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener el requisito',
      error: error.message
    });
  }
};

exports.getRequirementByVehicle = async (req, res) => {
  const { vehicleId } = req.params;
  try {
    const requirement = await Requirement.findOne({
      where: { vehicleId },
      include: [
        {
          model: Vehicle,
          attributes: ['id', 'internalNumber', 'licensePlate', 'brand', 'line', 'model', 'color', 'engine', 'chassis'],
          include: [
            { model: Service, attributes: ['name'] },
            { model: Status, attributes: ['name'] },
            { model: Fuel, attributes: ['name'] }
          ]
        }
      ]
    });

    if (!requirement) {
      return res.status(404).json({
        success: false,
        message: 'Requisito no encontrado para este vehículo'
      });
    }

    return res.status(200).json({
      success: true,
      data: requirement
    });
  } catch (error) {
    console.error('Error getting requirement by vehicle:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener el requisito por vehículo',
      error: error.message
    });
  }
};

exports.createRequirement = async (req, res) => {
  try {
    const { 
      vehicleId, 
      soat, 
      soatCompany, 
      soatIssue, 
      soatDue, 
      vehicleInspection, 
      vehicleInspectionCompany, 
      vehicleInspectionIssue, 
      vehicleInspectionDue, 
      thirdParty, 
      thirdPartyCompany, 
      thirdPartyIssue, 
      thirdPartyDue 
    } = req.body;

    if (!vehicleId || !soat || !soatCompany || !soatIssue || !soatDue ||
        !vehicleInspection || !vehicleInspectionCompany || !vehicleInspectionIssue || !vehicleInspectionDue ||
        !thirdParty || !thirdPartyCompany || !thirdPartyIssue || !thirdPartyDue) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios'
      });
    }

    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'El vehículo no existe'
      });
    }

    const existingRequirement = await Requirement.findOne({ where: { vehicleId } });
    if (existingRequirement) {
      return res.status(400).json({
        success: false,
        message: 'Este vehículo ya tiene requisitos registrados. Use la función de actualización.'
      });
    }

    const requirement = await Requirement.create({
      vehicleId,
      soat,
      soatCompany,
      soatIssue,
      soatDue,
      vehicleInspection,
      vehicleInspectionCompany,
      vehicleInspectionIssue,
      vehicleInspectionDue,
      thirdParty,
      thirdPartyCompany,
      thirdPartyIssue,
      thirdPartyDue
    });

    return res.status(201).json({
      success: true,
      message: 'Requisitos creados exitosamente',
      data: requirement
    });
  } catch (error) {
    console.error('Error creating requirement:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al crear los requisitos',
      error: error.message
    });
  }
};

exports.updateRequirement = async (req, res) => {
  const { id } = req.params;
  try {
    const { 
      vehicleId, 
      soat, 
      soatCompany, 
      soatIssue, 
      soatDue, 
      vehicleInspection, 
      vehicleInspectionCompany, 
      vehicleInspectionIssue, 
      vehicleInspectionDue, 
      thirdParty, 
      thirdPartyCompany, 
      thirdPartyIssue, 
      thirdPartyDue 
    } = req.body;

    const requirement = await Requirement.findByPk(id);
    if (!requirement) {
      return res.status(404).json({
        success: false,
        message: 'Requisito no encontrado'
      });
    }

    if (vehicleId && vehicleId !== requirement.vehicleId) {
      const vehicle = await Vehicle.findByPk(vehicleId);
      if (!vehicle) {
        return res.status(404).json({
          success: false,
          message: 'El vehículo no existe'
        });
      }

      const existingRequirement = await Requirement.findOne({ where: { vehicleId } });
      if (existingRequirement) {
        return res.status(400).json({
          success: false,
          message: 'El nuevo vehículo ya tiene requisitos registrados'
        });
      }
    }

    await requirement.update({
      vehicleId: vehicleId || requirement.vehicleId,
      soat: soat || requirement.soat,
      soatCompany: soatCompany || requirement.soatCompany,
      soatIssue: soatIssue || requirement.soatIssue,
      soatDue: soatDue || requirement.soatDue,
      vehicleInspection: vehicleInspection || requirement.vehicleInspection,
      vehicleInspectionCompany: vehicleInspectionCompany || requirement.vehicleInspectionCompany,
      vehicleInspectionIssue: vehicleInspectionIssue || requirement.vehicleInspectionIssue,
      vehicleInspectionDue: vehicleInspectionDue || requirement.vehicleInspectionDue,
      thirdParty: thirdParty || requirement.thirdParty,
      thirdPartyCompany: thirdPartyCompany || requirement.thirdPartyCompany,
      thirdPartyIssue: thirdPartyIssue || requirement.thirdPartyIssue,
      thirdPartyDue: thirdPartyDue || requirement.thirdPartyDue
    });

    return res.status(200).json({
      success: true,
      message: 'Requisitos actualizados exitosamente',
      data: requirement
    });
  } catch (error) {
    console.error('Error updating requirement:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar los requisitos',
      error: error.message
    });
  }
};

exports.deleteRequirement = async (req, res) => {
  const { id } = req.params;
  try {
    const requirement = await Requirement.findByPk(id);
    if (!requirement) {
      return res.status(404).json({
        success: false,
        message: 'Requisito no encontrado'
      });
    }

    await requirement.destroy();

    return res.status(200).json({
      success: true,
      message: 'Requisito eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error deleting requirement:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar el requisito',
      error: error.message
    });
  }
};

exports.getVehiclesWithoutRequirements = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({
      attributes: ['id', 'internalNumber', 'licensePlate', 'brand', 'line', 'model', 'color'],
      include: [
        {
          model: Requirement,
          attributes: ['id'],
          required: false
        },
        {
          model: Service,
          attributes: ['name']
        },
        {
          model: Status,
          attributes: ['name']
        }
      ],
      where: {
        '$Requirements.id$': null
      },
      order: [['licensePlate', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      data: vehicles
    });
  } catch (error) {
    console.error('Error getting vehicles without requirements:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener vehículos sin requisitos',
      error: error.message
    });
  }
};

exports.getOptions = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({
      attributes: ['id', 'internalNumber', 'licensePlate', 'brand', 'line', 'model', 'color'],
      include: [
        {
          model: Requirement,
          attributes: ['id'],
          required: false
        },
        {
          model: Service,
          attributes: ['name']
        },
        {
          model: Status,
          attributes: ['name', 'id']
        }
      ],
      where: {
        '$Requirements.id$': null,
        statusId: { [Op.ne]: 3 }
      },
      order: [['licensePlate', 'ASC']]
    });

    const insuranceCompanies = [
      'Seguros Bolivar',
      'Seguros del Estado',
      'Suramericana',
      'Liberty Seguros',
      'AXA Colpatria',
      'MAPFRE',
      'Allianz',
      'La Previsora',
      'HDI Seguros',
      'Equidad Seguros'
    ];

    const rtmCenters = [
      'Centro Diagnóstico Automotor',
      'CDA Express',
      'Revicar',
      'Dijin',
      'Auto Test',
      'Autocentro Colombia',
      'CDA Colserauto',
      'Automas',
      'Autotecnica Colserauto',
      'Revitec'
    ];

    return res.status(200).json({
      success: true,
      data: {
        vehicles,
        insuranceCompanies,
        rtmCenters
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