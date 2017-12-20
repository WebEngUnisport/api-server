const Mongoose = require('mongoose');

var universitySchema = Mongoose.Schema({
    Name: String,
    Code: String
});

module.exports = universitySchema;
