var express = require('express');
var router = express.Router();

let Articulo = require('../../models/articulo');

router.get('/', async (req, res) => {
    const rows = await Articulo.getAll();
    res.json(rows);
});


router.get('/:id', async (req, res) => {
    const rows = await Articulo.getByFanzineId(req.params.id);
    res.json(rows);
    console.log(rows);
})

router.post('/create', async (req, res) => {
    const result = await Articulo.insert(req.body);
    console.log(req.body);
    res.json()
})




module.exports = router;