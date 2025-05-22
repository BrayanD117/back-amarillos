const { Review, Vehicle, User, Driver } = require('../models');
const { Op } = require('sequelize');

exports.getReviews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Review.findAndCountAll({
      include: [
        {
          model: Vehicle,
          attributes: ['id', 'licensePlate', 'brand', 'model']
        },
        {
          model: Driver,
          attributes: ['id'],
          include: [
            {
              model: User,
              attributes: ['id', 'documentNumber', 'firstName', 'lastName']
            }
          ]
        }
      ],
      limit,
      offset,
      order: [['createdAt', 'DESC']]
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
    console.error('Error al obtener las evaluaciones:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener las evaluaciones',
      error: error.message
    });
  }
};

exports.getReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findByPk(id, {
      include: [
        {
          model: Vehicle,
          attributes: ['id', 'licensePlate', 'brand', 'model']
        },
        {
          model: Driver,
          attributes: ['id'],
          include: [
            {
              model: User,
              attributes: ['id', 'documentNumber', 'firstName', 'lastName']
            }
          ]
        }
      ]
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Evaluación no encontrada'
      });
    }

    return res.status(200).json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Error al obtener la evaluación:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener la evaluación',
      error: error.message
    });
  }
};

exports.getReviewsByVehicle = async (req, res) => {
  const { vehicleId } = req.params;
  try {
    const reviews = await Review.findAll({
      where: { vehicleId },
      include: [
        {
          model: Vehicle,
          attributes: ['id', 'licensePlate', 'brand', 'model']
        },
        {
          model: Driver,
          attributes: ['id'],
          include: [
            {
              model: User,
              attributes: ['id', 'documentNumber', 'firstName', 'lastName']
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Calcular promedio de calificaciones
    const averageRating = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
      : 0;

    return res.status(200).json({
      success: true,
      data: {
        reviews,
        averageRating: parseFloat(averageRating.toFixed(1))
      }
    });
  } catch (error) {
    console.error('Error al obtener evaluaciones por vehículo:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener evaluaciones por vehículo',
      error: error.message
    });
  }
};

exports.getReviewsByPerson = async (req, res) => {
  const { driverId } = req.params;
  try {
    const reviews = await Review.findAll({
      where: { driverId },
      include: [
        {
          model: Vehicle,
          attributes: ['id', 'licensePlate', 'brand', 'model']
        },
        {
          model: Driver,
          attributes: ['id'],
          include: [
            {
              model: User,
              attributes: ['id', 'documentNumber', 'firstName', 'lastName']
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      data: reviews
    });
  } catch (error) {
    console.error('Error al obtener evaluaciones por persona:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener evaluaciones por persona',
      error: error.message
    });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { vehicleId, driverId, rating, comment } = req.body;

    if (!vehicleId || !driverId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios'
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'La calificación debe estar entre 1 y 5'
      });
    }

    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'El vehículo no existe'
      });
    }

    const driver = await Driver.findByPk(driverId);
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'El conductor no existe'
      });
    }

    const newReview = await Review.create({
      vehicleId,
      driverId,
      rating,
      comment
    });

    return res.status(201).json({
      success: true,
      message: 'Evaluación creada exitosamente',
      data: newReview
    });
  } catch (error) {
    console.error('Error al crear la evaluación:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al crear la evaluación',
      error: error.message
    });
  }
};

exports.updateReview = async (req, res) => {
  const { id } = req.params;
  try {
    const { vehicleId, driverId, rating, comment } = req.body;

    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Evaluación no encontrada'
      });
    }

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        success: false,
        message: 'La calificación debe estar entre 1 y 5'
      });
    }

    if (vehicleId) {
      const vehicle = await Vehicle.findByPk(vehicleId);
      if (!vehicle) {
        return res.status(404).json({
          success: false,
          message: 'El vehículo no existe'
        });
      }
    }

    if (driverId) {
      const driver = await Driver.findByPk(driverId);
      if (!driver) {
        return res.status(404).json({
          success: false,
          message: 'El conductor no existe'
        });
      }
    }

    await review.update({
      vehicleId: vehicleId || review.vehicleId,
      driverId: driverId || review.driverId,
      rating: rating !== undefined ? rating : review.rating,
      comment: comment || review.comment
    });

    return res.status(200).json({
      success: true,
      message: 'Evaluación actualizada exitosamente',
      data: review
    });
  } catch (error) {
    console.error('Error al actualizar la evaluación:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar la evaluación',
      error: error.message
    });
  }
};

exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Evaluación no encontrada'
      });
    }

    await review.destroy();

    return res.status(200).json({
      success: true,
      message: 'Evaluación eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar la evaluación:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar la evaluación',
      error: error.message
    });
  }
};

exports.getOptions = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({
      attributes: ['id', 'licensePlate', 'brand', 'model'],
      order: [['licensePlate', 'ASC']]
    });

    const drivers = await Driver.findAll({
      attributes: ['id'],
      include: [
        {
          model: User,
          attributes: ['id', 'documentNumber', 'firstName', 'lastName']
        }
      ]
    });

    return res.status(200).json({
      success: true,
      data: {
        vehicles,
        drivers
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