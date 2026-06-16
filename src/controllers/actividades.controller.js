const { prisma } = require('../config/db');

const TIPOS_VALIDOS = [
    'warm_up_drag', 'grammar_pill', 'flashcard_vocab', 'storybook_chat',
    'practica_fill', 'practica_audio_form', 'practica_dropdown',
    'desafio_audio', 'quiz_multiple', 'pretest', 'postest'
];

// GET /api/courses/:cursoId/play
// Retorna el curso completo con módulos → momentos → actividades (para el player)
async function getCoursePlayer(req, res) {
    try {
        const cursoId = Number(req.params.cursoId);
        const aprendizId = req.user.id;

        const curso = await prisma.curso.findUnique({
            where: { id: cursoId },
            include: {
                instructor: { select: { nombre_usuario: true } },
                modulos: {
                    where: { estado: true },
                    orderBy: { orden: 'asc' },
                    include: {
                        momentos: {
                            orderBy: { orden: 'asc' },
                            include: {
                                actividades: {
                                    where: { estado: true },
                                    orderBy: { orden: 'asc' },
                                    include: {
                                        progresos: {
                                            where: { aprendizId },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });

        // Verificar que el aprendiz esté inscrito (o sea admin/instructor)
        if (req.user.rol === 'aprendiz') {
            const inscripcion = await prisma.inscripcion.findUnique({
                where: { aprendizId_cursoId: { aprendizId, cursoId } },
            });
            if (!inscripcion) return res.status(403).json({ message: 'No estás inscrito en este curso' });
        }

        // Insignias del aprendiz en este curso
        const insignias = await prisma.insigniaAprendiz.findMany({
            where: { aprendizId, cursoId },
        });

        // PRE-TEST resultado (si existe)
        const pretest = await prisma.testResultado.findFirst({
            where: { aprendizId, cursoId, tipo: 'pretest' },
            orderBy: { completadoAt: 'desc' },
        });

        res.json({ ...curso, insignias, pretest });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al cargar el curso' });
    }
}

// GET /api/momentos/:momentoId/actividades  (admin/instructor)
async function listActividades(req, res) {
    try {
        const momentoId = Number(req.params.momentoId);
        const actividades = await prisma.actividad.findMany({
            where: { momentoId },
            orderBy: { orden: 'asc' },
        });
        res.json(actividades);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener actividades' });
    }
}

// POST /api/momentos/:momentoId/actividades  (admin)
async function createActividad(req, res) {
    try {
        const momentoId = Number(req.params.momentoId);
        const { tipo, titulo, instrucciones, contenido, orden } = req.body;

        if (!tipo || !titulo || !contenido)
            return res.status(400).json({ message: 'tipo, titulo y contenido son obligatorios' });
        if (!TIPOS_VALIDOS.includes(tipo))
            return res.status(400).json({ message: `Tipo inválido. Opciones: ${TIPOS_VALIDOS.join(', ')}` });

        const momento = await prisma.momento.findUnique({ where: { id: momentoId } });
        if (!momento) return res.status(404).json({ message: 'Momento no encontrado' });

        const conteo = await prisma.actividad.count({ where: { momentoId } });
        const actividad = await prisma.actividad.create({
            data: {
                tipo, titulo,
                instrucciones: instrucciones || null,
                contenido,
                orden: orden ?? conteo,
                momentoId,
            },
        });
        res.status(201).json(actividad);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al crear actividad' });
    }
}

// PUT /api/actividades/:id  (admin)
async function updateActividad(req, res) {
    try {
        const id = Number(req.params.id);
        const { titulo, instrucciones, contenido, orden, estado } = req.body;
        const data = {};
        if (titulo       !== undefined) data.titulo       = titulo;
        if (instrucciones !== undefined) data.instrucciones = instrucciones;
        if (contenido    !== undefined) data.contenido    = contenido;
        if (orden        !== undefined) data.orden        = Number(orden);
        if (estado       !== undefined) data.estado       = Boolean(estado);

        const actividad = await prisma.actividad.update({ where: { id }, data });
        res.json(actividad);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al actualizar actividad' });
    }
}

// DELETE /api/actividades/:id  (admin)
async function deleteActividad(req, res) {
    try {
        const id = Number(req.params.id);
        await prisma.actividad.delete({ where: { id } });
        res.json({ message: 'Actividad eliminada' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar actividad' });
    }
}

// POST /api/modulos/:moduloId/momentos  (admin)
async function createMomento(req, res) {
    try {
        const moduloId = Number(req.params.moduloId);
        const { nombre, tipo, orden } = req.body;
        if (!nombre || !tipo) return res.status(400).json({ message: 'nombre y tipo son obligatorios' });

        const modulo = await prisma.modulo.findUnique({ where: { id: moduloId } });
        if (!modulo) return res.status(404).json({ message: 'Módulo no encontrado' });

        const momento = await prisma.momento.create({
            data: { nombre, tipo, orden: orden ?? 0, moduloId },
        });
        res.status(201).json(momento);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al crear momento' });
    }
}

module.exports = {
    getCoursePlayer, listActividades, createActividad,
    updateActividad, deleteActividad, createMomento,
};
