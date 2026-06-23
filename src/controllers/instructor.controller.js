const { prisma } = require('../config/db');

const fichaInclude = {
    programa: { select: { id: true, nombre: true, codigo: true, nivel: true } },
    aprendices: {
        include: {
            aprendiz: { select: { id: true, nombre_usuario: true, correo_usuario: true, estado_usuario: true } }
        },
        orderBy: { ingresadoAt: 'asc' }
    },
    cursos: {
        include: {
            curso: { select: { id: true, titulo: true, descripcion: true, nivel: true, estado: true } }
        }
    },
    _count: { select: { aprendices: true, instructores: true } }
};

async function perteneceAFicha(fichaId, instructorId) {
    const reg = await prisma.fichaInstructor.findUnique({
        where: { fichaId_instructorId: { fichaId, instructorId } }
    });
    return !!reg;
}

// GET /api/instructor/fichas
exports.getMisFichas = async (req, res) => {
    try {
        const instructorId = req.user.id;
        const registros = await prisma.fichaInstructor.findMany({
            where: { instructorId },
            include: { ficha: { include: fichaInclude } },
            orderBy: { asignadoAt: 'desc' }
        });
        res.json(registros.map(r => r.ficha));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/instructor/cursos
exports.getMisCursos = async (req, res) => {
    try {
        const instructorId = req.user.id;
        const cursos = await prisma.curso.findMany({
            where: { instructorId },
            include: {
                fichas: {
                    include: {
                        ficha: { select: { id: true, numero: true, programa: { select: { nombre: true } } } }
                    }
                },
                _count: { select: { inscripciones: true, modulos: true } }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(cursos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST /api/instructor/cursos
exports.crearCurso = async (req, res) => {
    try {
        const instructorId = req.user.id;
        const { titulo, descripcion, nivel } = req.body;
        if (!titulo) return res.status(400).json({ message: 'El título es requerido' });

        const curso = await prisma.curso.create({
            data: {
                titulo: titulo.trim(),
                descripcion: descripcion?.trim() || null,
                nivel: nivel || 'basico',
                instructorId,
            }
        });
        res.status(201).json(curso);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PUT /api/instructor/cursos/:id
exports.actualizarCurso = async (req, res) => {
    try {
        const instructorId = req.user.id;
        const cursoId = parseInt(req.params.id);
        const { titulo, descripcion, nivel, estado } = req.body;

        const curso = await prisma.curso.findFirst({ where: { id: cursoId, instructorId } });
        if (!curso) return res.status(404).json({ message: 'Curso no encontrado o sin permiso' });

        const updated = await prisma.curso.update({
            where: { id: cursoId },
            data: {
                ...(titulo      !== undefined && { titulo: titulo.trim() }),
                ...(descripcion !== undefined && { descripcion: descripcion?.trim() || null }),
                ...(nivel       !== undefined && { nivel }),
                ...(estado      !== undefined && { estado: Boolean(estado) }),
            }
        });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE /api/instructor/cursos/:id
exports.eliminarCurso = async (req, res) => {
    try {
        const instructorId = req.user.id;
        const cursoId = parseInt(req.params.id);

        const curso = await prisma.curso.findFirst({ where: { id: cursoId, instructorId } });
        if (!curso) return res.status(404).json({ message: 'Curso no encontrado o sin permiso' });

        const inscritos = await prisma.inscripcion.count({ where: { cursoId, estado: 'activo' } });
        if (inscritos > 0) {
            return res.status(409).json({ message: `No se puede eliminar: tiene ${inscritos} aprendiz(ces) inscritos activos` });
        }

        await prisma.curso.delete({ where: { id: cursoId } });
        res.json({ message: 'Curso eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST /api/instructor/fichas/:fichaId/cursos  { cursoId }
exports.asignarCursoAFicha = async (req, res) => {
    try {
        const instructorId = req.user.id;
        const fichaId  = parseInt(req.params.fichaId);
        const cursoId  = parseInt(req.body.cursoId);

        if (!await perteneceAFicha(fichaId, instructorId)) {
            return res.status(403).json({ message: 'No tienes acceso a esta ficha' });
        }

        const curso = await prisma.curso.findFirst({ where: { id: cursoId, instructorId } });
        if (!curso) return res.status(404).json({ message: 'Curso no encontrado o sin permiso' });

        await prisma.fichaCurso.create({ data: { fichaId, cursoId } });

        // Auto-inscribir aprendices activos de la ficha
        const aprendices = await prisma.fichaAprendiz.findMany({ where: { fichaId, estado: 'activo' } });
        for (const { aprendizId } of aprendices) {
            await prisma.inscripcion.upsert({
                where:  { aprendizId_cursoId: { aprendizId, cursoId } },
                create: { aprendizId, cursoId, estado: 'activo' },
                update: { estado: 'activo' },
            });
        }

        res.status(201).json({ message: `Curso asignado. ${aprendices.length} aprendiz(ces) inscritos automáticamente.` });
    } catch (err) {
        if (err.code === 'P2002') return res.status(409).json({ message: 'Este curso ya está asignado a la ficha' });
        res.status(500).json({ message: err.message });
    }
};

// DELETE /api/instructor/fichas/:fichaId/cursos/:cursoId
exports.quitarCursoDeFicha = async (req, res) => {
    try {
        const instructorId = req.user.id;
        const fichaId = parseInt(req.params.fichaId);
        const cursoId = parseInt(req.params.cursoId);

        if (!await perteneceAFicha(fichaId, instructorId)) {
            return res.status(403).json({ message: 'No tienes acceso a esta ficha' });
        }

        await prisma.fichaCurso.deleteMany({ where: { fichaId, cursoId } });
        res.json({ message: 'Curso removido de la ficha' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
