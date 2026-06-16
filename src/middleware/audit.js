const { prisma } = require('../config/db');

const NIVELES = ['basico', 'intermedio', 'avanzado'];
const ESTADOS_INSCRIPCION = ['activo', 'completado', 'cancelado'];

async function log({ accion, recurso, recursoId = null, detalle = null, req }) {
    try {
        await prisma.auditLog.create({
            data: {
                accion,
                recurso,
                recursoId:  recursoId ? Number(recursoId) : null,
                detalle,
                usuarioId:  req?.user?.id ?? null,
                ip:         req?.ip ?? null,
                userAgent:  req?.headers?.['user-agent'] ?? null,
            },
        });
    } catch (err) {
        console.error('[audit] Error al registrar log:', err.message);
    }
}

module.exports = { log, NIVELES, ESTADOS_INSCRIPCION };
