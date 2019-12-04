var express = require('express');
var router = express.Router();

const Tipo = require('../../models/tipo');

router.get('/', async (req, res) => {
    const rows = await Tipo.getAll();
    res.json(rows);
});

module.exports = router;