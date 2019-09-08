const express = require('express');
const app = express();
const { userRouter, authRouter, transactionRouter } = require('./user/Routes');
const bodyParser = require('body-parser');
const session = require('express-session');
const port = 3000;
const cors = require('cors')
require('dotenv').config();

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
    console.log("Check .env file");
}
app.use(cors({
	origin: '*', // Be sure to switch to your production domain
	optionsSuccessStatus: 200
}));

app.use('/user', userRouter);
app.use('/user/auth', authRouter);
app.use('/user/tx', transactionRouter);

app.listen(process.env.PORT || port, () => console.log(`User server running on port ${port}`));
