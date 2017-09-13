'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var cors = require('cors');
var bodyParser = require('body-parser')

const { urlShortener, urlGetter } = require('./urlShortener');

var app = express();


// Basic Configuration 
//var port = process.env.PORT || 3000;
var port = 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);
app.use( cors() );

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
//API
app.post("/api/shorturl/new", function (req, res) {
  const { url } = req.body;
  urlShortener( url )
  .then( (valid) => {
    res.json(valid);
  })
  .catch( (invalid) => {
    res.json(invalid);
  })
});


app.get("/api/shorturl/:code", function (req, res) {
  
  //res.redirect(200,"asd");
});




app.listen(port, function () {
  console.log('Node.js listening ...');
});