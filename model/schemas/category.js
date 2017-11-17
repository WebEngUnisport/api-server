const Mongoose = require('mongoose');

var categorySchema = Mongoose.Schema({
    name: String
});

module.exports = categorySchema;
