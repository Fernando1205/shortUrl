const { body } = require('express-validator');
const express = require('express');
const { loginForm, registerForm, registerPost, confirmarCuenta, loginPost, logout } = require('../controllers/authController');
const router = express.Router();

router.get('/login', loginForm);
router.post('/login', [
    body('email', 'Ingrese un email valido').trim().isEmail().normalizeEmail(),
    body('password', 'Contraseña mínimo 6 caracteres').isLength({ min: 6 }).escape()
], loginPost);
router.get('/register', registerForm);
router.get('/confirmarCuenta/:token', confirmarCuenta);
router.post('/register', [
    body('name', "Ingrese un nombre válido").trim().notEmpty().escape(),
    body('email', 'Ingrese un email valido').trim().isEmail().normalizeEmail(),
    body('password', 'Contraseña mínimo 6 caracteres').isLength({ min: 6 }).escape().custom((value, { req }) => {
        if (value !== req.body.confirmPass) {
            throw new Error('No coinciden las contraseñas');
        }
        return value;
    })
], registerPost);
router.get('/logout', logout)

module.exports = router;