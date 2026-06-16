const { Router } = require('express');
const { verifyToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');
const users = require('../controllers/users.controller');

const router = Router();

router.use(verifyToken, requireRole('admin'));

router.get('/', users.list);
router.get('/:id', users.getById);
router.post('/', users.create);
router.put('/:id', users.update);
router.delete('/:id', users.remove);

module.exports = router;
