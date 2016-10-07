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

var http = require('http').Server(app);
var io = require('socket.io')(http);

// connect mongoDB with the database url specified in config.js
mongoose.connect(config.url, function(err){
  if(err){
    console.log(err);
  }else{
    console.log('Connected to de database');
  }
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Set view engine to EJS and set the directory for the views
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'client', 'views'));

//serve static files from client folder.
//ex: libs/bootstrap/bootstrap.css in our html actually points to client/libs/bootstrap/bootstrap.css
app.use(express.static(path.resolve(__dirname, 'client')));

// require and initialize api
var api = require('./server/routes/api')(app, express, io);
app.use('/api', api);

// var users = [];
// io.on('connection', function(socket){
//     var username = '';
//     console.log('a User has Connected!');
//
//     socket.on('request-users', function(){
//       socket.emit('users', {users: users});
//     });
//
//     socket.on('message', function(data){
//       io.emit('message', {username: username, message: data.message});
//     })

    // socket.on('add-user', function(data){
    //   if(users.indexOf(data.username) == -1){
    //     io.emit('add-user', {
    //       username: data.username
    //     });
    //     username = data.username;
    //     users.push(data.username);
    //   } else {
    //     socket.emit('prompt-username', {
    //       message: 'User Already Exists'
    //     })
    //   }
    // })
    //
    // socket.on('disconnect', function(){
    //   console.log(username + ' has disconnected!');
    //   users.splice(users.indexOf(username), 1);
    //   io.emit('remove-user', {username: username});
    // })
// });

// get method to render template
app.get('*', function(req, res){
  res.render('index.ejs');
});

// get method to fix (Cannot GET) error
// app.get('/*', function(req, res){
//   res.render('index.ejs');
// });

//make app/http listen for incoming requests on the port assigned in config
http.listen(config.port, function(err){
  if(err){
    console.log(err);
  }else{
    console.log('Listening on port ' + config.port);
  }
});
