var express = require('express');
var router = require('./src/routes');
var bodyParser = require('body-parser');
const { request } = require('express');
var mongoose  = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ticket_generation', {useNewUrlParser: true, useUnifiedTopology: true});

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api',router);

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Web app listening at http://%s:%s", host, port)
})