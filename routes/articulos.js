const express = require('express');
const router = express.Router();

let Articulo = require('../models/articulo');

router.get('/', (req, res) => {
    Articulo.getAll()
        .then(rows => {
            res.render('articulos/list');
            arrArticulos = rows
        }).catch(err => {
            console.log(err);
        })
});

router.get('/delete/:id', (req, res) => {
    Articulo.deleteById(req.params.id)
        .then(result => {
            res.redirect('/articulos');
        }).catch(err => {
            console.log(err);
        })


})




module.exports = router;