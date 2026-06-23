const { prisma } = require('../config/db');
const { log, NIVELES } = require('../middleware/audit');
const notify = require('../services/notification.service');

const SELECT_CURSO = {
    id: true, titulo: true, descripcion: true, nivel: true, estado: true,
    createdAt: true, updatedAt: true,
    instructor: { select: { id: true, nombre_usuario: true, correo_usuario: true } },
    fichas: { select: { ficha: { select: { id: true, numero: true, programa: { select: { nombre: true } } } } } },
    _count: { select: { modulos: true, inscripciones: true } },
};

// GET /api/courses
async function list(req, res) {
    try {
        const { nivel, estado, instructorId } = req.query;
        const where = {};
        if (nivel) where.nivel = nivel;
        if (estado !== undefined) where.estado = estado === 'true';
        // Instructor solo ve sus propios cursos
        if (req.user.rol === 'instructor') where.instructorId = req.user.id;
        else if (instructorId) where.instructorId = Number(instructorId);

        const cursos = await prisma.curso.findMany({
            where, select: SELECT_CURSO, orderBy: { createdAt: 'desc' },
        });
        res.json(cursos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener cursos' });
    }
}

// GET /api/courses/:id
async function getById(req, res) {
    try {
        const id = Number(req.params.id);
        const curso = await prisma.curso.findUnique({
            where: { id },
            include: {
                instructor: { select: { id: true, nombre_usuario: true, correo_usuario: true } },
                modulos: { orderBy: { orden: 'asc' }, where: { estado: true } },
                _count: { select: { inscripciones: true } },
            },
        });
        if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });

        // Instructor solo puede ver sus propios cursos
        if (req.user.rol === 'instructor' && curso.instructorId !== req.user.id)
            return res.status(403).json({ message: 'Acceso denegado' });

        res.json(curso);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener curso' });
    }
}

// POST /api/courses  (admin only)
async function create(req, res) {
    try {
        const { titulo, descripcion, nivel, instructorId } = req.body;

        if (!titulo?.trim()) return res.status(400).json({ message: 'El título es obligatorio' });
        if (!instructorId) return res.status(400).json({ message: 'El instructor es obligatorio' });
        if (nivel && !NIVELES.includes(nivel))
            return res.status(400).json({ message: `Nivel inválido. Opciones: ${NIVELES.join(', ')}` });

        const instructor = await prisma.user.findUnique({ where: { id: Number(instructorId) } });
        if (!instructor || instructor.rol_usuario !== 'instructor')
            return res.status(400).json({ message: 'El instructor indicado no existe o no tiene rol instructor' });

        const curso = await prisma.curso.create({
            data: {
                titulo:      titulo.trim(),
                descripcion: descripcion?.trim() || null,
                nivel:       nivel || 'basico',
                instructorId: Number(instructorId),
            },
            select: SELECT_CURSO,
        });

        await log({ accion: 'CREATE', recurso: 'cursos', recursoId: curso.id, detalle: curso.titulo, req });

        // Notificar al instructor asignado
        await notify.send({
            tipo:            'asignacion_curso',
            asunto:          `Te asignaron el curso: ${curso.titulo}`,
            mensaje:         `Has sido asignado como instructor del curso "<strong>${curso.titulo}</strong>" (nivel: ${curso.nivel}). Ya puedes gestionarlo desde tu panel.`,
            destinatarioId:  instructor.id,
            enviarEmail:     true,
        });

        res.status(201).json(curso);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al crear curso' });
    }
}

// PUT /api/courses/:id  (admin only)
async function update(req, res) {
    try {
        const id = Number(req.params.id);
        const existe = await prisma.curso.findUnique({ where: { id } });
        if (!existe) return res.status(404).json({ message: 'Curso no encontrado' });

        const { titulo, descripcion, nivel, estado, instructorId } = req.body;
        const data = {};

        if (titulo !== undefined)       data.titulo      = titulo.trim();
        if (descripcion !== undefined)  data.descripcion = descripcion?.trim() || null;
        if (nivel !== undefined) {
            if (!NIVELES.includes(nivel))
                return res.status(400).json({ message: `Nivel inválido. Opciones: ${NIVELES.join(', ')}` });
            data.nivel = nivel;
        }
        if (estado !== undefined) data.estado = Boolean(estado);
        if (instructorId !== undefined) {
            const instructor = await prisma.user.findUnique({ where: { id: Number(instructorId) } });
            if (!instructor || instructor.rol_usuario !== 'instructor')
                return res.status(400).json({ message: 'El instructor indicado no existe o no tiene rol instructor' });
            data.instructorId = Number(instructorId);
        }

        const curso = await prisma.curso.update({ where: { id }, data, select: SELECT_CURSO });
        await log({ accion: 'UPDATE', recurso: 'cursos', recursoId: id, detalle: curso.titulo, req });
        res.json(curso);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al actualizar curso' });
    }
}

// DELETE /api/courses/:id  (admin only)
async function remove(req, res) {
    try {
        const id = Number(req.params.id);
        const existe = await prisma.curso.findUnique({ where: { id } });
        if (!existe) return res.status(404).json({ message: 'Curso no encontrado' });

        await prisma.curso.delete({ where: { id } });
        await log({ accion: 'DELETE', recurso: 'cursos', recursoId: id, detalle: existe.titulo, req });
        res.json({ message: 'Curso eliminado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al eliminar curso' });
    }
}

// GET /api/courses/instructors  — lista de instructores disponibles para asignar
async function getInstructors(req, res) {
    try {
        const instructores = await prisma.user.findMany({
            where: { rol_usuario: 'instructor', estado_usuario: true },
            select: { id: true, nombre_usuario: true, correo_usuario: true },
            orderBy: { nombre_usuario: 'asc' },
        });
        res.json(instructores);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener instructores' });
    }
}

module.exports = { list, getById, create, update, remove, getInstructors };
