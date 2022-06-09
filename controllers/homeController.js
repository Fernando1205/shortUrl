const Url = require('../models/Url');
const { nanoid } = require('nanoid');


const leerUrls = async(req, res) => {
    try {
        let urls = await Url.find().lean();
        res.render("home", { urls, mensajes: req.flash('mensajes') });
    } catch (error) {
        console.log(`Error ${error}`);
        res.send(error);
    }
}

const store = async(req, res) => {
    const { origin } = req.body;
    try {
        const url = Url({ origin, shortUrl: nanoid(6) });
        await url.save();
        res.statusCode = 201;
        res.redirect('/');
    } catch (error) {
        console.log(`Error ${error}`);
        res.send('error');
    }
}

const deleteUrl = async(req, res) => {
    let { id } = req.params;

    try {
        await Url.findByIdAndDelete(id);
        res.redirect('/');
    } catch (error) {
        console.log(`Error ${error}`);
        res.send(error);
    }
}

const editarUrl = async(req, res) => {
    let { id } = req.params;
    try {
        const url = await Url.findById(id).lean();
        res.render('home', { url });
    } catch (error) {
        console.log(error);
    }
}

const editarUrlPost = async(req, res) => {
    let { id } = req.params;
    let { origin } = req.body;
    try {
        await Url.findByIdAndUpdate(id, { origin });
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
}

const redireccionamiento = async(req, res) => {
    let { shortUrl } = req.params;
    try {
        const url = await Url.findOne({ shortUrl });
        return res.redirect(url.origin);
    } catch (error) {
        console.log(error);
        return res.send(error);
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