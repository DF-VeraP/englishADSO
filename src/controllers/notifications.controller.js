const { prisma } = require('../config/db');
const notify = require('../services/notification.service');

// GET /api/notifications  (usuario autenticado ve las suyas)
async function list(req, res) {
    try {
        const where = { destinatarioId: req.user.id };
        const notificaciones = await prisma.notificacion.findMany({
            where, orderBy: { createdAt: 'desc' }, take: 100,
        });
        res.json(notificaciones);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener notificaciones' });
    }
}

// GET /api/notifications/unread-count
async function unreadCount(req, res) {
    try {
        const count = await prisma.notificacion.count({
            where: { destinatarioId: req.user.id, leida: false },
        });
        res.json({ count });
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener contador' });
    }
}

// PUT /api/notifications/:id/read
async function markRead(req, res) {
    try {
        const id    = Number(req.params.id);
        const notif = await prisma.notificacion.findUnique({ where: { id } });
        if (!notif) return res.status(404).json({ message: 'Notificación no encontrada' });
        if (notif.destinatarioId !== req.user.id)
            return res.status(403).json({ message: 'Acceso denegado' });

        const updated = await prisma.notificacion.update({ where: { id }, data: { leida: true } });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Error al marcar como leída' });
    }
}

// PUT /api/notifications/read-all
async function markAllRead(req, res) {
    try {
        await prisma.notificacion.updateMany({
            where: { destinatarioId: req.user.id, leida: false },
            data:  { leida: true },
        });
        res.json({ message: 'Todas las notificaciones marcadas como leídas' });
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar notificaciones' });
    }
}

// POST /api/notifications/broadcast  (admin — envía a todos o a un rol)
async function broadcast(req, res) {
    try {
        const { tipo = 'aviso_general', asunto, mensaje, rol, enviarEmail = false } = req.body;
        if (!asunto?.trim() || !mensaje?.trim())
            return res.status(400).json({ message: 'asunto y mensaje son obligatorios' });

        if (rol) {
            await notify.sendToRole({ tipo, asunto, mensaje, rol, enviarEmail });
        } else {
            const usuarios = await prisma.user.findMany({
                where: { estado_usuario: true },
                select: { id: true },
            });
            await Promise.all(usuarios.map(u =>
                notify.send({ tipo, asunto, mensaje, destinatarioId: u.id, enviarEmail })
            ));
        }

        res.json({ message: 'Notificación enviada correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al enviar notificación' });
    }
}

module.exports = { list, unreadCount, markRead, markAllRead, broadcast };
