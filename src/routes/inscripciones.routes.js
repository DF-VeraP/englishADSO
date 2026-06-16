const router = require('express').Router();
const ctrl   = require('../controllers/inscripciones.controller');
const { verifyToken }  = require('../middleware/auth');
const { requireRole }  = require('../middleware/roles');

router.use(verifyToken);

router.get('/',    requireRole('admin', 'aprendiz'), ctrl.list);
router.post('/',   requireRole('admin'), ctrl.create);
router.put('/:id', requireRole('admin', 'aprendiz'), ctrl.update);
router.delete('/:id', requireRole('admin'), ctrl.remove);

module.exports = router;
