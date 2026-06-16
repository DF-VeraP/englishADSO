const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const auth = req.headers['authorization'];
    const token = auth && auth.startsWith('Bearer ') ? auth.slice(7) : null;

    if (!token) return res.status(401).json({ message: 'Token requerido' });

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
}

module.exports = { verifyToken };
