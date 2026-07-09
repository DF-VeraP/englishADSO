const bcrypt = require('bcrypt');
const { prisma } = require('../config/db');

const SELECT = {
    id: true,
    nombre_usuario: true,
    correo_usuario: true,
    rol_usuario: true,
    estado_usuario: true,
    createdAt: true,
};

const getMe = async (req, res) => {
    try {
        const usuario = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                ...SELECT,
                _count: {
                    select: {
                        inscripciones: true,
                        insignias: true,
                    },
                },
            },
        });
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado.' });
        res.json(usuario);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener perfil.' });
    }
};

const updateMe = async (req, res) => {
    try {
        const { nombre_usuario, correo_usuario, passw_actual, passw_nueva } = req.body;
        const id = req.user.id;

        const usuario = await prisma.user.findUnique({ where: { id } });
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado.' });

        const data = {};

        if (nombre_usuario !== undefined) {
            data.nombre_usuario = nombre_usuario.trim() || null;
        }

        if (correo_usuario && correo_usuario !== usuario.correo_usuario) {
            const taken = await prisma.user.findUnique({ where: { correo_usuario } });
            if (taken) return res.status(409).json({ message: 'Ese correo ya está en uso.' });
            data.correo_usuario = correo_usuario.trim().toLowerCase();
        }

        if (passw_nueva) {
            if (!passw_actual) {
                return res.status(400).json({ message: 'Debes ingresar tu contraseña actual para cambiarla.' });
            }
            const valida = await bcrypt.compare(passw_actual, usuario.passw_usuario);
            if (!valida) return res.status(401).json({ message: 'Contraseña actual incorrecta.' });
            if (passw_nueva.length < 6) {
                return res.status(400).json({ message: 'La nueva contraseña debe tener al menos 6 caracteres.' });
            }
            data.passw_usuario = await bcrypt.hash(passw_nueva, 10);
        }

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ message: 'No hay cambios que guardar.' });
        }

        const actualizado = await prisma.user.update({
            where: { id },
            data,
            select: SELECT,
        });

        res.json({ message: 'Perfil actualizado correctamente.', usuario: actualizado });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al actualizar perfil.' });
    }
};

module.exports = { getMe, updateMe };
