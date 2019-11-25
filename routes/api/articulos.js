var express = require('express');
var router = express.Router();

let Articulo = require('../../models/articulo');

router.get('/', async (req, res) => {
    const rows = await Articulo.getAll();
    res.json(rows);
});




module.exports = router;