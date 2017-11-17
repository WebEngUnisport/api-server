const Mongoose = require('mongoose');

var universitySchema = Mongoose.Schema({
    name: String
});

module.exports = universitySchema;
