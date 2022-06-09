const Url = require('../models/Url');
const { nanoid } = require('nanoid');


const leerUrls = async(req, res) => {
    try {
        let urls = await Url.find({ user: req.user.id }).lean();
        res.render("home", { urls, mensajes: req.flash('mensajes') });
    } catch (error) {
        req.flash("mensajes", [{ msg: error.message }]);
        return res.redirect('/');
    }
}

const store = async(req, res) => {
    const { origin } = req.body;
    try {
        const url = Url({ origin, shortUrl: nanoid(6), user: req.user.id });
        await url.save();
        req.flash("mensajes", [{ msg: "URL Agregada" }]);
        res.statusCode = 201;
        res.redirect('/');
    } catch (error) {
        req.flash("mensajes", [{ msg: error.message }]);
        return res.redirect('/');
    }
}

const deleteUrl = async(req, res) => {
    let { id } = req.params;

    try {
        const url = await Url.findById(id);
        if (!url.user.equals(req.user.id)) {
            throw new Error('No es tu URL');
        }
        await url.remove();
        req.flash("mensajes", [{ msg: "URL eliminada" }]);
        res.redirect('/');
    } catch (error) {
        req.flash("mensajes", [{ msg: error.message }]);
        return res.redirect('/');
    }
}

const editarUrl = async(req, res) => {
    let { id } = req.params;
    try {
        const url = await Url.findById(id).lean();
        if (!url.user.equals(req.user.id)) {
            throw new Error('No es tu URL');
        }
        res.render('home', { url });
    } catch (error) {
        req.flash("mensajes", [{ msg: error.message }]);
        return res.redirect('/');
    }
}

const editarUrlPost = async(req, res) => {

    let { id } = req.params;
    let { origin } = req.body;

    try {

        const url = await Url.findById(id);

        if (!url.user.equals(req.user.id)) {
            throw new Error('No es tu URL');
        }

        await url.updateOne({ origin });

        req.flash("mensajes", [{ msg: "URL editada" }]);
        res.redirect('/');
    } catch (error) {
        req.flash("mensajes", [{ msg: error.message }]);
        return res.redirect('/');
    }
}

const redireccionamiento = async(req, res) => {
    let { shortUrl } = req.params;
    try {
        const url = await Url.findOne({ shortUrl });
        return res.redirect(url.origin);
    } catch (error) {
        req.flash("mensajes", [{ msg: "No existe esta url congifurada" }]);
        return res.redirect('/auth/login');
    }
}

module.exports = {
    leerUrls,
    store,
    deleteUrl,
    editarUrl,
    editarUrlPost,
    redireccionamiento
}