var express = require('express');
var router = express.Router();


const apiFanzineRouter = require('./api/fanzine');

router.use('/fanzine', apiFanzineRouter);


module.exports = router;