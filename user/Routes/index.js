const userRouter = require('express').Router();
const { authRouter } = require('./auth');
const { transactionRouter } = require('./transactions');

/*
 * Health check route for the user server
 */
userRouter.get('/health', (req, res) => {
    res.send('User server is healthy...');
});

module.exports = {
    userRouter,
    authRouter,
    transactionRouter
}