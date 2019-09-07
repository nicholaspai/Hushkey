const mongoose = require('mongoose');
const connectToUserDb = require('../../../util/connectToUserDb');
const User = require('../../models/user');
const bcrypt = require('bcrypt');

require('dotenv').config();

connectToUserDb();


const registerUser = async (uuid, password) => {
    const encryptedPwd = await bcrypt.hash(password.toString(), Number(process.env.SALT_ROUNDS));

    const user = new User({
        uuid: uuid,
        password: encryptedPwd,
        dateCreated: new Date(Date.now())
    });

    user.save((err) => {
        if (err) console.log(err);
    });      
}

const verifyUser = async (uuid, password) => {
    try {
        const user = await User.find({ uuid: uuid });
        // If user does not exist
        if (user.length == 0) {
            return false;
        }
        // If password is incorrect
        if (!(await bcrypt.compare(password.toString(), user[0].password))) {
            return false
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