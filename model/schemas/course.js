const Mongoose = require('mongoose');

var courseSchema = Mongoose.Schema({

    description: String,
    activity: String,
    periods: String,
    times: String,
    level: String,
    instructors: String,
    responsible: String,
    information: String,
    material: String,
    languages: String,
    continuous: Boolean,
    sport: String,
    link: String,
    university: require('./university'),
    place: String,
    dates: [{
        type: String,
        validate: [min, '{PATH} needs at least one Date']
    }],

    category: require('./category')
});

function min(val) {
    return val.length < 1;
}

module.exports = courseSchema;
