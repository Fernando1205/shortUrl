require('dotenv').config();
require('./db/db');

const session = require('express-session');
const flash = require('connect-flash');
const express = require('express');
const passport = require('passport');
const port = process.env.PORT || 5000;
const path = require('path');
const { create } = require('express-handlebars');
const csrf = require('csurf');

const app = express();

const hbs = create({
    extname: ".hbs",
    partialsDir: ["views/components"]
});

app.use(session({
    secret: 'pass',
    resave: false,
    saveUninitialized: false,
    name: 'secret-name'
}));

app.use(flash());

// CONFIGURACIÓN DE PASSPORT
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, { id: user._id, userName: user.userName })
});

passport.deserializeUser(async(user, done) => {

    return done(null, user);
})

app.engine(".hbs", hbs.engine);
app.set('view engine', 'hbs');
app.set("views", "./views");

// Midleware
app.use(express.urlencoded({ extended: true }));

// CSRF TOKEN
app.use(csrf());
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', req.csrfToken())
    next();
})

app.use('/', require('./routes/home'));
app.use('/auth', require('./routes/login'));
app.use(express.static(__dirname + '/public'));


app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
})