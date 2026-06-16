const router = require('express').Router();
const ctrl   = require('../controllers/audit.controller');
const { verifyToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');

router.use(verifyToken, requireRole('admin'));
router.get('/', ctrl.list);

module.exports = router;
