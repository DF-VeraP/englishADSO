const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/programas.controller');
const { verifyToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');

router.use(verifyToken);

router.get('/',     requireRole('admin'), ctrl.getAll);
router.get('/:id',  requireRole('admin'), ctrl.getById);
router.post('/',    requireRole('admin'), ctrl.create);
router.put('/:id',  requireRole('admin'), ctrl.update);
router.delete('/:id', requireRole('admin'), ctrl.remove);

module.exports = router;
