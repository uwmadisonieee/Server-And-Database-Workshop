(function() {
    'use strict';

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    // Create a schema to prevent bad input data types
    // Google "Mongoose Schema datatypes" for more help
    // Also if you want an value to be whatever just use
    // myRandomValue : {}
    var CountSchema = new Schema(
    {
        count: Number
    }, {"collection": "count"});

module.exports = mongoose.model('Count', CountSchema);

})();
