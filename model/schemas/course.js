const Mongoose = require('mongoose');

var courseSchema = Mongoose.Schema({

    Kursbeschreibung: String,
    //Bezeichnung der Aktivität: String,
    Perioden: String,
    Kurszeiten: String,
    Kursniveau: String,
    Trainingsleitende: String,
    Verantwortlich: String,
    Bemerkungen: String,
    Material: String,
    Sprachen: String,
    Continuous: Boolean,
    Sport: String,
    Link: String,
    Uni: require('./university'),
    Ort: String,
    Dates: [{
        type: String,
        validate: [min, '{PATH} needs at least one Date']
    }],

    category: require('./category')
});

function min(val) {
    return val.length < 1;
}

module.exports = courseSchema;
