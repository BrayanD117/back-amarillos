const { Company, TransportSecretary, Person } = require('../models');
const { Op } = require('sequelize');

exports.getCompanies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Company.findAndCountAll({
      include: [
        {
          model: TransportSecretary,
          attributes: ['id', 'name']
        },
        {
          model: Person,
          as: 'Person',
          attributes: ['id', 'firstName', 'lastName']
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
    console.error('Error getting companies:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener las empresas',
      error: error.message
    });
  }
};

exports.getCompanyById = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await Company.findByPk(id, {
      include: [
        {
          model: TransportSecretary,
          attributes: ['id', 'name']
        },
        {
          model: Person,
          as: 'Person',
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Empresa no encontrada'
      });
    }

    return res.status(200).json({
      success: true,
      data: company
    });
  } catch (error) {
    console.error('Error getting company by ID:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener la empresa',
      error: error.message
    });
  }
};

exports.createCompany = async (req, res) => {
  try {
    const { 
      transportSecretaryId, 
      companyType, 
      name, 
      nit, 
      legalRepresentativeId, 
      address, 
      phoneNumber, 
      email 
    } = req.body;

    if (!transportSecretaryId || !companyType || !name || !nit || 
        !legalRepresentativeId || !address || !phoneNumber || !email) {
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

    const legalRepresentative = await Person.findByPk(legalRepresentativeId);
    if (!legalRepresentative) {
      return res.status(404).json({
        success: false,
        message: 'El representante legal no existe'
      });
    }

    const existingCompany = await Company.findOne({ where: { nit } });
    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe una empresa con este NIT'
      });
    }

    const company = await Company.create({
      transportSecretaryId,
      companyType,
      name,
      nit,
      legalRepresentativeId,
      address,
      phoneNumber,
      email
    });

    return res.status(201).json({
      success: true,
      message: 'Empresa creada exitosamente',
      data: company
    });
  } catch (error) {
    console.error('Error creating company:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al crear la empresa',
      error: error.message
    });
  }
};

exports.updateCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const { 
      transportSecretaryId, 
      companyType, 
      name, 
      nit, 
      legalRepresentativeId, 
      address, 
      phoneNumber, 
      email 
    } = req.body;

    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Empresa no encontrada'
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

    if (legalRepresentativeId) {
      const legalRepresentative = await Person.findByPk(legalRepresentativeId);
      if (!legalRepresentative) {
        return res.status(404).json({
          success: false,
          message: 'El representante legal no existe'
        });
      }
    }

    if (nit && nit !== company.nit) {
      const existingCompany = await Company.findOne({ where: { nit } });
      if (existingCompany) {
        return res.status(400).json({
          success: false,
          message: 'Ya existe una empresa con este NIT'
        });
      }
    }

    await company.update({
      transportSecretaryId: transportSecretaryId || company.transportSecretaryId,
      companyType: companyType || company.companyType,
      name: name || company.name,
      nit: nit || company.nit,
      legalRepresentativeId: legalRepresentativeId || company.legalRepresentativeId,
      address: address || company.address,
      phoneNumber: phoneNumber || company.phoneNumber,
      email: email || company.email
    });

    return res.status(200).json({
      success: true,
      message: 'Empresa actualizada exitosamente',
      data: company
    });
  } catch (error) {
    console.error('Error updating company:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar la empresa',
      error: error.message
    });
  }
};

exports.deleteCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Empresa no encontrada'
      });
    }

    await company.destroy();

    return res.status(200).json({
      success: true,
      message: 'Empresa eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error deleting company:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar la empresa',
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