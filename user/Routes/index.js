const userRouter = require('express').Router();

/*
 * Health check route for the user server
 */
userRouter.get('/health', (req, res) => {
    res.send('User server is healthy...');
});

module.exports = userRouter;