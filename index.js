require('dotenv').config();
require('./db/db');

const session = require('express-session');
const flash = require('connect-flash');
const express = require('express');
const port = process.env.PORT || 5000;
const path = require('path');
const { create } = require('express-handlebars');

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

app.engine(".hbs", hbs.engine);
app.set('view engine', 'hbs');
app.set("views", "./views");


// Midleware
app.use(express.urlencoded({ extended: true }));
app.use('/', require('./routes/home'));
app.use('/auth', require('./routes/login'));
app.use(express.static(__dirname + '/public'));


app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
})