const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const passwordController = require('../controllers/password.controller');

router.post('/login', authController.login);
router.post('/forgot-password', passwordController.forgotPassword);
router.post('/verify-code',     passwordController.verifyCode);
router.post('/reset-password',  passwordController.resetPassword);

module.exports = router;
