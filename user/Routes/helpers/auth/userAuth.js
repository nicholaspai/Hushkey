const User = require('../../../models/user');
const bcrypt = require('bcrypt');

require('dotenv').config();

/** 
 * Methods
 * - Internal
 */

 // Create and save a new user
const registerUser = async (uuid, password) => {
    
    try {
        // GET a new User named uuid from DB 
        const exists = await User.find({
            uuid: uuid
        });

        // uuid is already token
        if (exists.length != 0) {
            return ({
                success: false, 
                message: "Username is taken"
            })
        }

        // Store uuid's encrypted password
        let encryptedPwd 
        try {
            encryptedPwd = await bcrypt.hash(password.toString(), Number(process.env.SALT_ROUNDS));
        } catch (err) {
            console.error(`bcrypt.hash failed:`, err)
        }

        // Create a new User with uuid
        const user = new User({
            uuid: uuid,
            password: encryptedPwd,
            dateCreated: new Date(Date.now())
        });
        user.save((err) => {
            if (err) {
                console.log(`User CREATE failed:`, err);
            }
        });   
        // Success
        return ({
            success: true, 
            message: "User registered"
        })      
    } catch (err) {
        console.error(`User READ failed:`,err)
    }
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
        console.error(`User READ failed:`,err);
    }
}

module.exports = {
    registerUser,
    verifyUser
}