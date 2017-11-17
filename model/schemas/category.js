const Mongoose = require('mongoose');

var categorySchema = Mongoose.Schema({
    name: String,
    short: String
});

module.exports = categorySchema;
