const mongoose = require('mongoose');

const connectToUserDb = () => {
    // Handle Mongoose auth
try {
    const mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0-95hao.mongodb.net/test?retryWrites=true&w=majority`;
    mongoose.connect(mongoUrl, {useNewUrlParser: true}, (err) => {
        if (err) console.log('DB connection error');
        console.log('User DB connected...');
    });
} catch (err) {
    console.log("Mongo credentials invalid! Check your .env file");
    }
}

module.exports = connectToUserDb;