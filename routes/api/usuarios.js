const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');
const middleware = require('../middlewares');

let Usuario = require('../../models/usuario');
let Articulo = require('../../models/articulo');

router.get('/artistas', async (req, res) => {
    const rows = await Usuario.getAll();
    res.json(rows);
});

router.post('/registro', async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const result = await Usuario.insert(req.body);
    res.json(result);
});

router.post('/login', (req, res) => {
    Usuario.getByEmail(req.body.email)
        .then(rows => {
            if (rows.length !== 1) {
                res.json({ error: 'Error email y/o password' });
            } else {
                const iguales = bcrypt.compareSync(req.body.password, rows[0].password);
                if (!iguales) {
                    res.json({ error: 'Error email y/o password' });
                } else {
                    res.json({ exito: createToken(rows[0]) });
                }
            }
        }).catch(err => {
            res.json({ error: err.message });
        })
});

router.get('/usuario', middleware.checkToken, async (req, res) => {
    let row = await Usuario.getById(req.usuarioId);
    let rows = await Articulo.getArticulosByUser(req.usuarioId);
    row.articulos = rows;
    res.json(row);
});

const createToken = (user) => {
    let payload = {
        userId: user.id,
        createdAt: moment().unix(),
        expiresAt: moment().add(60, 'minutes').unix()
    }
    return jwt.encode(payload, process.env.TOKEN_KEY);
}




module.exports = router;