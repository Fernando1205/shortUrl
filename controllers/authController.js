const User = require('../models/user');
const { nanoid } = require('nanoid');
const { validationResult } = require('express-validator');

const registerForm = (req, res) => {
    res.render('register', { mensajes: req.flash('mensajes') });
}

const registerPost = async(req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash("mensajes", errors.array());
        return res.redirect('/auth/register');
    }

    const { name, email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        if (user) throw new Error('Ya existe el usuario');

        let newUser = new User({ name, email, password, tokenConfirm: nanoid(6) });
        await newUser.save();

        // Enviar correo electrónico con confirmación cuenta

        req.flash('mensajes', { msg: "Revisa tu correo electrónico y valida tu cuenta" });
        res.redirect('/auth/login');

    } catch (error) {
        req.flash('mensajes', [{ msg: error.message }]);
        return res.redirect('/auth/register');
    }
}

const confirmarCuenta = async(req, res) => {

    const { token } = req.params;

    try {

        const user = await User.findOne({ tokenConfirm: token });

        if (!user) throw new Error('No existe el usuario');

        user.countConfirm = true;
        user.tokenConfirm = null;

        await user.save();

        req.flash('mensajes', { msg: "Cuenta verificada" });
        res.redirect('/auth/login');

    } catch (error) {
        console.log(error);
        res.status(404).json({ error: error.message });
    }
}

const loginForm = async(req, res) => {
    res.render("login", { mensajes: req.flash('mensajes') });
}

const loginPost = async(req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash("mensajes", errors.array());
        return res.redirect('/auth/login');
    }

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) throw new Error('No existe este email');

        if (!user.countConfirm) throw new Error('Cuenta no validada');

        if (!await user.comparePassword(password)) throw new Error('Contraseña no correcta');

        return res.redirect('/');

    } catch (error) {
        req.flash('mensajes', [{ msg: error.message }]);
        return res.redirect('/auth/login');
    }
}

module.exports = {
    loginForm,
    registerForm,
    registerPost,
    confirmarCuenta,
    loginPost
}