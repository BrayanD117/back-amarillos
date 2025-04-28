const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token && req.cookies && req.cookies.accessToken) {
        token = req.cookies.accessToken;
    }

    if (!token) return res.status(403).json({ message: 'No se proporcionó un token' });

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trim();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token no válido' });
        req.id = decoded.id;
        req.username = decoded.username;
        req.role = decoded.role;
        req.statusId = decoded.statusId;
        next();
    });
};

exports.isAdmin = (req, res, next) => {
    if (req.role === "Administrador") {
        return next();
    }
    res.status(403).json({ message: 'No tiene permisos para realizar esta acción' });
}

exports.isDriver = (req, res, next) => {
    if (req.role === "Conductor") {
        return next();
    }
    res.status(403).json({ message: 'No tiene permisos para realizar esta acción' });
}