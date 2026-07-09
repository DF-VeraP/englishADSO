const { Router } = require('express');
const { verifyToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');
const dashboard = require('../controllers/dashboard.controller');

const router = Router();

router.use(verifyToken);

router.get('/aprendiz',    requireRole('aprendiz'),    dashboard.getAprendizDashboard);
router.get('/admin',       requireRole('admin'),        dashboard.getAdminDashboard);
router.get('/instructor',  requireRole('instructor'),   dashboard.getInstructorDashboard);

module.exports = router;
