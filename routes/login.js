const express = require('express');
const { loginForm, registerForm, registerPost } = require('../controllers/authController');
const router = express.Router();

router.get('/login', loginForm);
router.get('/register', registerForm);
router.post('/register', registerPost);

module.exports = router;