const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');

let Usuario = require('../../models/usuario');

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

const createToken = (user) => {
    let payload = {
        userId: user.id,
        createdAt: moment().unix(),
        expiresAt: moment().add(5, 'minutes').unix()
    }
    return jwt.encode(payload, process.env.TOKEN_KEY);
}




module.exports = router;