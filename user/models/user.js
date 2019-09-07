const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    uuid: String,
    password: String,
    dateCreated: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;