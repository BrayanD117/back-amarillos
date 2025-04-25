const { Tarjetas, Vehiculo, Usuario, Tarifa, Persona } = require('../models');
const { Op, fn, col, where } = require('sequelize');

exports.createCard = async (req, res) => {
    try {
        const card = await Tarjetas.create(req.body);
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
            where(fn('UPPER', col('Vehiculo.placa')), {
                [Op.like]: `%${search}%`
            }),
            where(fn('UPPER', col('Usuario.Persona.numeroDocumento')), {
              [Op.like]: `%${search}%`
            }),
            where(fn('UPPER', col('Usuario.Persona.primerNombre')), {
              [Op.like]: `%${search}%`
            }),
            where(fn('UPPER', col('Usuario.Persona.primerApellido')), {
              [Op.like]: `%${search}%`
            })
          ]
        }
      : {};

    const { count, rows: cards } = await Tarjetas.findAndCountAll({
        where: searchCondition,
        offset,
        limit,
        include: [
            {
                model: Vehiculo,
                attributes: ['placa']
            },
            {
                model: Usuario,
                attributes: ['id'],
                include: [
                  {
                    model: Persona,
                    attributes: ['numeroDocumento', 'primerNombre', 'primerApellido']
                  }
                ]
            },
            {
                model: Tarifa
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
    const card = await Tarjetas.findByPk(id, {
      include: [
        {
          model: Vehiculo,
          attributes: ['id', 'placa'],
        },
        {
            model: Usuario,
            attributes: ['id'],
            include: [
              {
                model: Persona,
                attributes: ['numeroDocumento']
              }
            ]
        },
        {
          model: Tarifa,
          attributes: ['id', 'minima']
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
    idVehiculo,
    idUsuario,
    idTarifa,
    numero,
    emision,
    vence,
    refrendacion
  } = req.body;

  try {
    const card = await Tarjetas.findByPk(id);

    if (!card) {
      return res.status(404).json({
        ok: false,
        msg: 'Tarjeta no encontrada'
      });
    }

    const updatedCard = await card.update({idVehiculo, idUsuario, idTarifa, numero, emision, vence, refrendacion});

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
    const card = await Tarjetas.findByPk(id);

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
      Vehiculo.findAll({
        attributes: ['id', 'placa'],
      }),
      Persona.findAll({
        attributes: ['id', 'numeroDocumento']
      }),
      Tarifa.findAll({
        attributes: ['id', 'minima']
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