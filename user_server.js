const express = require('express');
const app = express();
const { userRouter, authRouter, transactionRouter } = require('./user/Routes');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors')
require('dotenv').config();

const port = (process.env.PORT_USER ? process.env.PORT_USER : 4000)

// Module User server
const _app = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    try {
        app.use(session({
            secret: process.env.SESSION_SECRET,
            resave: true,
            saveUninitialized: true
        }));
    } catch (err) {
        console.error("Session error, check .env file");
    }
    app.use(cors({
        origin: '*', // Be sure to switch to your production domain
        optionsSuccessStatus: 200
    }));
    
    app.use('/user', userRouter);
    app.use('/user/auth', authRouter);
    app.use('/user/tx', transactionRouter);
    
    /**
     *  Pre-Run Scripts
     * 
     * */
    const connectToUserDb = require('./util/connectToUserDb');
    
    // Connect to user wallet mapping  DB
    connectToUserDb();
    
    app.listen(port, () => console.log(`User server running on port ${port}`));    
}

module.exports = _app
