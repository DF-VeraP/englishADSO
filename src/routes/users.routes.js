const { Router } = require('express');
const { verifyToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');
const users = require('../controllers/users.controller');
const profile = require('../controllers/profile.controller');

const router = Router();

// Perfil propio — cualquier rol autenticado
router.get('/me',  verifyToken, profile.getMe);
router.put('/me',  verifyToken, profile.updateMe);

// Gestión de usuarios — solo admin
router.use(verifyToken, requireRole('admin'));

router.get('/',          users.list);
router.get('/:id',       users.getById);
router.post('/',         users.create);
router.post('/import',   users.importUsers);
router.put('/:id',       users.update);
router.delete('/:id',    users.remove);

module.exports = router;
