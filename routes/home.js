const express = require('express');
const { leerUrls, store, deleteUrl, editarUrl, editarUrlPost, redireccionamiento } = require('../controllers/homeController');
const urlValidar = require('../middleware/urlValida');
const verificarUser = require('../middleware/verificarUser');
const router = express.Router();

router.get('/', verificarUser, leerUrls);
router.post('/', verificarUser, urlValidar, store);
router.get('/eliminar/:id', verificarUser, deleteUrl);
router.get('/editar/:id', verificarUser, editarUrl);
router.post('/editar/:id', verificarUser, urlValidar, editarUrlPost);
router.get("/:shortUrl", redireccionamiento);

module.exports = router;