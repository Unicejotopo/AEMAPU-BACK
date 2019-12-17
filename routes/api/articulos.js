var express = require('express');
var router = express.Router();
const middleware = require('../middlewares');

let Usuario = require('../../models/usuario');
let Articulo = require('../../models/articulo');

router.get('/', async (req, res) => {
    const rows = await Articulo.getAll();
    res.json(rows);
});


router.get('/:id', async (req, res) => {
    const rows = await Articulo.getById(req.params.id, req.usuarioId);
    let row = await Usuario.getById(req.usuarioId);
    rows.usuario = row;
    res.json(rows);
    // console.log(rows);
});

router.get('/numero/:id', async (req, res) => {
    const row = await Articulo.getNumeroArticulos(req.params.id);
    res.json(row);
    // console.log(row);
});

router.get('/usuario/:id', async (req, res) => {
    // console.log(req.params);
    const rows = await Articulo.getByUser(req.params.id);
    res.json(rows);
});

router.get('/:fanzineId/:tipo', async (req, res) => {
    // console.log(typeof (req.params.tipo));
    const rows = await Articulo.getArticulosByTipo(req.params.fanzineId, req.params.tipo);
    res.json(rows);
    // console.log(req.params.fanzineId);
})

router.post('/create', middleware.checkToken, async (req, res) => {
    // console.log(req.usuarioId);
    let row = await Articulo.getNumeroArticulos(req.usuarioId);
    // let fanzines = await Fanzine.getAll();
    // console.log(fanzines[0].activo);
    console.log('Numero articulos', row.numArticulos);
    // console.log('total articulos', num.numArtiTotal);
    if (row.numArticulos < 1) {
        const result = await Articulo.insert(req.body, req.usuarioId);
        // console.log(req.body);
        if (result['affectedRows'] === 1) {
            const articulo = await Articulo.getById(result['insertId']);
            res.json(articulo);
        } else {
            res.json({ error: 'Error en la inserción' });
        }

    } else {
        res.json({ error: 'Solo puedes insertar un artículo por cada fanzine' });
    }



});

// DELETE http://localhost:3000/api/articulos/delete
router.delete('/delete/:id', async (req, res) => {
    const result = await Articulo.deleteById(req.params.id);
    // console.log(req.params.id)
    if (result['affectedRows'] === 1) {
        res.json({ exito: 'Articulo borrado con éxito' });
    } else {
        res.json({ error: 'No puedes eliminar un artículo de un fanzine cerrado' });
    }
});




module.exports = router;