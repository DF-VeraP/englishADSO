const { prisma } = require('../config/db');

const CURSO_SELECT = {
    id: true, titulo: true, descripcion: true, nivel: true,
    instructor: { select: { id: true, nombre_usuario: true, correo_usuario: true } },
    _count: { select: { modulos: true } },
};

const getAprendizDashboard = async (req, res) => {
    const userId = req.user.id;
    try {
        const [inscripciones, fichasAprendiz, insignias, testResultados] = await Promise.all([
            prisma.inscripcion.findMany({
                where: { aprendizId: userId },
                include: { curso: { select: CURSO_SELECT } },
                orderBy: { updatedAt: 'desc' },
            }),
            // Cursos asignados a través de fichas
            prisma.fichaAprendiz.findMany({
                where: { aprendizId: userId, estado: 'activo' },
                include: {
                    ficha: {
                        include: {
                            cursos: { include: { curso: { select: CURSO_SELECT } } },
                        },
                    },
                },
            }),
            prisma.insigniaAprendiz.findMany({
                where: { aprendizId: userId },
                orderBy: { otorgadaAt: 'desc' },
                take: 6,
            }),
            prisma.testResultado.findMany({
                where: { aprendizId: userId },
                orderBy: { completadoAt: 'desc' },
                take: 10,
            }),
        ]);

        // IDs ya inscritos para evitar duplicados
        const inscritosIds = new Set(inscripciones.map(i => i.cursoId));

        // Mapa cursoId → fechaLimite para cursos asignados por ficha
        const fichaDeadlineMap = {};
        for (const fa of fichasAprendiz) {
            for (const fc of fa.ficha.cursos) {
                if (fc.fechaLimite && !fichaDeadlineMap[fc.cursoId]) {
                    fichaDeadlineMap[fc.cursoId] = fc.fechaLimite;
                }
            }
        }

        // Cursos de ficha sin inscripción directa
        const cursosDeFicha = [];
        for (const fa of fichasAprendiz) {
            for (const fc of fa.ficha.cursos) {
                if (!inscritosIds.has(fc.cursoId)) {
                    inscritosIds.add(fc.cursoId);
                    cursosDeFicha.push({
                        inscripcionId: null,
                        cursoId:       fc.cursoId,
                        titulo:        fc.curso.titulo,
                        descripcion:   fc.curso.descripcion,
                        nivel:         fc.curso.nivel,
                        instructor:    fc.curso.instructor?.nombre_usuario || 'Sin asignar',
                        instructorId:  fc.curso.instructor?.id || null,
                        instructorCorreo: fc.curso.instructor?.correo_usuario || null,
                        totalModulos:  fc.curso._count.modulos,
                        progreso:      0,
                        estado:        'disponible',
                        updatedAt:     null,
                        deFicha:       true,
                        fechaLimite:   fc.fechaLimite || null,
                    });
                }
            }
        }

        const cursosActivos   = inscripciones.filter(i => i.estado === 'activo');
        const cursosCompletos = inscripciones.filter(i => i.estado === 'completado');
        const promedioProgreso = cursosActivos.length
            ? Math.round(cursosActivos.reduce((acc, i) => acc + i.progreso, 0) / cursosActivos.length)
            : 0;

        // Próxima actividad pendiente del primer curso activo
        let proximaActividad = null;
        if (cursosActivos.length > 0) {
            const primerCursoId = cursosActivos[0].cursoId;
            const progresosCompletados = await prisma.progresoActividad.findMany({
                where: { aprendizId: userId, completada: true },
                select: { actividadId: true },
            });
            const completadasIds = new Set(progresosCompletados.map(p => p.actividadId));

            const actividad = await prisma.actividad.findFirst({
                where: {
                    estado: true,
                    momento: { modulo: { cursoId: primerCursoId } },
                    id: { notIn: completadasIds.size ? [...completadasIds] : undefined },
                },
                include: {
                    momento: {
                        include: { modulo: { select: { id: true, titulo: true, orden: true, cursoId: true } } },
                    },
                },
                orderBy: { orden: 'asc' },
            });
            proximaActividad = actividad;
        }

        const todosCursos = [
            ...inscripciones.map(i => ({
                inscripcionId: i.id,
                cursoId:       i.cursoId,
                titulo:        i.curso.titulo,
                descripcion:   i.curso.descripcion,
                nivel:         i.curso.nivel,
                instructor:       i.curso.instructor?.nombre_usuario || 'Sin asignar',
                instructorId:     i.curso.instructor?.id || null,
                instructorCorreo: i.curso.instructor?.correo_usuario || null,
                totalModulos:  i.curso._count.modulos,
                progreso:      Math.round(i.progreso),
                estado:        i.estado,
                updatedAt:     i.updatedAt,
                deFicha:       false,
                fechaLimite:   fichaDeadlineMap[i.cursoId] || null,
            })),
            ...cursosDeFicha,
        ];

        // Instructores únicos de todos los cursos del aprendiz
        const instructoresMap = {};
        for (const c of todosCursos) {
            if (c.instructorId && !instructoresMap[c.instructorId]) {
                instructoresMap[c.instructorId] = {
                    id:     c.instructorId,
                    nombre: c.instructor,
                    correo: c.instructorCorreo,
                    cursos: [],
                };
            }
            if (c.instructorId) {
                instructoresMap[c.instructorId].cursos.push(c.titulo);
            }
        }
        const instructores = Object.values(instructoresMap);

        res.json({
            stats: {
                cursosActivos:    cursosActivos.length + cursosDeFicha.length,
                cursosCompletos:  cursosCompletos.length,
                promedioProgreso,
                totalInsignias:   insignias.length,
            },
            cursos: todosCursos,
            instructores,
            insignias,
            proximaActividad,
            testResultados: testResultados.map(t => ({
                tipo:     t.tipo,
                puntaje:  t.puntaje,
                total:    t.total,
                cursoId:  t.cursoId,
                fecha:    t.completadoAt,
            })),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al cargar el dashboard.' });
    }
};

const getAdminDashboard = async (_req, res) => {
    try {
        const [totalUsuarios, usuariosActivos, totalCursos, totalInscripciones, inscripcionesActivas] =
            await Promise.all([
                prisma.user.count(),
                prisma.user.count({ where: { estado_usuario: true } }),
                prisma.curso.count({ where: { estado: true } }),
                prisma.inscripcion.count(),
                prisma.inscripcion.count({ where: { estado: 'activo' } }),
            ]);

        const ultimosUsuarios = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5,
            select: { id: true, nombre_usuario: true, correo_usuario: true, rol_usuario: true, createdAt: true },
        });

        const progresoPromedio = await prisma.inscripcion.aggregate({
            _avg: { progreso: true },
        });

        res.json({
            stats: {
                totalUsuarios,
                usuariosActivos,
                totalCursos,
                totalInscripciones,
                inscripcionesActivas,
                progresoPromedio: Math.round(progresoPromedio._avg.progreso || 0),
            },
            ultimosUsuarios,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al cargar dashboard admin.' });
    }
};

const getInstructorDashboard = async (req, res) => {
    const userId = req.user.id;
    try {
        const fichas = await prisma.fichaInstructor.findMany({
            where: { instructorId: userId },
            include: {
                ficha: {
                    include: {
                        aprendices: { include: { aprendiz: { select: { id: true, nombre_usuario: true } } } },
                        cursos:     { include: { curso: { select: { id: true, titulo: true } } } },
                    },
                },
            },
        });

        const cursos = await prisma.curso.findMany({
            where: { instructorId: userId, estado: true },
            include: {
                _count: { select: { inscripciones: true, modulos: true } },
            },
        });

        const totalAprendices = fichas.reduce(
            (acc, f) => acc + f.ficha.aprendices.filter(a => a.estado === 'activo').length,
            0
        );

        res.json({
            stats: {
                totalFichas:    fichas.length,
                totalAprendices,
                totalCursos:    cursos.length,
            },
            fichas: fichas.map(fi => ({
                fichaId:    fi.fichaId,
                numero:     fi.ficha.numero,
                jornada:    fi.ficha.jornada,
                estado:     fi.ficha.estado,
                aprendices: fi.ficha.aprendices.length,
                cursos:     fi.ficha.cursos.map(fc => fc.curso.titulo),
            })),
            cursos: cursos.map(c => ({
                id:           c.id,
                titulo:       c.titulo,
                nivel:        c.nivel,
                inscripciones: c._count.inscripciones,
                modulos:      c._count.modulos,
            })),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al cargar dashboard instructor.' });
    }
};

module.exports = { getAprendizDashboard, getAdminDashboard, getInstructorDashboard };
