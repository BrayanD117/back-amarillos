const express = require('express');
const router = express.Router();
const cardController = require('../controllers/card');
const { verifyToken, isAdmin } = require('../middlewares/authJwt');

router.get('/generate/:cardId', cardController.generateCard);
router.post('/', cardController.createCard);
router.get('/', verifyToken, isAdmin, cardController.getAllCards);
router.get('/options', verifyToken, isAdmin, cardController.getCardOptions);
router.get('/:id', verifyToken, cardController.getCardById);
router.put('/:id', verifyToken, isAdmin, cardController.updateCard);
router.delete('/:id', verifyToken, isAdmin, cardController.deleteCard);

module.exports = router;