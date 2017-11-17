const Mongoose = require('mongoose');

var universitySchema = Mongoose.Schema({
    name: String,
    short: String
});

module.exports = universitySchema;
