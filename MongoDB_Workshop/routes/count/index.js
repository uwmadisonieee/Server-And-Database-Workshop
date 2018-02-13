(function() {
  'use strict';

  var express = require('express');
  var controller = require('./count.controller.js')    
    
  var router = express.Router();

  // Create last layer of API call so a POST request to /api/count/start
  // will run the "start" function the controller
  router.get('/:id', controller.get);
  router.post('/start', controller.start);
  router.post('/:id/:count', controller.update);
  router.delete('/:id', controller.delete);  

  module.exports = router;

})();