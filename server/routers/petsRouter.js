var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Pet = require('../models/pets.js');

router.post('/', function(req, res) {
    console.log('Hit add pets');

    res.sendStatus(200);
});

module.exports = router;
