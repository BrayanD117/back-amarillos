const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token && req.cookies && req.cookies.tokenAcceso) {
        token = req.cookies.tokenAcceso;
    }

    if (!token) return res.status(403).json({ message: 'No se proporcionó un token' });

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trim();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token no válido' });
        req.id = decoded.id;
        req.usuario = decoded.usuario;
        req.rol = decoded.rol;
        req.idEstado = decoded.idEstado;
        next();
    });
};

exports.isAdmin = (req, res, next) => {
    if (req.rol === "Admin") {
        return next();
    }
    res.status(403).json({ message: 'No tiene permisos para realizar esta acción' });
}

exports.isDriver = (req, res, next) => {
    if (req.rol === "Conductor") {
        return next();
    }
    res.status(403).json({ message: 'No tiene permisos para realizar esta acción' });
}