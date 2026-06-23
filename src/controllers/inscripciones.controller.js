const { prisma } = require('../config/db');
const { log, ESTADOS_INSCRIPCION } = require('../middleware/audit');
const notify = require('../services/notification.service');

const SELECT_INSC = {
    id: true, progreso: true, estado: true, createdAt: true, updatedAt: true,
    aprendiz: { select: { id: true, nombre_usuario: true, correo_usuario: true } },
    curso: {
        select: {
            id: true, titulo: true, nivel: true, estado: true,
            instructor: { select: { nombre_usuario: true } },
            fichas: {
                select: {
                    ficha: {
                        select: {
                            numero: true,
                            programa: { select: { nombre: true } },
                        },
                    },
                },
                take: 1,
            },
        },
    },
};

// GET /api/inscripciones  (admin: todas | aprendiz: las suyas)
async function list(req, res) {
    try {
        const where = {};
        if (req.user.rol === 'aprendiz') where.aprendizId = req.user.id;
        else if (req.query.aprendizId)   where.aprendizId = Number(req.query.aprendizId);
        if (req.query.cursoId)           where.cursoId    = Number(req.query.cursoId);
        if (req.query.estado)            where.estado     = req.query.estado;

        const lista = await prisma.inscripcion.findMany({
            where, select: SELECT_INSC, orderBy: { createdAt: 'desc' },
        });
        res.json(lista);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener inscripciones' });
    }
}

// POST /api/inscripciones  (admin inscribe un aprendiz a un curso)
async function create(req, res) {
    try {
        const { aprendizId, cursoId } = req.body;
        if (!aprendizId || !cursoId)
            return res.status(400).json({ message: 'aprendizId y cursoId son obligatorios' });

        const aprendiz = await prisma.user.findUnique({ where: { id: Number(aprendizId) } });
        if (!aprendiz || aprendiz.rol_usuario !== 'aprendiz')
            return res.status(400).json({ message: 'El aprendiz indicado no existe o no tiene rol aprendiz' });

        const curso = await prisma.curso.findUnique({ where: { id: Number(cursoId) } });
        if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });

        const existe = await prisma.inscripcion.findUnique({
            where: { aprendizId_cursoId: { aprendizId: Number(aprendizId), cursoId: Number(cursoId) } },
        });
        if (existe) return res.status(409).json({ message: 'El aprendiz ya está inscrito en este curso' });

        const inscripcion = await prisma.inscripcion.create({
            data: { aprendizId: Number(aprendizId), cursoId: Number(cursoId) },
            select: SELECT_INSC,
        });

        await log({ accion: 'CREATE', recurso: 'inscripciones', recursoId: inscripcion.id,
            detalle: `Aprendiz ${aprendizId} → Curso ${cursoId}`, req });

        await notify.send({
            tipo:           'asignacion_curso',
            asunto:         `Inscripción al curso: ${curso.titulo}`,
            mensaje:        `Hola <strong>${aprendiz.nombre_usuario || aprendiz.correo_usuario}</strong>, has sido inscrito en el curso "<strong>${curso.titulo}</strong>" (${curso.nivel}). ¡Mucho éxito!`,
            destinatarioId: Number(aprendizId),
            enviarEmail:    true,
        });

        res.status(201).json(inscripcion);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al crear inscripción' });
    }
}

// PUT /api/inscripciones/:id  — actualizar progreso o estado
async function update(req, res) {
    try {
        const id = Number(req.params.id);
        const insc = await prisma.inscripcion.findUnique({ where: { id } });
        if (!insc) return res.status(404).json({ message: 'Inscripción no encontrada' });

        // Aprendiz solo puede actualizar su propio progreso
        if (req.user.rol === 'aprendiz' && insc.aprendizId !== req.user.id)
            return res.status(403).json({ message: 'Acceso denegado' });

        const { progreso, estado } = req.body;
        const data = {};
        if (progreso !== undefined) {
            const p = Number(progreso);
            if (isNaN(p) || p < 0 || p > 100)
                return res.status(400).json({ message: 'El progreso debe ser un número entre 0 y 100' });
            data.progreso = p;
            if (p === 100) data.estado = 'completado';
        }
        if (estado !== undefined) {
            if (!ESTADOS_INSCRIPCION.includes(estado))
                return res.status(400).json({ message: `Estado inválido. Opciones: ${ESTADOS_INSCRIPCION.join(', ')}` });
            data.estado = estado;
        }

        const actualizada = await prisma.inscripcion.update({ where: { id }, data, select: SELECT_INSC });
        await log({ accion: 'UPDATE', recurso: 'inscripciones', recursoId: id,
            detalle: `progreso: ${actualizada.progreso}%, estado: ${actualizada.estado}`, req });
        res.json(actualizada);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al actualizar inscripción' });
    }
}

// DELETE /api/inscripciones/:id  (admin only)
async function remove(req, res) {
    try {
        const id = Number(req.params.id);
        const insc = await prisma.inscripcion.findUnique({ where: { id } });
        if (!insc) return res.status(404).json({ message: 'Inscripción no encontrada' });

        await prisma.inscripcion.delete({ where: { id } });
        await log({ accion: 'DELETE', recurso: 'inscripciones', recursoId: id,
            detalle: `Aprendiz ${insc.aprendizId} → Curso ${insc.cursoId}`, req });
        res.json({ message: 'Inscripción eliminada correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al eliminar inscripción' });
    }
}

module.exports = { list, create, update, remove };
