const { Review, Vehicle, Person } = require('../models');
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
          model: Person,
          attributes: ['id', 'firstName', 'lastName', 'documentNumber']
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
          model: Person,
          attributes: ['id', 'firstName', 'lastName', 'documentNumber']
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
          model: Person,
          attributes: ['id', 'firstName', 'lastName', 'documentNumber']
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
  const { personId } = req.params;
  try {
    const reviews = await Review.findAll({
      where: { personId },
      include: [
        {
          model: Vehicle,
          attributes: ['id', 'licensePlate', 'brand', 'model']
        },
        {
          model: Person,
          attributes: ['id', 'firstName', 'lastName', 'documentNumber']
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
    const { vehicleId, personId, rating, comment } = req.body;

    if (!vehicleId || !personId || !rating || !comment) {
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

    const person = await Person.findByPk(personId);
    if (!person) {
      return res.status(404).json({
        success: false,
        message: 'La persona no existe'
      });
    }

    const newReview = await Review.create({
      vehicleId,
      personId,
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
    const { vehicleId, personId, rating, comment } = req.body;

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

    if (personId) {
      const person = await Person.findByPk(personId);
      if (!person) {
        return res.status(404).json({
          success: false,
          message: 'La persona no existe'
        });
      }
    }

    await review.update({
      vehicleId: vehicleId || review.vehicleId,
      personId: personId || review.personId,
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

    const persons = await Person.findAll({
      attributes: ['id', 'firstName', 'lastName', 'documentNumber'],
      order: [['lastName', 'ASC'], ['firstName', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      data: {
        vehicles,
        persons
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