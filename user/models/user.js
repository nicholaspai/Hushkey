const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    uuid: String,
    password: String,
    dateCreated: String
});

module.exports = mongoose.model('User', userSchema, 'user');