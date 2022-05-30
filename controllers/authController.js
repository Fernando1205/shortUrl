const User = require('../models/user');
const { nanoid } = require('nanoid');
const { validationResult } = require('express-validator');

const registerForm = (req, res) => {
    res.render('register');
}

const registerPost = async(req, res) => {

    const errors = validationResult(req);

    if (errors.isEmpty) {
        return res.json(errors);
    }

    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) throw new Error('Ya existe el usuario');

        let newUser = new User({ name, email, password, tokenConfirm: nanoid(6) });
        await newUser.save();

        // Enviar correo electrónico con confirmación cuenta

        res.redirect('/auth/login');
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: error.message });
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
        res.redirect('/auth/login');
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: error.message });
    }
}

const loginForm = async(req, res) => {
    res.render("login");
}

const loginPost = async(req, res) => {

    const errors = validationResult(req);

    if (errors.isEmpty) {
        res.json(errors);
    }

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) throw new Error('No existe este email');

        if (!user.countConfirm) throw new Error('Cuenta no validada');

        if (!await user.comparePassword(password)) throw new Error('Contraseña no correcta');

        res.redirect('/');

    } catch (error) {
        console.log(error);
        res.status(404).send({ error: error.message })
    }
}

module.exports = {
    loginForm,
    registerForm,
    registerPost,
    confirmarCuenta,
    loginPost
}