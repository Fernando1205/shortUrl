const express = require('express');
const User = require('../models/user');

const registerForm = (req, res) => {
    res.render('register');
}

const registerPost = async(req, res) => {

    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) throw new Error('Ya existe el usuario');

        let newUser = new User({ name, email, password });
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: error.message });
    }
}

const loginForm = async(req, res) => {
    res.render("login");
}


module.exports = {
    loginForm,
    registerForm,
    registerPost
}