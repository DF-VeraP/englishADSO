const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: 'El correo, la contraseña y el rol son obligatorios.' });
        }

        // Buscar usuario por email y rol
        const result = await db.query(
            'SELECT * FROM usuarios WHERE email = $1 AND rol = $2 AND activo = TRUE',
            [email, role]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Credenciales incorrectas o rol no autorizado.' });
        }

        const usuario = result.rows[0];

        // Verificar contraseña
        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        return res.status(200).json({
            message: `Bienvenido, ${usuario.nombre}`,
            user: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
            },
            token,
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

module.exports = { login };
