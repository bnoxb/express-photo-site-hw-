const mongoose = require('mongoose');
const Photo = require('./Photo');

const userSchema = mongoose.Schema({
    name: String,
    password: String,
    images: [Photo.schema]
})

const Users = mongoose.model('User', userSchema);

module.exports = Users;