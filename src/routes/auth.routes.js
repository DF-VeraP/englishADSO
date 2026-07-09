const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const { loginLimiter } = require('../middleware/rateLimit');
const authController = require('../controllers/auth.controller');
const passwordController = require('../controllers/password.controller');

const loginRules = validate([
    body('email').isEmail().withMessage('Correo inválido').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Contraseña mínimo 6 caracteres'),
    body('role').isIn(['admin', 'instructor', 'aprendiz']).withMessage('Rol inválido'),
]);

router.post('/login',          loginLimiter, loginRules, authController.login);
router.post('/refresh',        authController.refresh);
router.post('/forgot-password', passwordController.forgotPassword);
router.post('/verify-code',    passwordController.verifyCode);
router.post('/reset-password', passwordController.resetPassword);

module.exports = router;
