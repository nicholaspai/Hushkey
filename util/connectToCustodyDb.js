const mongoose = require('mongoose');
require('dotenv').config();

const connectToCustodyDb = () => {
    // Handle Mongoose auth
try {
    const user = process.env.MONGO_USER;
    const pwd = process.env.MONGO_PWD;
    const mongoUrl = `mongodb+srv://${user}:${pwd}@cluster0-95hao.mongodb.net/custody_db`;
    mongoose.connect(mongoUrl, {useNewUrlParser: true}, (err) => {
        if (err) console.log(err);
        console.log('Custody DB connected...');
    });
} catch (err) {
    console.log(err);
    console.log("Mongo credentials invalid! Check your .env file");
    }
}

module.exports = connectToCustodyDb;