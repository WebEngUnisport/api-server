const Mongoose = require('mongoose');

var courseSchema = Mongoose.Schema({

    category: require('./category'),
    uni: require('./university'),
    dates: [{
        type: Date,
        validate: [min, '{PATH} needs at least one Date']
    }],
    location: String
});

function min(val) {
    return val.length < 1;
}

module.exports = courseSchema;
