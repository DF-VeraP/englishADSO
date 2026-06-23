const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/fichas.controller');
const { verifyToken }  = require('../middleware/auth');
const { requireRole }  = require('../middleware/roles');

router.use(verifyToken);

// Vistas por usuario — deben ir ANTES de /:id para evitar colisión
router.get('/mis-fichas',               requireRole('aprendiz'), ctrl.getMisFichasAprendiz);
router.get('/instructor/:instructorId', requireRole('admin'), ctrl.getFichasDeInstructor);
router.get('/aprendiz/:aprendizId',     requireRole('admin'), ctrl.getFichasDeAprendiz);

// CRUD Fichas (solo admin)
router.get('/',       requireRole('admin'), ctrl.getAllFichas);
router.get('/:id',    requireRole('admin'), ctrl.getFichaById);
router.post('/',      requireRole('admin'), ctrl.createFicha);
router.put('/:id',    requireRole('admin'), ctrl.updateFicha);
router.delete('/:id', requireRole('admin'), ctrl.deleteFicha);

// Gestión de instructores
router.post('/:id/instructores',                requireRole('admin'), ctrl.asignarInstructor);
router.delete('/:id/instructores/:instructorId', requireRole('admin'), ctrl.quitarInstructor);

// Gestión de aprendices
router.post('/:id/aprendices',                  requireRole('admin'), ctrl.inscribirAprendiz);
router.patch('/:id/aprendices/:aprendizId',     requireRole('admin'), ctrl.actualizarEstadoAprendiz);
router.delete('/:id/aprendices/:aprendizId',    requireRole('admin'), ctrl.retirarAprendiz);

module.exports = router;
