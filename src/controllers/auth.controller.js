const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: 'El correo, la contraseña y el rol son obligatorios.' });
        }

        // Buscar usuario por email y rol usando los nuevos campos
        const usuario = await db.user.findFirst({
            where: {
                correo_usuario: email,
                rol_usuario: role,
                estado_usuario: true
            }
        });

        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales incorrectas o rol no autorizado.' });
        }

        // Verificar contraseña
        const passwordValida = await bcrypt.compare(password, usuario.passw_usuario);
        if (!passwordValida) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: usuario.id, email: usuario.correo_usuario, rol: usuario.rol_usuario },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        return res.status(200).json({
            message: `Bienvenido, ${usuario.nombre_usuario || 'Usuario'}`,
            user: {
                id: usuario.id,
                nombre: usuario.nombre_usuario,
                email: usuario.correo_usuario,
                rol: usuario.rol_usuario,
            },
            token,
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

module.exports = { login };
