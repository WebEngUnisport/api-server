const Mongoose = require('mongoose');

var categorySchema = Mongoose.Schema({
    Name: String,
    Code: String
});

module.exports = categorySchema;
