var express = require('express');
var router = express.Router();

const Fanzine = require('../../models/fanzine')

router.get('/', async (req, res) => {
    const rows = await Fanzine.getAll();
    res.json(rows);
});


module.exports = router;