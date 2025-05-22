const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Role } = require('../models');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ where: { username }, include: Role });
        if (!existingUser) return res.status(401).json({ message: 'Usuario no encontrado' });

        const validPassword = bcrypt.compareSync(password, existingUser.password);
        if (!validPassword) return res.status(401).json({ message: 'Contraseña incorrecta' });

        const tokenPayload = {
            id: existingUser.id,
            username: existingUser.username,
            role: existingUser.Role.name,
            statusId: existingUser.statusId
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000,
            path: '/'
        })

        return res.json({
            id: existingUser.id,
            username: existingUser.username,
            role: existingUser.Role.name,
            statusId: existingUser.statusId
        });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

exports.logout = (req, res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    path: '/'
  });
  return res.json({ message: 'Cierre de sesión exitoso' });
};