const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Role } = require('../models');

exports.login = async (req, res) => {
    try {
        const { usuario, contrasenia } = req.body;

        const usuarioExistente = await User.findOne({ where: { usuario }, include: Role });
        if (!usuarioExistente) return res.status(401).json({ message: 'User no encontrado' });

        const contraseniaValida = bcrypt.compareSync(contrasenia, usuarioExistente.contrasenia);
        if (!contraseniaValida) return res.status(401).json({ message: 'Contraseña incorrecta' });
    
        const roleName = usuarioExistente.Role.nombre;

        const tokenPayload = {
            id: usuarioExistente.id,
            usuario: usuarioExistente.usuario,
            rol: roleName,
            idEstado: usuarioExistente.idEstado
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('tokenAcceso', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000
        })

        return res.json({
            id: usuarioExistente.id,
            usuario: usuarioExistente.usuario,
            rol: roleName,
            idEstado: usuarioExistente.idEstado
        });

    } catch (error) {
        console.error('Error en el login:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('tokenAcceso');
    return res.json({ message: 'Logout exitoso' });
};
