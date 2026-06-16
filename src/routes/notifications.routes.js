const router = require('express').Router();
const ctrl   = require('../controllers/notifications.controller');
const { verifyToken }  = require('../middleware/auth');
const { requireRole }  = require('../middleware/roles');

router.use(verifyToken);

router.get('/',            ctrl.list);
router.get('/unread-count', ctrl.unreadCount);
router.put('/read-all',    ctrl.markAllRead);
router.put('/:id/read',   ctrl.markRead);
router.post('/broadcast',  requireRole('admin'), ctrl.broadcast);

module.exports = router;
