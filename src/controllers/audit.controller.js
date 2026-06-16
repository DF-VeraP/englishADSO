const { prisma } = require('../config/db');

// GET /api/audit  (admin only)
async function list(req, res) {
    try {
        const { accion, recurso, usuarioId, desde, hasta, page = 1, limit = 50 } = req.query;
        const where = {};
        if (accion)     where.accion   = accion;
        if (recurso)    where.recurso  = recurso;
        if (usuarioId)  where.usuarioId = Number(usuarioId);
        if (desde || hasta) {
            where.createdAt = {};
            if (desde) where.createdAt.gte = new Date(desde);
            if (hasta) where.createdAt.lte = new Date(hasta);
        }

        const skip  = (Number(page) - 1) * Number(limit);
        const [total, logs] = await Promise.all([
            prisma.auditLog.count({ where }),
            prisma.auditLog.findMany({
                where,
                skip,
                take:     Number(limit),
                orderBy:  { createdAt: 'desc' },
                include:  { usuario: { select: { id: true, nombre_usuario: true, correo_usuario: true } } },
            }),
        ]);

        res.json({ total, page: Number(page), limit: Number(limit), data: logs });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener registros de auditoría' });
    }
}

module.exports = { list };
