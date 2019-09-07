const mongoose = require('mongoose');
const connectToUserDb = require('../../../util/connectToUserDb');
const User = require('../../models/user');
const authenticate = require('../../../middleware/authenticate');
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

const verifyUser = async (uuid, password) => {
    try {
        const users = User.find({ uuid: uuid, password: password });
        if (users.length == 0) {
            return false;
        }
        return true;
    } catch(err) {
        console.log(err);
    }

}

module.exports = {
    registerUser,
    verifyUser
}