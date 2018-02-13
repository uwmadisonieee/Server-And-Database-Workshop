//-------------------------Module "Importing"-----------------------------//
var express = require('express'); //used as routing framework
var app = express(); //creates an instance of express

//modules required (same idea of #includes or Imports)
var path = require('path'); //Node.js module used for getting path of file
var logger = require('morgan'); //used to log in console window all request
var cookieParser = require('cookie-parser'); //Parse Cookie header and populate req.cookies
var bodyParser = require('body-parser'); //allows the use of req.body in POST request
var server = require('http').createServer(app); //creates an HTTP server instance

var api = require('./routes/api.js'); //gets api logic from path

// add for Mongo support
var mongoose = require('mongoose');                         
var mongoURI = "mongodb://127.0.0.1:27017/DataBaseNameHere";
var mongoDB = mongoose.connect(mongoURI).connection;
mongoDB.on('error', function(err) { console.log(err.message); });
mongoDB.once('open', function() {
  console.log("mongodb connection open");
});


//-------------------------Express JS configs-----------------------------//

app.use(logger('dev')); //debugs logs in terminal
// IMPORTANT: If you don't use bodyParser then you will NOT be able to call req.body.value
// without parsing JSON yourself
app.use(bodyParser.json()); //parses json and sets to body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', api);

// so when people try to access it via browser
app.get('/', function(req, res) {
   return res.status(200).send("Please view the README.md for instructions how to use this MongoDB Example.")
});
// ------------ Server Setup --------------//

/**
 * Get port from environment and store in Express.
 */

// Change Port here
// process.env.PORT used with services like Azure or AWS who give port
var port = normalizePort(process.env.PORT || '9000');
app.set('port', port);


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
