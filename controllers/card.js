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
    const search = String(req.query.search || '').trim().toUpperCase();;

    const searchCondition = search
      ? {
          [Op.or]: [
            where(fn('UPPER', col('id')), {
              [Op.like]: `%${search}%`
            }),
            where(fn('UPPER', col('Vehicle.licensePlate')), {
                [Op.like]: `%${search}%`
            }),
            where(fn('UPPER', col('User.Person.documentNumber')), {
              [Op.like]: `%${search}%`
            }),
            where(fn('UPPER', col('User.Person.firstName')), {
              [Op.like]: `%${search}%`
            }),
            where(fn('UPPER', col('User.Person.lastName')), {
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
                model: User,
                attributes: ['id'],
                include: [
                  {
                    model: Person,
                    attributes: ['documentNumber', 'firstName', 'lastName']
                  }
                ]
            },
            {
              model: Fare
            }
        ]
    });

    res.json({
      ok: true,
      cards,
      total: count,
      page,
      totalPages: Math.ceil(count / limit)
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener las tarjetas.'
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
            model: User,
            attributes: ['id'],
            include: [
              {
                model: Person,
                attributes: ['documentNumber']
              }
            ]
        },
        {
          model: Fare,
          attributes: ['id', 'minimum']
        }]
    });

    if (!card) {
      return res.status(404).json({
        ok: false,
        msg: 'Tarjeta no encontrada'
      });
    }

    const dto = card.toJSON(); 
    if (dto.emision instanceof Date) {
      dto.emision = dto.emision.toISOString().split('T')[0];
    }
    if (dto.vence instanceof Date) {
      dto.vence = dto.vence.toISOString().split('T')[0];
    }

    res.json({
      ok: true,
      data: dto
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener la tarjeta'
    });
  }
};

exports.updateCard = async (req, res) => {
  const { id } = req.params;

  const {
    vehicleId,
    userId,
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
        ok: false,
        msg: 'Tarjeta no encontrada'
      });
    }

    const updatedCard = await card.update({
      vehicleId,
      userId,
      fareId,
      number,
      issueDate,
      expirationDate,
      endorsement
    });

    res.json({
      ok: true,
      msg: 'Tarjeta actualizada correctamente',
      updatedCard
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al actualizar la tarjeta.',
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
        ok: false,
        msg: 'Tarjeta no encontrada'
      });
    }

    await card.destroy();

    res.json({
      ok: true,
      msg: 'Tarjeta eliminada correctamente'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al eliminar la tarjeta'
    });
  }
};

exports.getCardOptions = async (req, res) => {
  try {
    const [vehicles, people, fares] = await Promise.all([
      Vehicle.findAll({
        attributes: ['id', 'licensePlate'],
      }),
      Person.findAll({
        attributes: ['id', 'documentNumber']
      }),
      Fare.findAll({
        attributes: ['id', 'minimum']
      })
    ]);

    res.status(200).json({
      ok: true,
      data: {
        vehicles,
        people,
        fares
      },
      message: "Opciones obtenidas exitosamente"
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error al obtener las opciones",
      error: error.message
    });
  }
};

exports.generateCard = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    
    if (!vehicleId) {
      return res.status(400).json({
        ok: false,
        message: "Se requiere el ID del vehículo"
      });
    }

    const vehicle = await Vehicle.findByPk(vehicleId, {
      include: [
        {
          model: User,
          include: [
            {
              model: Person,
              attributes: ['id', 'documentNumber', 'documentTypeId', 'firstName', 'lastName', 'bloodTypeId', 'address', 'phone', 'email']
            }
          ]
        },
        {
          model: Status,
          attributes: ['id', 'name']
        },
        {
          model: Service,
          attributes: ['id', 'name']
        },
        {
          model: Fuel,
          attributes: ['id', 'name']
        },
        {
          model: TransportSecretary,
          attributes: ['id', 'name']
        },
        {
          model: Requirement,
          attributes: ['id', 'name', 'description', 'expirationDate']
        }
      ]
    });

    if (!vehicle) {
      return res.status(404).json({
        ok: false,
        message: "Vehículo no encontrado"
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
        displacement: vehicle.displacement,
        doors: vehicle.doors,
        service: vehicle.Service ? vehicle.Service.name : null,
        status: vehicle.Status ? vehicle.Status.name : null,
        fuel: vehicle.Fuel ? vehicle.Fuel.name : null,
        transportSecretary: vehicle.TransportSecretary ? vehicle.TransportSecretary.name : null,
        registrationDate: vehicle.registrationDate,
        issueDate: vehicle.issueDate
      },
      driverInfo: vehicle.User ? {
        id: vehicle.User.id,
        personInfo: vehicle.User.Person ? {
          id: vehicle.User.Person.id,
          documentNumber: vehicle.User.Person.documentNumber,
          documentTypeId: vehicle.User.Person.documentTypeId,
          firstName: vehicle.User.Person.firstName,
          lastName: vehicle.User.Person.lastName,
          bloodTypeId: vehicle.User.Person.bloodTypeId,
          address: vehicle.User.Person.address,
          phone: vehicle.User.Person.phone,
          email: vehicle.User.Person.email,
          fullName: `${vehicle.User.Person.firstName} ${vehicle.User.Person.lastName}`
        } : null
      } : null,
      endorsementInfo: {
        requirements: vehicle.Requirements ? vehicle.Requirements.map(req => ({
          id: req.id,
          name: req.name,
          description: req.description,
          expirationDate: req.expirationDate
        })) : []
      },
      fareInfo: fares.map(fare => ({
        id: fare.id,
        minimum: fare.minimum,
        value: fare.value
      })),
      agreementInfo: agreements.map(agreement => ({
        id: agreement.id,
        name: agreement.name,
        kilometer: agreement.kilometer,
        transportSecretary: agreement.transportSecretary ? agreement.transportSecretary.name : null
      }))
    };

    const uniqueCardNumber = `TC-${vehicleId}-${Date.now()}`;

    const currentDate = new Date();
    const expirationDate = new Date();
    expirationDate.setFullYear(currentDate.getFullYear() + 1);

    const cardToCreate = {
      vehicleId: vehicle.id,
      userId: vehicle.User ? vehicle.User.id : null,
      fareId: fares.length > 0 ? fares[0].id : null,
      number: uniqueCardNumber,
      issueDate: currentDate,
      expirationDate: expirationDate,
      endorsement: "Tarjeta generada automáticamente"
    };

    res.status(200).json({
      ok: true,
      message: "Datos de la tarjeta generados exitosamente",
      data: {
        cardData,
        cardToCreate
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
}