const moongose = require('mongoose');

const uri = process.env.DB_URI;

moongose.connect(uri)
    .then(() => console.log('DB CONECTADO'))
    .catch((e) => console.log(`Error ${e}`));