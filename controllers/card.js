const { Card, Vehicle, User, Fare, Person } = require('../models');
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