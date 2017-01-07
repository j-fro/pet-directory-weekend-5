var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Pet = require('../models/pets.js');

router.use(bodyParser.json());

router.post('/', function(req, res) {
    console.log('Hit add pets with', req.body);
    var newPet = Pet({
        name: req.body.name,
        animal: req.body.animal,
        age: Number(req.body.age),
        image_url: req.body.imgUrl
    });
    console.log('Adding a new pet:', newPet);
    newPet.save(function(err) {
        if(err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;
