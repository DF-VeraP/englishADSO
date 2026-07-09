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

        const { fechaLimite } = req.body;
        await prisma.fichaCurso.create({
            data: { fichaId, cursoId, fechaLimite: fechaLimite ? new Date(fechaLimite) : null }
        });

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

// PUT /api/instructor/fichas/:fichaId/cursos/:cursoId  { fechaLimite }
exports.actualizarFechaCurso = async (req, res) => {
    try {
        const instructorId = req.user.id;
        const fichaId  = parseInt(req.params.fichaId);
        const cursoId  = parseInt(req.params.cursoId);
        const { fechaLimite } = req.body;

        if (!await perteneceAFicha(fichaId, instructorId)) {
            return res.status(403).json({ message: 'No tienes acceso a esta ficha' });
        }

        const fc = await prisma.fichaCurso.findUnique({
            where: { fichaId_cursoId: { fichaId, cursoId } }
        });
        if (!fc) return res.status(404).json({ message: 'Asignación no encontrada' });

        const updated = await prisma.fichaCurso.update({
            where: { fichaId_cursoId: { fichaId, cursoId } },
            data: { fechaLimite: fechaLimite ? new Date(fechaLimite) : null }
        });
        res.json(updated);
    } catch (err) {
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

// GET /api/instructor/progreso-resumen
exports.getProgresoResumen = async (req, res) => {
    try {
        const instructorId = req.user.id;

        const registros = await prisma.fichaInstructor.findMany({
            where: { instructorId },
            include: {
                ficha: {
                    include: {
                        aprendices: { where: { estado: 'activo' }, select: { aprendizId: true } },
                        cursos:     { select: { cursoId: true } }
                    }
                }
            }
        });

        const resumen = await Promise.all(registros.map(async r => {
            const ficha       = r.ficha;
            const aprendizIds = ficha.aprendices.map(a => a.aprendizId);
            const cursoIds    = ficha.cursos.map(c => c.cursoId);

            if (!aprendizIds.length || !cursoIds.length) {
                return { fichaId: ficha.id, avgProgreso: 0 };
            }

            const inscripciones = await prisma.inscripcion.findMany({
                where: { aprendizId: { in: aprendizIds }, cursoId: { in: cursoIds } },
                select: { progreso: true }
            });

            const totalPosible = aprendizIds.length * cursoIds.length;
            const suma         = inscripciones.reduce((s, i) => s + i.progreso, 0);
            const avgProgreso  = Math.round(suma / totalPosible);

            return { fichaId: ficha.id, avgProgreso };
        }));

        res.json(resumen);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/instructor/fichas/:fichaId/progreso
exports.getProgresoFicha = async (req, res) => {
    try {
        const instructorId = req.user.id;
        const fichaId = parseInt(req.params.fichaId);

        if (!await perteneceAFicha(fichaId, instructorId)) {
            return res.status(403).json({ message: 'No tienes acceso a esta ficha' });
        }

        const ficha = await prisma.ficha.findUnique({
            where: { id: fichaId },
            include: {
                programa: { select: { nombre: true } },
                aprendices: {
                    where: { estado: 'activo' },
                    include: {
                        aprendiz: { select: { id: true, nombre_usuario: true, correo_usuario: true } }
                    },
                    orderBy: { ingresadoAt: 'asc' }
                },
                cursos: {
                    include: { curso: { select: { id: true, titulo: true, nivel: true } } }
                }
            }
        });

        if (!ficha) return res.status(404).json({ message: 'Ficha no encontrada' });

        const cursos = ficha.cursos.map(fc => fc.curso);
        const aprendizIds = ficha.aprendices.map(fa => fa.aprendizId);
        const cursoIds    = cursos.map(c => c.id);

        const inscripciones = await prisma.inscripcion.findMany({
            where: { aprendizId: { in: aprendizIds }, cursoId: { in: cursoIds } },
            select: { aprendizId: true, cursoId: true, progreso: true, estado: true }
        });

        const inscMap = {};
        for (const ins of inscripciones) {
            inscMap[`${ins.aprendizId}-${ins.cursoId}`] = ins;
        }

        const aprendices = ficha.aprendices.map(fa => {
            const u = fa.aprendiz;
            const cursoProgreso = cursos.map(c => {
                const ins = inscMap[`${u.id}-${c.id}`];
                return { cursoId: c.id, titulo: c.titulo, nivel: c.nivel, progreso: ins ? ins.progreso : null, estado: ins ? ins.estado : null };
            });
            const inscritos = cursoProgreso.filter(p => p.progreso !== null);
            const progresoGeneral = cursos.length > 0
                ? Math.round(inscritos.reduce((s, p) => s + p.progreso, 0) / cursos.length)
                : 0;
            return { id: u.id, nombre: u.nombre_usuario, correo: u.correo_usuario, cursos: cursoProgreso, progresoGeneral };
        });

        const avgProgreso = aprendices.length > 0
            ? Math.round(aprendices.reduce((s, a) => s + a.progresoGeneral, 0) / aprendices.length)
            : 0;

        res.json({ ficha: { id: ficha.id, numero: ficha.numero, programa: ficha.programa?.nombre || '', estado: ficha.estado }, cursos, aprendices, avgProgreso });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
