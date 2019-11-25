var express = require('express');
var router = express.Router();


const apiFanzinesRouter = require('./api/fanzines');
const apiArticulosRouter = require('./api/articulos');

router.use('/fanzines', apiFanzinesRouter);
router.use('/articulos', apiArticulosRouter);


module.exports = router;