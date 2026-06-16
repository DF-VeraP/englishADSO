const { prisma } = require('../config/db');

// POST /api/actividades/:id/progreso
// El aprendiz registra que completó (o intentó) una actividad
async function saveProgreso(req, res) {
    try {
        const actividadId = Number(req.params.id);
        const aprendizId  = req.user.id;
        const { completada, puntaje, respuesta } = req.body;

        const actividad = await prisma.actividad.findUnique({ where: { id: actividadId } });
        if (!actividad) return res.status(404).json({ message: 'Actividad no encontrada' });

        const progreso = await prisma.progresoActividad.upsert({
            where:  { aprendizId_actividadId: { aprendizId, actividadId } },
            update: {
                completada: completada ?? false,
                puntaje:    puntaje ?? null,
                respuesta:  respuesta ?? null,
                intentos:   { increment: 1 },
                completadoAt: completada ? new Date() : null,
            },
            create: {
                aprendizId, actividadId,
                completada: completada ?? false,
                puntaje:    puntaje ?? null,
                respuesta:  respuesta ?? null,
                intentos:   1,
                completadoAt: completada ? new Date() : null,
            },
        });

        // Actualizar progreso general de la inscripción si es aprendiz
        if (req.user.rol === 'aprendiz') {
            await recalcularProgreso(aprendizId, actividadId);
        }

        res.json(progreso);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al guardar progreso' });
    }
}

// GET /api/courses/:cursoId/mi-progreso
async function getMiProgreso(req, res) {
    try {
        const cursoId    = Number(req.params.cursoId);
        const aprendizId = req.user.id;

        const inscripcion = await prisma.inscripcion.findUnique({
            where: { aprendizId_cursoId: { aprendizId, cursoId } },
        });

        const progresos = await prisma.progresoActividad.findMany({
            where: {
                aprendizId,
                actividad: {
                    momento: { modulo: { cursoId } },
                },
            },
            include: { actividad: { select: { id: true, tipo: true, titulo: true } } },
        });

        const insignias = await prisma.insigniaAprendiz.findMany({
            where: { aprendizId, cursoId },
        });

        const tests = await prisma.testResultado.findMany({
            where: { aprendizId, cursoId },
            orderBy: { completadoAt: 'asc' },
        });

        res.json({
            progreso: inscripcion?.progreso ?? 0,
            estado:   inscripcion?.estado   ?? 'activo',
            actividades: progresos,
            insignias,
            tests,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener progreso' });
    }
}

// POST /api/courses/:cursoId/insignias  — otorgar insignia al completar quiz
async function otorgarInsignia(req, res) {
    try {
        const cursoId    = Number(req.params.cursoId);
        const aprendizId = req.user.id;
        const { tipo, nombre, descripcion, emoji, moduloId } = req.body;

        // Evitar duplicados
        const existe = await prisma.insigniaAprendiz.findFirst({
            where: { aprendizId, cursoId, tipo },
        });
        if (existe) return res.json(existe);

        const insignia = await prisma.insigniaAprendiz.create({
            data: { aprendizId, cursoId, moduloId: moduloId || null, tipo, nombre, descripcion, emoji },
        });
        res.status(201).json(insignia);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al otorgar insignia' });
    }
}

// POST /api/courses/:cursoId/test  — guardar resultado de PRE/POS test
async function saveTest(req, res) {
    try {
        const cursoId    = Number(req.params.cursoId);
        const aprendizId = req.user.id;
        const { tipo, puntaje, total, correctas, respuestas } = req.body;

        if (!['pretest', 'postest'].includes(tipo))
            return res.status(400).json({ message: 'tipo debe ser pretest o postest' });

        const resultado = await prisma.testResultado.create({
            data: { aprendizId, cursoId, tipo, puntaje, total, correctas, respuestas },
        });
        res.status(201).json(resultado);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al guardar test' });
    }
}

// ── Helper interno ────────────────────────────────────────
async function recalcularProgreso(aprendizId, actividadId) {
    try {
        const actividad = await prisma.actividad.findUnique({
            where: { id: actividadId },
            include: { momento: { include: { modulo: { select: { cursoId: true } } } } },
        });
        if (!actividad) return;

        const cursoId = actividad.momento.modulo.cursoId;

        // Total de actividades del curso (excluir pretest/postest)
        const totalActividades = await prisma.actividad.count({
            where: {
                estado: true,
                tipo: { notIn: ['pretest', 'postest'] },
                momento: { modulo: { cursoId } },
            },
        });

        const completadas = await prisma.progresoActividad.count({
            where: {
                aprendizId,
                completada: true,
                actividad: {
                    estado: true,
                    tipo: { notIn: ['pretest', 'postest'] },
                    momento: { modulo: { cursoId } },
                },
            },
        });

        const porcentaje = totalActividades > 0
            ? Math.round((completadas / totalActividades) * 100)
            : 0;

        await prisma.inscripcion.updateMany({
            where: { aprendizId, cursoId },
            data: {
                progreso: porcentaje,
                estado:   porcentaje === 100 ? 'completado' : 'activo',
            },
        });
    } catch (err) {
        console.error('[progreso] Error al recalcular:', err.message);
    }
}

module.exports = { saveProgreso, getMiProgreso, otorgarInsignia, saveTest };
