const mongoose = require('mongoose');
require('dotenv').config();

const connectToUserDb = () => {
    // Handle Mongoose auth
    try {
        const user = process.env.MONGO_USER;
        const pwd = process.env.MONGO_PWD;
        const host = `mongodb.net/user_db`
        const mongoUrl = `mongodb+srv://${user}:${pwd}@cluster0-95hao.${host}`;
        mongoose.connect(mongoUrl, {useNewUrlParser: true}, (err) => {
            if (err) console.error(err);
            console.log(`User DB connected to ${host}`);
        });
    } catch (err) {
        console.error("Mongo error, edit your .env file to update credentials:", err);
    }
}

module.exports = connectToUserDb;