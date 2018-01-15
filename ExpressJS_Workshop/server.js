const express = require('express'); //used as routing framework
const app = express(); //creates an instance of express

const bodyParser = require('body-parser'); //allows the use of req.body in POST request
const server = require('http').createServer(app); //creates an HTTP server instance

const port = 3000;

//-------------------------Express JS configs-----------------------------//
// view engine setup
// call req.render(FileName) below to run
app.set('views', './views'); //says where in root directory the find files (./views)
app.set('view engine', 'ejs'); //says which engine being used (ejs)

app.use(logger('dev')); //debugs logs in terminal
// IMPORTANT: If you don't use bodyParser then you will NOT be able to call req.body.value
// without parsing JSON yourself
app.use(bodyParser.json()); //parses json and sets to body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))) //sets all static file calls to 

//-------------------------Routing Calls-----------------------------//

app.get('/date', function(req, res, next) {

    var date = (new Date()).toString();

	return res.status(200).send(date);
});

// Loads page and set background color by color passed in URL
// Example: http://mySite:9000/color/red creates a red page
app.get('/color/:color', function(req, res, next) {
    
    var backgroundColor = req.params.color || "white"; //defaults if no param is passed
    
    // pass in a json file to render page with
    res.render('color', {
        message: "Server is up and running",
        color: backgroundColor        
    });   
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
