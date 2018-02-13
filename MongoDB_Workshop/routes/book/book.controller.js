(function() {
    'use strict';

    var Book = require('./book.model.js');

    //Basic CRUD
    
    // READ

    // "getById" - will grab all for display
    module.exports.getById = function(req, res) {
        Book.find({"_id" : req.params.id}, function (err, result) {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            return res.json(result);
        });
    };
    
    // "getByRating" - will grab all for display
    module.exports.getByRating = function(req, res) {
        Book.find({ "rating" : { $gte : req.params.rating}}, function (err, result) {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            return res.json(result);
        });
    };

    // "getAllAuthors" - will grab all authors for display
    module.exports.getAllAuthors = function(req, res) {
        Book.find({}, {"author" : 1, "_id" : 0}, function (err, result) {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            return res.json(result);
        });
    };

    // CREATE
    // "add" - will create a new post
    module.exports.add = function(req, res) {

        // Check and make sure they supplied all parts of body
        // Note that since rating is a number that if you check for false a value of zero returns true
        if ( !req.body.title || !req.body.author || typeof(req.body.rating) != 'number') {
          return res.status(400).send("Need a valid title, author, and rating in post body");
        }

        var book = new Book({
          title: req.body.title,
          author: req.body.author,
          rating: req.body.rating
        });
        
        book.save(function(err, result) {
          if (err) {
                console.error(err);
                return res.status(500).send(err);
          }
          return res.json(result);
        });
     };

    // UPDATE
    // "updateRating" - will edit exsisting one
     module.exports.updateRating = function(req, res) {

        if (!req.body.id) {
          return res.status(400).send("Need to add an id in body");
        } else if ( typeof(req.body.rating) != 'number') {
          return res.status(400).send("Need to add rating");
        }

        Book.update({"_id": req.body.id}, { $set: { "rating": req.body.rating }}, function(err, result) {
          if (err) {
                console.error(err);
                return res.status(500).send(err);
          }  
          return res.json(result);
        });
     };    
    
     // DELETE
     // "delete" - removes a document from database
     // WARNING: No undo so delete at own cost
     module.exports.delete = function(req, res) {
        // SHOULD have authenticaton token so no one can just randomly call the delete URL

         Book.findOneAndRemove({"_id": req.params.id}, function(err, result) {
          if (err) {
            console.error(err);
            return res.status(500).send(err);
          }
          return res.json(result);
        });
     };    
    
})();