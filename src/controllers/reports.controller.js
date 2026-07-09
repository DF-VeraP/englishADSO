const { prisma } = require('../config/db');

// Admin: reporte general de la plataforma
const adminReport = async (req, res) => {
    try {
        const [
            totalUsuarios, usuariosActivos,
            totalCursos, totalModulos,
            totalInscripciones, inscripcionesActivas, inscripcionesCompletas,
            progresoAgg,
            topCursos,
            actividadReciente,
            distribucionRoles,
        ] = await Promise.all([
            prisma.user.count(),
            prisma.user.count({ where: { estado_usuario: true } }),
            prisma.curso.count({ where: { estado: true } }),
            prisma.modulo.count({ where: { estado: true } }),
            prisma.inscripcion.count(),
            prisma.inscripcion.count({ where: { estado: 'activo' } }),
            prisma.inscripcion.count({ where: { estado: 'completado' } }),
            prisma.inscripcion.aggregate({ _avg: { progreso: true } }),
            prisma.inscripcion.groupBy({
                by: ['cursoId'],
                _count: { cursoId: true },
                _avg:   { progreso: true },
                orderBy: { _count: { cursoId: 'desc' } },
                take: 5,
            }),
            prisma.auditLog.findMany({
                orderBy: { createdAt: 'desc' },
                take: 10,
                include: { usuario: { select: { nombre_usuario: true, rol_usuario: true } } },
            }),
            prisma.user.groupBy({
                by: ['rol_usuario'],
                _count: { rol_usuario: true },
            }),
        ]);

        // Enriquecer top cursos con nombres
        const cursosInfo = await prisma.curso.findMany({
            where: { id: { in: topCursos.map(c => c.cursoId) } },
            select: { id: true, titulo: true, nivel: true },
        });
        const cursosMap = Object.fromEntries(cursosInfo.map(c => [c.id, c]));

        res.json({
            resumen: {
                totalUsuarios,
                usuariosActivos,
                totalCursos,
                totalModulos,
                totalInscripciones,
                inscripcionesActivas,
                inscripcionesCompletas,
                promedioProgreso: Math.round(progresoAgg._avg.progreso || 0),
                tasaCompletitud: totalInscripciones
                    ? Math.round((inscripcionesCompletas / totalInscripciones) * 100)
                    : 0,
            },
            distribucionRoles: distribucionRoles.map(r => ({
                rol:   r.rol_usuario,
                total: r._count.rol_usuario,
            })),
            topCursos: topCursos.map(c => ({
                cursoId:          c.cursoId,
                titulo:           cursosMap[c.cursoId]?.titulo || '—',
                nivel:            cursosMap[c.cursoId]?.nivel  || '—',
                inscripciones:    c._count.cursoId,
                promedioProgreso: Math.round(c._avg.progreso || 0),
            })),
            actividadReciente: actividadReciente.map(a => ({
                accion:   a.accion,
                recurso:  a.recurso,
                usuario:  a.usuario?.nombre_usuario || 'Sistema',
                rol:      a.usuario?.rol_usuario    || '—',
                detalle:  a.detalle,
                fecha:    a.createdAt,
            })),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al generar reporte.' });
    }
};

// Instructor: reporte de sus fichas y progreso de aprendices
const instructorReport = async (req, res) => {
    const instructorId = req.user.id;
    const { fichaId }  = req.query;

    try {
        const fichasDelInstructor = await prisma.fichaInstructor.findMany({
            where: { instructorId },
            include: { ficha: { select: { id: true, numero: true, jornada: true, estado: true } } },
        });

        if (!fichasDelInstructor.length) {
            return res.json({ fichas: [], aprendices: [] });
        }

        const fichaIdsFiltro = fichaId
            ? [Number(fichaId)]
            : fichasDelInstructor.map(f => f.fichaId);

        // Aprendices con su progreso en cursos del instructor
        const aprendicesEnFichas = await prisma.fichaAprendiz.findMany({
            where: { fichaId: { in: fichaIdsFiltro }, estado: 'activo' },
            include: {
                aprendiz: {
                    select: { id: true, nombre_usuario: true, correo_usuario: true },
                },
                ficha: { select: { numero: true } },
            },
        });

        const aprendizIds = [...new Set(aprendicesEnFichas.map(a => a.aprendizId))];

        const cursos = await prisma.curso.findMany({
            where: { instructorId, estado: true },
            select: { id: true, titulo: true },
        });
        const cursoIds = cursos.map(c => c.id);

        const inscripciones = await prisma.inscripcion.findMany({
            where: { aprendizId: { in: aprendizIds }, cursoId: { in: cursoIds } },
        });

        const insignias = await prisma.insigniaAprendiz.findMany({
            where: { aprendizId: { in: aprendizIds }, cursoId: { in: cursoIds } },
        });

        const tests = await prisma.testResultado.findMany({
            where: { aprendizId: { in: aprendizIds }, cursoId: { in: cursoIds } },
        });

        // Construir reporte por aprendiz
        const reporte = aprendicesEnFichas.map(ae => {
            const inscr     = inscripciones.filter(i => i.aprendizId === ae.aprendizId);
            const insig     = insignias.filter(i => i.aprendizId === ae.aprendizId);
            const testsApr  = tests.filter(t => t.aprendizId === ae.aprendizId);
            const pretest   = testsApr.filter(t => t.tipo === 'pretest').at(-1);
            const postest   = testsApr.filter(t => t.tipo === 'postest').at(-1);

            return {
                aprendizId:       ae.aprendizId,
                nombre:           ae.aprendiz.nombre_usuario || ae.aprendiz.correo_usuario,
                correo:           ae.aprendiz.correo_usuario,
                ficha:            ae.ficha.numero,
                cursos: inscr.map(i => {
                    const curso = cursos.find(c => c.id === i.cursoId);
                    return {
                        cursoId:   i.cursoId,
                        titulo:    curso?.titulo || '—',
                        progreso:  Math.round(i.progreso),
                        estado:    i.estado,
                    };
                }),
                promedioProgreso: inscr.length
                    ? Math.round(inscr.reduce((s, i) => s + i.progreso, 0) / inscr.length)
                    : 0,
                totalInsignias:   insig.length,
                pretest:          pretest  ? Math.round(pretest.puntaje)  : null,
                postest:          postest  ? Math.round(postest.puntaje)  : null,
                mejora:           pretest && postest ? Math.round(postest.puntaje - pretest.puntaje) : null,
            };
        });

        res.json({
            fichas:     fichasDelInstructor.map(f => ({ id: f.fichaId, numero: f.ficha.numero, estado: f.ficha.estado })),
            cursos,
            aprendices: reporte,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al generar reporte del instructor.' });
    }
};

module.exports = { adminReport, instructorReport };
