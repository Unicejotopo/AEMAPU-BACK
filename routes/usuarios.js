const express = require('express');
const router = express.Router();

let Usuario = require('../models/usuario');

router.get('/', (req, res) => {
    Usuario.getAll()
        .then(rows => {
            res.render('usuarios/list', { arrUsuarios: rows });
            //console.log('leo', rows);

        }).catch(err => {
            console.log(err);
        })
});

router.get('/delete/:id', (req, res) => {
    Usuario.deleteByIdAdmin(req.params.id)
        .then(result => {
            console.log(req.params.id);
            res.redirect('/usuarios');
        }).catch(err => {
            console.log(err);
        })
})




module.exports = router;