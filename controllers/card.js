const { Card, Vehicle, User, Fare, Person, Status, Service, Fuel, TransportSecretary, Requirement, Agreement } = require('../models');
const { Op, fn, col, where } = require('sequelize');

exports.createCard = async (req, res) => {
    try {
        const card = await Card.create(req.body);
        res.status(201).json({
            ok: true,
            data: card
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error al crear la tarjeta",
            error: error.message
        });
    }
};

exports.getAllCards = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = String(req.query.search || '').trim().toUpperCase();

    const searchCondition = search
      ? {
          [Op.or]: [
            where(fn('UPPER', col('Vehicle.licensePlate')), {
                [Op.like]: `%${search}%`
            }),
            where(fn('UPPER', col('Driver.User.documentNumber')), {
              [Op.like]: `%${search}%`
            }),
            where(fn('UPPER', col('Driver.User.firstName')), {
              [Op.like]: `%${search}%`
            }),
            where(fn('UPPER', col('Driver.User.lastName')), {
              [Op.like]: `%${search}%`
            })
          ]
        }
      : {};

    const { count, rows: cards } = await Card.findAndCountAll({
        where: searchCondition,
        offset,
        limit,
        include: [
            {
              model: Vehicle,
              attributes: ['licensePlate']
            },
            {
              model: Driver,
              include: [
                {
                  model: User,
                  attributes: ['id', 'documentNumber', 'firstName', 'lastName']
                }
              ]
            },
            {
              model: Fare
            }
        ]
    });

    res.json({
      success: true,
      data: {
        cards,
        pagination: {
          total: count,
          page,
          totalPages: Math.ceil(count / limit),
          limit
        }
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener las tarjetas.',
      error: error.message
    });
  }
};

exports.getCardById = async (req, res) => {
  const { id } = req.params;

  try {
    const card = await Card.findByPk(id, {
      include: [
        {
          model: Vehicle,
          attributes: ['id', 'licensePlate'],
        },
        {
          model: Driver,
          include: [
            {
              model: User,
              attributes: ['id', 'documentNumber']
            }
          ]
        },
        {
          model: Fare,
          attributes: ['id', 'minimum']
        }
      ]
    });

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Tarjeta no encontrada'
      });
    }

    const dto = card.toJSON();
    if (dto.emision instanceof Date) {
      dto.emision = dto.emision.toISOString().split('T')[0];
    }
    if (dto.vence instanceof Date) {
      dto.vence = dto.vence.toISOString().split('T')[0];
    }

    return res.status(200).json({
      success: true,
      message: 'Tarjeta obtenida exitosamente',
      data: dto
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener la tarjeta',
      error: error.message
    });
  }
};

exports.updateCard = async (req, res) => {
  const { id } = req.params;
  const {
    vehicleId,
    driverId,
    fareId,
    number,
    issueDate,
    expirationDate,
    endorsement
  } = req.body;

  try {
    const card = await Card.findByPk(id);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Tarjeta no encontrada'
      });
    }

    await card.update({
      vehicleId,
      driverId,
      fareId,
      number,
      issueDate,
      expirationDate,
      endorsement
    });

    return res.status(200).json({
      success: true,
      message: 'Tarjeta actualizada correctamente'
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar la tarjeta.',
      error: error.message
    });
  }
};

exports.deleteCard = async (req, res) => {
  const { id } = req.params;

  try {
    const card = await Card.findByPk(id);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Tarjeta no encontrada'
      });
    }

    await card.destroy();

    return res.status(200).json({
      success: true,
      message: 'Tarjeta eliminada correctamente'
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar la tarjeta',
      error: error.message
    });
  }
};

exports.getCardOptions = async (req, res) => {
  try {
    const [vehicles, fares] = await Promise.all([
      Vehicle.findAll({
        attributes: ['id', 'licensePlate'],
      }),
      Fare.findAll({
        attributes: ['id', 'minimum']
      })
    ]);

    return res.status(200).json({
      success: true,
      message: "Opciones obtenidas exitosamente",
      data: {
        vehicles,
        fares
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener las opciones",
      error: error.message
    });
  }
};

exports.generateCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    
    if (!cardId) {
      return res.status(400).json({
        success: false,
        message: "Se requiere el ID de la tarjeta"
      });
    }

    const card = await Card.findByPk(cardId);
    
    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Tarjeta no encontrada"
      });
    }
    
    const vehicle = await Vehicle.findByPk(card.vehicleId, {
      include: [
        {
          model: Status,
          attributes: ['id', 'name']
        },
        {
          model: Service,
          attributes: ['id', 'name']
        },
        {
          model: TransportSecretary,
          attributes: ['id', 'name']
        },
        {
          model: Requirement,
          attributes: ['id', 'soat', 'soatCompany', 'soatIssue', 'soatDue',
            'vehicleInspection', 'vehicleInspectionCompany', 
            'vehicleInspectionIssue', 'vehicleInspectionDue',
            'thirdParty', 'thirdPartyCompany', 'thirdPartyIssue', 'thirdPartyDue']
        },
        {
          model: Driver,
          include: [
            { model: User }
          ]
        }
      ]
    });

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehículo no encontrado"
      });
    }

    const driver = await Driver.findByPk(card.driverId);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Persona no encontrada"
      });
    }
    
    const user = await User.findByPk(driver.userId, {
      include: [
        {
          model: Person,
          attributes: ['id', 'documentNumber', 'firstName', 'lastName', 'bloodTypeId', 
            'address', 'phoneNumber', 'healthInsurance', 'workInsurance', 'pension', 
            'licenseNumber', 'documentTypeId']
        }
      ]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado"
      });
    }

    const fares = await Fare.findAll();

    const agreements = await Agreement.findAll({
      where: {
        transportSecretaryId: vehicle.transportSecretaryId
      },
      include: [
        {
          model: TransportSecretary,
          as: 'transportSecretary',
          attributes: ['id', 'name']
        }
      ]
    });

    const cardData = {
      vehicleInfo: {
        id: vehicle.id,
        licensePlate: vehicle.licensePlate,
        internalNumber: vehicle.internalNumber,
        brand: vehicle.brand,
        line: vehicle.line,
        model: vehicle.model,
        color: vehicle.color,
        vehicleClass: vehicle.vehicleClass,
        bodyType: vehicle.bodyType,
        capacity: vehicle.capacity,
        engine: vehicle.engine,
        chassis: vehicle.chassis,
        doors: vehicle.doors,
        service: vehicle.Service ? vehicle.Service.name : null,
        status: vehicle.Status ? vehicle.Status.name : null,
        fuel: vehicle.Fuel ? vehicle.Fuel.name : null,
        transportSecretary: vehicle.TransportSecretary ? vehicle.TransportSecretary.name : null,
        registrationDate: vehicle.registrationDate,
        issueDate: vehicle.issueDate,
        owner: vehicle.ownerFullName
      },
      userInfo: {
        id: user.id,
        documentNumber: user.documentNumber,
        documentTypeId: user.documentTypeId,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        secondLastName: user.secondLastName,
        fullName: `${user.firstName} ${user.middleName} ${user.lastName} ${user.secondLastName}`,
        driverInfo: driver ? {
          id: driver.id,  
          bloodTypeId: driver.bloodTypeId,
          address: driver.address,
          phoneNumber: driver.phoneNumber,
          healthInsurance: driver.healthInsurance,
          workInsurance: driver.workInsurance,
          pension: driver.pension,
          licenseNumber: driver.licenseNumber
        } : null
      },
      requirementInfo: {
        requirements: vehicle.Requirements && vehicle.Requirements.length > 0 ? 
          vehicle.Requirements.map(req => ({
            soat: req.soat,
            soatCompany: req.soatCompany,
            soatIssue: req.soatIssue,
            soatDue: req.soatDue,
            vehicleInspection: req.vehicleInspection,
            vehicleInspectionCompany: req.vehicleInspectionCompany,
            vehicleInspectionIssue: req.vehicleInspectionIssue,
            vehicleInspectionDue: req.vehicleInspectionDue,
            thirdParty: req.thirdParty,
            thirdPartyCompany: req.thirdPartyCompany,
            thirdPartyIssue: req.thirdPartyIssue,
            thirdPartyDue: req.thirdPartyDue
          })) : []
      },
      fareInfo: fares.map(fare => ({
        id: fare.id,
        minimum: fare.minimum,
        flagDown: fare.flagDown,
        drop70m: fare.drop70m,
        drop35s: fare.drop35s,
        hour: fare.hour
      })),
      agreementInfo: agreements.map(agreement => ({
        id: agreement.id,
        name: agreement.name,
        kilometer: agreement.kilometer,
        transportSecretary: agreement.transportSecretary ? agreement.transportSecretary.name : null
      })),
      cardInfo: {
        id: card.id,
        number: card.number,
        issueDate: card.issueDate,
        expirationDate: card.expirationDate,
        endorsement: card.endorsement
      }
    };

    res.status(200).json({
      ok: true,
      message: "Datos de la tarjeta generados exitosamente",
      data: {
        cardData
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error al generar los datos de la tarjeta",
      error: error.message
    });
  }
};