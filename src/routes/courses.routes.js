const router   = require('express').Router();
const ctrl     = require('../controllers/courses.controller');
const modCtrl  = require('../controllers/modules.controller');
const { verifyToken }   = require('../middleware/auth');
const { requireRole }   = require('../middleware/roles');

router.use(verifyToken);

// Instructores disponibles — solo admin
router.get('/instructors', requireRole('admin'), ctrl.getInstructors);

// CRUD Cursos
router.get('/',    requireRole('admin', 'instructor'), ctrl.list);
router.get('/:id', requireRole('admin', 'instructor'), ctrl.getById);
router.post('/',   requireRole('admin'), ctrl.create);
router.put('/:id', requireRole('admin'), ctrl.update);
router.delete('/:id', requireRole('admin'), ctrl.remove);

// CRUD Módulos dentro de un curso
router.get('/:cursoId/modules',     requireRole('admin', 'instructor'), modCtrl.list);
router.get('/:cursoId/modules/:id', requireRole('admin', 'instructor'), modCtrl.getById);
router.post('/:cursoId/modules',    requireRole('admin'), modCtrl.create);
router.put('/:cursoId/modules/:id', requireRole('admin'), modCtrl.update);
router.delete('/:cursoId/modules/:id', requireRole('admin'), modCtrl.remove);

module.exports = router;
