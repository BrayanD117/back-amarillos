const { Company, TransportSecretary, Person, DocumentType } = require('../models');
const { Op } = require('sequelize');

exports.getCompanies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';

    const where = search ? {
      [Op.or]: [
        { name: { [Op.iLike || Op.like]: `%${search}%` } },
        { nit: { [Op.like]: `%${search}%` } }
      ]
    } : {};

    const { count, rows: companies } = await Company.findAndCountAll({
      where,
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
      message: 'Empresas obtenidas exitosamente',
      data: {
        companies,
        pagination: {
          total: count,
          page,
          totalPages: Math.ceil(count / limit),
          limit
        }
      }
    });
  } catch (error) {
    console.error('Error al obtener las empresas:', error);
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
      legalRepresentativeName,
      legalRepresentativeDocumentTypeId,
      legalRepresentativeDocument,
      address, 
      phoneNumber, 
      email 
    } = req.body;

    if (!transportSecretaryId || !companyType || !name || !nit || 
        !legalRepresentativeName || !legalRepresentativeDocumentTypeId || 
        !legalRepresentativeDocument || !address || 
        !phoneNumber || !email) {
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

    const existingCompany = await Company.findOne({ where: { nit } });
    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe una empresa con este NIT'
      });
    }

    const company = await Company.create({
      transportSecretaryId,
      companyType: companyType.toUpperCase(),
      name: name.toUpperCase(),
      nit: nit.toUpperCase(),
      legalRepresentativeName: legalRepresentativeName.toUpperCase(),
      legalRepresentativeDocumentTypeId,
      legalRepresentativeDocument: legalRepresentativeDocument.toUpperCase(),
      address: address.toUpperCase(),
      phoneNumber: phoneNumber.toUpperCase(),
      email: email.toUpperCase()
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
      legalRepresentativeName,
      legalRepresentativeDocumentTypeId,
      legalRepresentativeDocument,
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
      companyType: companyType ? companyType.toUpperCase() : company.companyType,
      name: name ? name.toUpperCase() : company.name,
      nit: nit ? nit.toUpperCase() : company.nit,
      legalRepresentativeName: legalRepresentativeName ? legalRepresentativeName.toUpperCase() : company.legalRepresentativeName,
      legalRepresentativeDocumentTypeId: legalRepresentativeDocumentTypeId || company.legalRepresentativeDocumentTypeId,
      legalRepresentativeDocument: legalRepresentativeDocument ? legalRepresentativeDocument.toUpperCase() : company.legalRepresentativeDocument,
      address: address ? address.toUpperCase() : company.address,
      phoneNumber: phoneNumber ? phoneNumber.toUpperCase() : company.phoneNumber,
      email: email ? email.toUpperCase() : company.email
    });

    return res.status(200).json({
      success: true,
      message: 'Empresa actualizada exitosamente'
    });
  } catch (error) {
    console.error('Error updating company:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar la empresa',
      error: error.message
    });
  }
}

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

    const documentTypes = await DocumentType.findAll({
      attributes: ['id', 'name'],
      order: [['name', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      data: {
        TransportSecretaries: transportSecretaries,
        DocumentTypes: documentTypes
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