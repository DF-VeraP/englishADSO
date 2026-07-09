const { Router } = require('express');
const { verifyToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');
const reports = require('../controllers/reports.controller');

const router = Router();

router.use(verifyToken);

router.get('/admin',      requireRole('admin'),      reports.adminReport);
router.get('/instructor', requireRole('instructor'), reports.instructorReport);

module.exports = router;
