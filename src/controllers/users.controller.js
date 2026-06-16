const bcrypt = require('bcrypt');
const { prisma } = require('../config/db');

const ROLES = ['admin', 'instructor', 'aprendiz'];

const SELECT = {
    id: true,
    nombre_usuario: true,
    correo_usuario: true,
    rol_usuario: true,
    estado_usuario: true,
    createdAt: true,
};

const list = async (req, res) => {
    try {
        const usuarios = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: SELECT,
        });
        res.json(usuarios);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
};

const getById = async (req, res) => {
    try {
        const usuario = await prisma.user.findUnique({
            where: { id: Number(req.params.id) },
            select: SELECT,
        });
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(usuario);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener usuario' });
    }
};

const create = async (req, res) => {
    try {
        const { nombre_usuario, correo_usuario, passw_usuario, rol_usuario } = req.body;

        if (!correo_usuario || !passw_usuario || !rol_usuario) {
            return res.status(400).json({ message: 'Correo, contraseña y rol son obligatorios' });
        }
        if (!ROLES.includes(rol_usuario)) {
            return res.status(400).json({ message: 'Rol inválido' });
        }
        if (passw_usuario.length < 6) {
            return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
        }

        const existe = await prisma.user.findUnique({ where: { correo_usuario } });
        if (existe) return res.status(409).json({ message: 'El correo ya está registrado' });

        const usuario = await prisma.user.create({
            data: {
                nombre_usuario: nombre_usuario || null,
                correo_usuario,
                passw_usuario: await bcrypt.hash(passw_usuario, 10),
                rol_usuario,
                estado_usuario: true,
            },
            select: SELECT,
        });

        res.status(201).json({ message: 'Usuario creado exitosamente', usuario });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al crear usuario' });
    }
};

const update = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { nombre_usuario, correo_usuario, passw_usuario, rol_usuario, estado_usuario } = req.body;

        const existe = await prisma.user.findUnique({ where: { id } });
        if (!existe) return res.status(404).json({ message: 'Usuario no encontrado' });

        if (correo_usuario && correo_usuario !== existe.correo_usuario) {
            const taken = await prisma.user.findUnique({ where: { correo_usuario } });
            if (taken) return res.status(409).json({ message: 'El correo ya está registrado' });
        }

        if (rol_usuario && !ROLES.includes(rol_usuario)) {
            return res.status(400).json({ message: 'Rol inválido' });
        }

        if (passw_usuario && passw_usuario.length < 6) {
            return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
        }

        const data = {};
        if (nombre_usuario !== undefined) data.nombre_usuario = nombre_usuario || null;
        if (correo_usuario) data.correo_usuario = correo_usuario;
        if (rol_usuario) data.rol_usuario = rol_usuario;
        if (estado_usuario !== undefined) data.estado_usuario = Boolean(estado_usuario);
        if (passw_usuario) data.passw_usuario = await bcrypt.hash(passw_usuario, 10);

        const usuario = await prisma.user.update({
            where: { id },
            data,
            select: SELECT,
        });

        res.json({ message: 'Usuario actualizado', usuario });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al actualizar usuario' });
    }
};

const remove = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (id === req.user.id) {
            return res.status(400).json({ message: 'No puedes eliminar tu propia cuenta' });
        }

        const existe = await prisma.user.findUnique({ where: { id } });
        if (!existe) return res.status(404).json({ message: 'Usuario no encontrado' });

        await prisma.user.delete({ where: { id } });
        res.json({ message: 'Usuario eliminado' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
};

module.exports = { list, getById, create, update, remove };
