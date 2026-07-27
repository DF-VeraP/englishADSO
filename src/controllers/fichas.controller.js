const { prisma } = require('../config/db');

// ── Helpers ────────────────────────────────────────────────
const fichaInclude = {
    programa: { select: { id: true, codigo: true, nombre: true, nivel: true } },
    instructores: {
        include: {
            instructor: {
                select: { id: true, nombre_usuario: true, correo_usuario: true, estado_usuario: true }
            }
        }
    },
    aprendices: {
        include: {
            aprendiz: {
                select: { id: true, nombre_usuario: true, correo_usuario: true, estado_usuario: true }
            }
        }
    },
    _count: { select: { instructores: true, aprendices: true } }
};

// ── CRUD Fichas ────────────────────────────────────────────

// GET /api/fichas
exports.getAllFichas = async (req, res) => {
    try {
        const { estado, search } = req.query;
        const where = {};
        if (estado) where.estado = estado;
        if (search) {
            where.OR = [
                { numero: { contains: search, mode: 'insensitive' } },
                { nombre_programa: { contains: search, mode: 'insensitive' } },
            ];
        }
        const fichas = await prisma.ficha.findMany({
            where,
            include: fichaInclude,
            orderBy: { createdAt: 'desc' }
        });
        res.json(fichas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/fichas/:id
exports.getFichaById = async (req, res) => {
    try {
        const ficha = await prisma.ficha.findUnique({
            where: { id: parseInt(req.params.id) },
            include: fichaInclude,
        });
        if (!ficha) return res.status(404).json({ message: 'Ficha no encontrada' });
        res.json(ficha);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST /api/fichas
exports.createFicha = async (req, res) => {
    try {
        const { numero, programaId, jornada, modalidad, estado, fecha_inicio, fecha_fin } = req.body;
        if (!numero || !programaId) {
            return res.status(400).json({ message: 'numero y programaId son requeridos' });
        }
        const ficha = await prisma.ficha.create({
            data: {
                numero,
                programaId:  parseInt(programaId),
                jornada:     jornada   || 'manana',
                modalidad:   modalidad || 'presencial',
                estado:      estado    || 'activa',
                fecha_inicio: fecha_inicio ? new Date(fecha_inicio) : null,
                fecha_fin:    fecha_fin    ? new Date(fecha_fin)    : null,
            },
            include: fichaInclude,
        });
        res.status(201).json(ficha);
    } catch (err) {
        if (err.code === 'P2002') {
            return res.status(409).json({ message: `Ya existe una ficha con número ${req.body.numero}` });
        }
        res.status(500).json({ message: err.message });
    }
};

// PUT /api/fichas/:id
exports.updateFicha = async (req, res) => {
    try {
        const { numero, programaId, jornada, modalidad, estado, fecha_inicio, fecha_fin } = req.body;
        const ficha = await prisma.ficha.update({
            where: { id: parseInt(req.params.id) },
            data: {
                ...(numero     && { numero }),
                ...(programaId && { programaId: parseInt(programaId) }),
                ...(jornada    && { jornada }),
                ...(modalidad  && { modalidad }),
                ...(estado     && { estado }),
                ...(fecha_inicio !== undefined && { fecha_inicio: fecha_inicio ? new Date(fecha_inicio) : null }),
                ...(fecha_fin    !== undefined && { fecha_fin:    fecha_fin    ? new Date(fecha_fin)    : null }),
            },
            include: fichaInclude,
        });
        res.json(ficha);
    } catch (err) {
        if (err.code === 'P2002') return res.status(409).json({ message: 'Número de ficha ya existe' });
        if (err.code === 'P2025') return res.status(404).json({ message: 'Ficha no encontrada' });
        res.status(500).json({ message: err.message });
    }
};

// DELETE /api/fichas/:id
exports.deleteFicha = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const aprendicesActivos = await prisma.fichaAprendiz.count({
            where: { fichaId: id, estado: 'activo' },
        });
        if (aprendicesActivos > 0) {
            return res.status(409).json({
                message: `No se puede eliminar: la ficha tiene ${aprendicesActivos} aprendiz(ces) activo(s). Retíralos o cámbiales el estado primero.`
            });
        }

        await prisma.ficha.delete({ where: { id } });
        res.json({ message: 'Ficha eliminada' });
    } catch (err) {
        if (err.code === 'P2025') return res.status(404).json({ message: 'Ficha no encontrada' });
        res.status(500).json({ message: err.message });
    }
};

// ── Instructores en Ficha ──────────────────────────────────

// POST /api/fichas/:id/instructores  { instructorId }
exports.asignarInstructor = async (req, res) => {
    try {
        const fichaId      = parseInt(req.params.id);
        const instructorId = parseInt(req.body.instructorId);
        if (!instructorId) return res.status(400).json({ message: 'instructorId requerido' });

        const instructor = await prisma.user.findFirst({
            where: { id: instructorId, rol_usuario: 'instructor' }
        });
        if (!instructor) return res.status(404).json({ message: 'Instructor no encontrado' });

        await prisma.fichaInstructor.create({ data: { fichaId, instructorId } });
        const ficha = await prisma.ficha.findUnique({ where: { id: fichaId }, include: fichaInclude });
        res.status(201).json(ficha);
    } catch (err) {
        if (err.code === 'P2002') return res.status(409).json({ message: 'Instructor ya asignado a esta ficha' });
        res.status(500).json({ message: err.message });
    }
};

// DELETE /api/fichas/:id/instructores/:instructorId
exports.quitarInstructor = async (req, res) => {
    try {
        const fichaId      = parseInt(req.params.id);
        const instructorId = parseInt(req.params.instructorId);
        await prisma.fichaInstructor.deleteMany({ where: { fichaId, instructorId } });
        const ficha = await prisma.ficha.findUnique({ where: { id: fichaId }, include: fichaInclude });
        res.json(ficha);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ── Aprendices en Ficha ────────────────────────────────────

// POST /api/fichas/:id/aprendices  { aprendizId }
exports.inscribirAprendiz = async (req, res) => {
    try {
        const fichaId   = parseInt(req.params.id);
        const aprendizId = parseInt(req.body.aprendizId);
        if (!aprendizId) return res.status(400).json({ message: 'aprendizId requerido' });

        const aprendiz = await prisma.user.findFirst({
            where: { id: aprendizId, rol_usuario: 'aprendiz' }
        });
        if (!aprendiz) return res.status(404).json({ message: 'Aprendiz no encontrado' });

        await prisma.fichaAprendiz.create({ data: { fichaId, aprendizId, estado: 'activo' } });

        // Reactivar usuario si estaba inactivo
        await prisma.user.update({
            where: { id: aprendizId },
            data:  { estado_usuario: true },
        });

        const ficha = await prisma.ficha.findUnique({ where: { id: fichaId }, include: fichaInclude });
        res.status(201).json(ficha);
    } catch (err) {
        if (err.code === 'P2002') return res.status(409).json({ message: 'Aprendiz ya inscrito en esta ficha' });
        res.status(500).json({ message: err.message });
    }
};

// PATCH /api/fichas/:id/aprendices/:aprendizId  { estado }
exports.actualizarEstadoAprendiz = async (req, res) => {
    try {
        const fichaId    = parseInt(req.params.id);
        const aprendizId = parseInt(req.params.aprendizId);
        const { estado } = req.body;

        await prisma.fichaAprendiz.updateMany({ where: { fichaId, aprendizId }, data: { estado } });

        if (estado === 'activo') {
            // Vuelve a estar activo en una ficha → reactivar cuenta
            await prisma.user.update({
                where: { id: aprendizId },
                data:  { estado_usuario: true },
            });
        } else if (estado === 'retirado' || estado === 'certificado') {
            // Sale de la ficha → desactivar solo si no tiene otras fichas activas
            const fichasActivas = await prisma.fichaAprendiz.count({
                where: { aprendizId, estado: 'activo' },
            });
            if (fichasActivas === 0) {
                await prisma.user.update({
                    where: { id: aprendizId },
                    data:  { estado_usuario: false },
                });
            }
        }

        const ficha = await prisma.ficha.findUnique({ where: { id: fichaId }, include: fichaInclude });
        res.json(ficha);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE /api/fichas/:id/aprendices/:aprendizId
exports.retirarAprendiz = async (req, res) => {
    try {
        const fichaId    = parseInt(req.params.id);
        const aprendizId = parseInt(req.params.aprendizId);
        await prisma.fichaAprendiz.deleteMany({ where: { fichaId, aprendizId } });
        const ficha = await prisma.ficha.findUnique({ where: { id: fichaId }, include: fichaInclude });
        res.json(ficha);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ── Vista por usuario ──────────────────────────────────────

// GET /api/fichas/instructor/:instructorId  → fichas del instructor
exports.getFichasDeInstructor = async (req, res) => {
    try {
        const instructorId = parseInt(req.params.instructorId);
        const registros = await prisma.fichaInstructor.findMany({
            where: { instructorId },
            include: { ficha: { include: { _count: { select: { aprendices: true, instructores: true } } } } }
        });
        res.json(registros.map(r => r.ficha));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/fichas/aprendiz/:aprendizId  → fichas del aprendiz (admin)
exports.getFichasDeAprendiz = async (req, res) => {
    try {
        const aprendizId = parseInt(req.params.aprendizId);
        const registros = await prisma.fichaAprendiz.findMany({
            where: { aprendizId },
            include: { ficha: { include: { _count: { select: { aprendices: true, instructores: true } } } } }
        });
        res.json(registros.map(r => ({ ...r.ficha, estadoAprendiz: r.estado })));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/fichas/mis-fichas  → fichas propias del aprendiz autenticado (con cursos e instructores)
exports.getMisFichasAprendiz = async (req, res) => {
    try {
        const aprendizId = req.user.id;
        const registros = await prisma.fichaAprendiz.findMany({
            where: { aprendizId },
            include: {
                ficha: {
                    include: {
                        programa: { select: { nombre: true, codigo: true } },
                        cursos: {
                            include: {
                                curso: {
                                    select: {
                                        id: true, titulo: true, descripcion: true,
                                        nivel: true, estado: true,
                                        instructor: { select: { id: true, nombre_usuario: true } },
                                        _count: { select: { modulos: true } },
                                    },
                                },
                            },
                            orderBy: { asignadoAt: 'asc' },
                        },
                        instructores: {
                            include: {
                                instructor: { select: { id: true, nombre_usuario: true, correo_usuario: true } },
                            },
                        },
                    },
                },
            },
            orderBy: { ficha: { numero: 'asc' } },
        });
        res.json(registros.map(r => ({
            id:             r.ficha.id,
            numero:         r.ficha.numero,
            jornada:        r.ficha.jornada,
            modalidad:      r.ficha.modalidad,
            estado:         r.ficha.estado,
            estadoAprendiz: r.estado,
            programa:       r.ficha.programa,
            cursos: r.ficha.cursos
                .filter(fc => fc.curso.estado)
                .map(fc => ({
                    cursoId:      fc.cursoId,
                    titulo:       fc.curso.titulo,
                    descripcion:  fc.curso.descripcion,
                    nivel:        fc.curso.nivel,
                    instructor:   fc.curso.instructor?.nombre_usuario || '—',
                    totalModulos: fc.curso._count.modulos,
                    fechaLimite:  fc.fechaLimite || null,
                })),
            instructores: r.ficha.instructores.map(fi => ({
                id:     fi.instructor.id,
                nombre: fi.instructor.nombre_usuario,
                correo: fi.instructor.correo_usuario,
            })),
        })));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
