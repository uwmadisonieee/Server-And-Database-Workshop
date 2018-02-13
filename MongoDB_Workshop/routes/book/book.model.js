(function() {
    'use strict';

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    // Create a schema to prevent bad input data types
    // Google "Mongoose Schema datatypes" for more help
    // Also if you want an value to be whatever just use
    // myRandomValue : {}
    var BookSchema = new Schema(
    {
        title: String,
        author: String,
        rating: Number
    }, { "collection": "book" });

module.exports = mongoose.model('Book', BookSchema);

})();