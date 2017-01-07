var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Pet = require('../models/pets.js');

router.use(bodyParser.json());

router.get('/', function(req, res) {
    /* Gets all pets from the database and returns them to the client
    Sends an array of pets on a successful query and code 500 on any error */
    console.log('Hit get pets');
    Pet.find({}, function(err, results) {
        if(err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.send(results);
        }
    });
});

router.post('/', function(req, res) {
    /* Creates and saves a new pet based on req.body data
    Sends code 200 on a successful insert and 500 on any error */
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

router.delete('/:id', function(req, res) {
    /* Deletes a pet from the db based on the parameter passed in the route
    Sends code 200 on a successful delete and 500 on any error */
    console.log('Deleting a pet with id:', req.params.id);
    Pet.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;
