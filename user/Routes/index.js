const userRouter = require('express').Router();
const reqIsMissingParams = require('../../util/reqIsMissingParams');
const registerUser = require('./helpers/registerUser');

/*
 * Health check route for the user server
 */
userRouter.get('/health', (req, res) => {
    res.send('User server is healthy...');
});

userRouter.post('/createUser', async (req, res) => {
    try {
        const requiredParams = ['uuid', 'password'];
        if (reqIsMissingParams(req, res, requiredParams)) return;
        // Ensure user is UNIQUE!
        await registerUser(req.body.uuid, req.body.password);
        res.status(200).send('User creation successful');

    } catch(err) {
        console.log(err);
        res.status(400).send('User creation failed');
    }
});


userRouter.post('/send', (req, res) => {
    const requiredParams = ['uuid', 'password', 'toAddress', 'transaction', 'chain'];
    // Assume ETH as chain for now, can adjust later
    if (reqIsMissingParams(req, res, requiredParams)) return;
    res.send('Parameters are correct');
});

module.exports = userRouter;