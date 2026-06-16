const router = require('express').Router();
const ctrl   = require('../controllers/actividades.controller');
const prog   = require('../controllers/progreso.controller');
const { verifyToken }  = require('../middleware/auth');
const { requireRole }  = require('../middleware/roles');

router.use(verifyToken);

// Player del curso (aprendiz, instructor, admin)
router.get('/courses/:cursoId/play', ctrl.getCoursePlayer);

// Progreso del aprendiz
router.get('/courses/:cursoId/mi-progreso', prog.getMiProgreso);
router.post('/courses/:cursoId/insignias',  prog.otorgarInsignia);
router.post('/courses/:cursoId/test',       prog.saveTest);
router.post('/actividades/:id/progreso',    prog.saveProgreso);

// CRUD momentos (admin)
router.post('/modulos/:moduloId/momentos', requireRole('admin'), ctrl.createMomento);

// CRUD actividades (admin)
router.get('/momentos/:momentoId/actividades',  requireRole('admin'), ctrl.listActividades);
router.post('/momentos/:momentoId/actividades', requireRole('admin'), ctrl.createActividad);
router.put('/actividades/:id',                  requireRole('admin'), ctrl.updateActividad);
router.delete('/actividades/:id',               requireRole('admin'), ctrl.deleteActividad);

module.exports = router;
