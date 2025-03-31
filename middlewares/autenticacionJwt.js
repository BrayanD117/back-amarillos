const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];

    if (!token) return res.status(403).json({ message: 'No se proporcionó un token' });

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trim();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token no válido' });
        req.userId = decoded.id;
        req.usuario = decoded.usuario;
        req.idRol = decoded.idRol;
        req.idEstado = decoded.idEstado;
        next();
    });
};