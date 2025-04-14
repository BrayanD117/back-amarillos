const express = require('express');
const router = express.Router();
const cardController = require('../controllers/tarjeta');
const { verifyToken, isAdmin } = require('../middlewares/autenticacionJwt');

router.post('/', cardController.createCard);


//router.get('/opciones', usuarioController.getUserOptions);
router.get('/', verifyToken, isAdmin, cardController.getAllCards);
router.get('/:id', verifyToken, cardController.getCardById);


router.put('/:id', verifyToken, isAdmin, cardController.updateCard);


router.delete('/:id', verifyToken, isAdmin, cardController.deleteCard);

module.exports = router;