const { prisma } = require('../config/db');
const { log } = require('../middleware/audit');

// GET /api/courses/:cursoId/modules
async function list(req, res) {
    try {
        const cursoId = Number(req.params.cursoId);
        await assertCursoAccess(cursoId, req, res);
        if (res.headersSent) return;

        const modulos = await prisma.modulo.findMany({
            where: { cursoId },
            orderBy: { orden: 'asc' },
        });
        res.json(modulos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener módulos' });
    }
}

// GET /api/courses/:cursoId/modules/:id
async function getById(req, res) {
    try {
        const cursoId = Number(req.params.cursoId);
        const id      = Number(req.params.id);
        await assertCursoAccess(cursoId, req, res);
        if (res.headersSent) return;

        const modulo = await prisma.modulo.findFirst({ where: { id, cursoId } });
        if (!modulo) return res.status(404).json({ message: 'Módulo no encontrado' });
        res.json(modulo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener módulo' });
    }
}

// POST /api/courses/:cursoId/modules
async function create(req, res) {
    try {
        const cursoId = Number(req.params.cursoId);
        await assertCursoAccess(cursoId, req, res);
        if (res.headersSent) return;

        const { titulo, descripcion, contenido, orden } = req.body;
        if (!titulo?.trim()) return res.status(400).json({ message: 'El título es obligatorio' });

        const curso = await prisma.curso.findUnique({ where: { id: cursoId } });
        if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });

        const ultimoOrden = await prisma.modulo.count({ where: { cursoId } });
        const modulo = await prisma.modulo.create({
            data: {
                titulo:      titulo.trim(),
                descripcion: descripcion?.trim() || null,
                contenido:   contenido?.trim()   || null,
                orden:       orden ?? ultimoOrden,
                cursoId,
            },
        });
        await log({ accion: 'CREATE', recurso: 'modulos', recursoId: modulo.id, detalle: modulo.titulo, req });
        res.status(201).json(modulo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al crear módulo' });
    }
}

// PUT /api/courses/:cursoId/modules/:id
async function update(req, res) {
    try {
        const cursoId = Number(req.params.cursoId);
        const id      = Number(req.params.id);
        await assertCursoAccess(cursoId, req, res);
        if (res.headersSent) return;

        const existe  = await prisma.modulo.findFirst({ where: { id, cursoId } });
        if (!existe) return res.status(404).json({ message: 'Módulo no encontrado' });

        const { titulo, descripcion, contenido, orden, estado } = req.body;
        const data = {};
        if (titulo      !== undefined) data.titulo      = titulo.trim();
        if (descripcion !== undefined) data.descripcion = descripcion?.trim() || null;
        if (contenido   !== undefined) data.contenido   = contenido?.trim()   || null;
        if (orden       !== undefined) data.orden       = Number(orden);
        if (estado      !== undefined) data.estado      = Boolean(estado);

        const modulo = await prisma.modulo.update({ where: { id }, data });
        await log({ accion: 'UPDATE', recurso: 'modulos', recursoId: id, detalle: modulo.titulo, req });
        res.json(modulo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al actualizar módulo' });
    }
}

// DELETE /api/courses/:cursoId/modules/:id
async function remove(req, res) {
    try {
        const cursoId = Number(req.params.cursoId);
        const id      = Number(req.params.id);
        await assertCursoAccess(cursoId, req, res);
        if (res.headersSent) return;

        const existe  = await prisma.modulo.findFirst({ where: { id, cursoId } });
        if (!existe) return res.status(404).json({ message: 'Módulo no encontrado' });

        await prisma.modulo.delete({ where: { id } });
        await log({ accion: 'DELETE', recurso: 'modulos', recursoId: id, detalle: existe.titulo, req });
        res.json({ message: 'Módulo eliminado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al eliminar módulo' });
    }
}

async function assertCursoAccess(cursoId, req, res) {
    const curso = await prisma.curso.findUnique({ where: { id: cursoId } });
    if (!curso) { res.status(404).json({ message: 'Curso no encontrado' }); return; }
    if (req.user.rol === 'instructor' && curso.instructorId !== req.user.id)
        res.status(403).json({ message: 'Acceso denegado' });
}

module.exports = { list, getById, create, update, remove };
