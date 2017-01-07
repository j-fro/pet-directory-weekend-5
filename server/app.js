var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var app = express();

app.set('port', (process.env.PORT || 8000));

app.listen(app.get('port'), function() {
    console.log('Server listening on port', app.get('port'));
});
