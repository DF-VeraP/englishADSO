const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { prisma } = require('../config/db');

const ACCESS_EXPIRES  = process.env.JWT_EXPIRES_IN || '2h';
const REFRESH_EXPIRES = process.env.JWT_REFRESH_IN || '7d';

function signAccess(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: ACCESS_EXPIRES });
}

function signRefresh(payload) {
    const secret = process.env.JWT_REFRESH_SECRET || (process.env.JWT_SECRET + '_refresh');
    return jwt.sign(payload, secret, { expiresIn: REFRESH_EXPIRES });
}

const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const usuario = await prisma.user.findFirst({
            where: { correo_usuario: email, rol_usuario: role, estado_usuario: true },
        });

        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales incorrectas o rol no autorizado.' });
        }

        const passwordValida = await bcrypt.compare(password, usuario.passw_usuario);
        if (!passwordValida) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }

        const tokenPayload = {
            id: usuario.id,
            email: usuario.correo_usuario,
            rol: usuario.rol_usuario,
            nombre: usuario.nombre_usuario,
        };

        const token        = signAccess(tokenPayload);
        const refreshToken = signRefresh({ id: usuario.id });

        return res.status(200).json({
            message: `Bienvenido, ${usuario.nombre_usuario || 'Usuario'}`,
            user: {
                id: usuario.id,
                nombre: usuario.nombre_usuario,
                email: usuario.correo_usuario,
                rol: usuario.rol_usuario,
            },
            token,
            refreshToken,
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

const refresh = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: 'Refresh token requerido.' });

    try {
        const secret = process.env.JWT_REFRESH_SECRET || (process.env.JWT_SECRET + '_refresh');
        const decoded = jwt.verify(refreshToken, secret);

        const usuario = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, correo_usuario: true, rol_usuario: true, nombre_usuario: true, estado_usuario: true },
        });

        if (!usuario || !usuario.estado_usuario) {
            return res.status(401).json({ message: 'Usuario inactivo o no encontrado.' });
        }

        const tokenPayload = {
            id: usuario.id,
            email: usuario.correo_usuario,
            rol: usuario.rol_usuario,
            nombre: usuario.nombre_usuario,
        };

        res.json({
            token:        signAccess(tokenPayload),
            refreshToken: signRefresh({ id: usuario.id }),
        });
    } catch {
        res.status(401).json({ message: 'Refresh token inválido o expirado.' });
    }
};

module.exports = { login, refresh };
