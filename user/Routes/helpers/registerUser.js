const mongoose = require('mongoose');
const connectToUserDb = require('../../../util/connectToUserDb');
const User = require('../../models/user');
require('dotenv').config();



const registerUser = (uuid, password) => {
    console.log(uuid);
    console.log(password);
}

connectToUserDb();

module.exports = registerUser;