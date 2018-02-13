(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();

  // Creates the next layer of url call
  // example go to /api/count to go to count folder
  // Also: index.js is the file called inside the folder 
  router.use('/book', require('./book'));
  router.use('/count', require('./count'));

  module.exports = router;

})();