const { Router } = require('express');
const { verifyToken } = require('../middleware/auth');
const { generate } = require('../controllers/certificate.controller');

const router = Router();

router.get('/:cursoId', verifyToken, generate);

module.exports = router;
