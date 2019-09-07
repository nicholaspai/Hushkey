const mongoose = require('mongoose');
const connectToUserDb = require('../../../util/connectToUserDb');
const User = require('../../models/user');
require('dotenv').config();

connectToUserDb();


const registerUser = async (uuid, password) => {
        const user = new User({
            uuid: uuid,
            password: password,
            dateCreated: new Date(Date.now())
        });
    
        user.save((err) => {
            if (err) console.log(err);
        });
}

module.exports = registerUser;