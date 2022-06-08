const express = require('express');
const { leerUrls, store, deleteUrl, editarUrl, editarUrlPost, redireccionamiento } = require('../controllers/homeController');
const urlValidar = require('../middleware/urlValida');
const verificarUser = require('../middleware/verificarUser');
const router = express.Router();

router.get('/', verificarUser, leerUrls);
router.post('/', urlValidar, store);
router.get('/eliminar/:id', deleteUrl);
router.get('/editar/:id', editarUrl);
router.post('/editar/:id', urlValidar, editarUrlPost);
router.get("/:shortUrl", redireccionamiento);

module.exports = router;