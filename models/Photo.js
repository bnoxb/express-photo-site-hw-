const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
    userName: {type: String, required: true},
    url: {type: String, required: true},
    title: String,
    info: String    
});

const Photos = mongoose.model('Photos', photoSchema);

module.exports = Photos;