const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

exports.login = async (req, res) => {
    try {
        const { usuario, contrasenia } = req.body;

        const usuarioExistente = await Usuario.findOne({ where: { usuario } });
        if (!usuarioExistente) return res.status(401).json({ message: 'Usuario no encontrado' });

        const contraseniaValida = bcrypt.compareSync(contrasenia, usuarioExistente.contrasenia);
        if (!contraseniaValida) return res.status(401).json({ message: 'Contraseña incorrecta' });
    
        const tokenPayload = {
            id: usuarioExistente.id,
            usuario: usuarioExistente.usuario,
            idRol: usuarioExistente.idRol,
            idEstado: usuarioExistente.idEstado
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.json({
            id: usuarioExistente.id,
            usuario: usuarioExistente.usuario,
            idRol: usuarioExistente.idRol,
            idEstado: usuarioExistente.idEstado,
            tokenAcceso: token
        });

    } catch (error) {
        console.error('Error en el login:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};