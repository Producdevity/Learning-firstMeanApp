// Author: Yassine Gherbi
// Mean Application

// require express
var express = require('express');
// require body-parser
var bodyParser = require('body-parser');
// require morgan
var morgan = require('morgan');
// require mongoose
var mongoose = require('mongoose');
// require configuration file
var config = require('./config');
// native NodeJS module for resolving paths
var path = require('path');

// initialize Express Web framework
var app = express();

// connect mongoDB with the database url specified in config.js
mongoose.connect(config.database, function(err){
  if(err){
    console.log(err);
  }else{
    console.log('Connected to de database');
  }
});


app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// require and initialize api
var api = require('./server/routes/api')(app, express);
app.use('/api', api);

// Set view engine to EJS and set the directory for the views
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'client', 'views'));

//serve static files from client folder.
//ex: libs/bootstrap/bootstrap.css in our html actually points to client/libs/bootstrap/bootstrap.css
app.use(express.static(path.resolve(__dirname, 'client')));

// get method to render template
app.get('/', function(req, res){
  res.render('index.ejs');
});

//make app listen for incoming requests on the port assigned in config
app.listen(config.port, function(err){
  if(err){
    console.log(err);
  }else{
    console.log('Listening on port ' + config.port);
  }
});
