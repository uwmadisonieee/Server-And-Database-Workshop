(function() {
    'use strict';

    var Count = require('./count.model.js');

//Basic CRUD
    
    // READ
    // "get" - will grab all for display
    module.exports.get = function(req, res) { 
        Count.find({"_id" : req.params.id}, function (err, result) {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            return res.json(result);
        });
    };

    // CREATE
    // "start" - will create a new post
    module.exports.start = function(req, res) {
        var count = new Count({count: 0});
        count.save(function(err, post) {
          if (err) {
                console.error(err);
                return res.status(500).send(err);
          }
          return res.json(result);
        });
     };

    // UPDATE
    // "update" - will edit exsisting one
     module.exports.update = function(req, res) {
        var id = req.params.id;
        var newCount = req.params.count;
        // Need to do this so mongo doesn't think we're trying to edit the _id
  
        Count.update({"_id" : id}, { $set: {"count" : newCount}}, function(err, result) {
          if (err) {
                console.error(err);
                return res.status(500).send(err);
          }  
          return res.json(result);
        });
     };
    
     // DELETE
     // "delete" - removes a post
     // WARNING: No undo so delete at own cost
     module.exports.delete = function(req, res) {
        // SHOULD have authenticaton token so no one can just randomly call the delete URL
         var id = req.params.id;
         Count.findOneAndRemove({"_id" : id}, function(err, result) {
          if (err) {
            console.error(err);
            return res.status(500).send(err);
          }
          return res.json(result);
        });
     };    
    
})();
