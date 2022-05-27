const express = require('express');
const { loginForm, registerForm, registerPost, confirmarCuenta } = require('../controllers/authController');
const router = express.Router();

router.get('/login', loginForm);
router.get('/register', registerForm);
router.get('/confirmarCuenta/:token', confirmarCuenta);
router.post('/register', registerPost);

module.exports = router;