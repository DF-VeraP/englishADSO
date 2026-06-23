const { prisma } = require('../config/db');

const programaInclude = {
    _count: { select: { fichas: true } }
};

// GET /api/programas
exports.getAll = async (req, res) => {
    try {
        const { search } = req.query;
        const where = search ? {
            OR: [
                { codigo:  { contains: search, mode: 'insensitive' } },
                { nombre:  { contains: search, mode: 'insensitive' } },
            ]
        } : {};
        const programas = await prisma.programa.findMany({
            where,
            include: {
                ...programaInclude,
                fichas: {
                    select: { id: true, numero: true, estado: true, jornada: true }
                }
            },
            orderBy: { nombre: 'asc' }
        });
        res.json(programas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/programas/:id
exports.getById = async (req, res) => {
    try {
        const programa = await prisma.programa.findUnique({
            where: { id: parseInt(req.params.id) },
            include: {
                fichas: {
                    include: {
                        _count: { select: { instructores: true, aprendices: true } }
                    }
                }
            }
        });
        if (!programa) return res.status(404).json({ message: 'Programa no encontrado' });
        res.json(programa);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST /api/programas
exports.create = async (req, res) => {
    try {
        const { codigo, nombre, nivel, duracion } = req.body;
        if (!codigo || !nombre) {
            return res.status(400).json({ message: 'codigo y nombre son requeridos' });
        }
        const programa = await prisma.programa.create({
            data: {
                codigo,
                nombre,
                nivel:    nivel    || 'tecnologo',
                duracion: duracion ? parseInt(duracion) : null,
            },
            include: programaInclude
        });
        res.status(201).json(programa);
    } catch (err) {
        if (err.code === 'P2002') {
            return res.status(409).json({ message: `Ya existe un programa con código ${req.body.codigo}` });
        }
        res.status(500).json({ message: err.message });
    }
};

// PUT /api/programas/:id
exports.update = async (req, res) => {
    try {
        const { codigo, nombre, nivel, duracion } = req.body;
        const programa = await prisma.programa.update({
            where: { id: parseInt(req.params.id) },
            data: {
                ...(codigo   && { codigo }),
                ...(nombre   && { nombre }),
                ...(nivel    && { nivel }),
                ...(duracion !== undefined && { duracion: duracion ? parseInt(duracion) : null }),
            },
            include: programaInclude
        });
        res.json(programa);
    } catch (err) {
        if (err.code === 'P2002') return res.status(409).json({ message: 'Código de programa ya existe' });
        if (err.code === 'P2025') return res.status(404).json({ message: 'Programa no encontrado' });
        res.status(500).json({ message: err.message });
    }
};

// DELETE /api/programas/:id
exports.remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const count = await prisma.ficha.count({ where: { programaId: id } });
        if (count > 0) {
            return res.status(409).json({
                message: `No se puede eliminar: el programa tiene ${count} ficha(s) activa(s). Elimina o reasigna las fichas primero.`
            });
        }
        await prisma.programa.delete({ where: { id } });
        res.json({ message: 'Programa eliminado' });
    } catch (err) {
        if (err.code === 'P2025') return res.status(404).json({ message: 'Programa no encontrado' });
        res.status(500).json({ message: err.message });
    }
};
