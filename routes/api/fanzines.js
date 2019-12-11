var express = require('express');
var router = express.Router();

const Fanzine = require('../../models/fanzine');
const Articulo = require('../../models/articulo');

router.get('/', async (req, res) => {
    const rows = await Fanzine.getAll();
    res.json(rows);
});

router.get('/:id', async (req, res) => {
    const rows = await Fanzine.getByFanzineId(req.params.id);
    res.json(rows);
    console.log(rows);
})


module.exports = router;