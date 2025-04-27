const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review');
const { verifyToken } = require('../middlewares/authJwt');

router.get('/options', verifyToken, reviewController.getOptions);

router.get('/vehicle/:vehicleId', verifyToken, reviewController.getReviewsByVehicle);

router.get('/person/:personId', verifyToken, reviewController.getReviewsByPerson);

router.get('/', verifyToken, reviewController.getReviews);

router.get('/:id', verifyToken, reviewController.getReviewById);

router.post('/', verifyToken, reviewController.createReview);

router.put('/:id', verifyToken, reviewController.updateReview);

router.delete('/:id', verifyToken, reviewController.deleteReview);

module.exports = router;