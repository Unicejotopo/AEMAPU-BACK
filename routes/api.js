var express = require('express');
var router = express.Router();


const apiFanzinesRouter = require('./api/fanzines');
const apiArticulosRouter = require('./api/articulos');
const apiTiposArticulosRouter = require('./api/tipos');
const apiUsuariosRouter = require('./api/usuarios');

router.use('/fanzines', apiFanzinesRouter);
router.use('/articulos', apiArticulosRouter);
router.use('/tipos', apiTiposArticulosRouter);
router.use('/usuarios', apiUsuariosRouter);


module.exports = router;