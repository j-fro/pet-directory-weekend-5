var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var petsRouter = require('./routers/petsRouter');
var app = express();

mongoose.connect('mongodb://localhost:27017/petsDb');

app.use('/pets', petsRouter);

app.set('port', (process.env.PORT || 8000));

app.listen(app.get('port'), function() {
    console.log('Server listening on port', app.get('port'));
});
