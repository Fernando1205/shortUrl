const express = require('express');
const { leerUrls, store, deleteUrl, editarUrl, editarUrlPost, redireccionamiento } = require('../controllers/homeController');
const urlValidar = require('../middleware/urlValida');
const router = express.Router();

router.get('/', leerUrls);
router.post('/', urlValidar, store);
router.get('/eliminar/:id', deleteUrl);
router.get('/editar/:id', editarUrl);
router.post('/editar/:id', urlValidar, editarUrlPost);
router.get("/:shortUrl", redireccionamiento);

module.exports = router;