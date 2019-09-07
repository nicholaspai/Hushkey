const userRouter = require('express').Router();
const reqIsMissingParams = require('../../util/reqIsMissingParams');
const { registerUser, verifyUser } = require('./helpers/userAuth');
const { authenticate } = require('../../middleware/authenticate');

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

userRouter.post('/login', async (req, res) => {
    try {
        const requiredParams = ['uuid', 'password'];

        if (await verifyUser(req.body.uuid, req.body.password)) { // Auth successful
            req.session.uuid = req.body.uuid;
            req.session.auth = true;
            res.status(200).send({ message: 'User logged in' });
        } else { // Auth failed
            res.status(401).send({ message: 'Invalid credentials' });
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: 'Invalid credentials'});
    }
});

userRouter.post('/logout', authenticate, async (req, res) => {
    req.session.auth = false;
    res.status(200).send({ message:'User logged out' });
});

userRouter.post('/send', authenticate, async(req, res) => {

    res.send('cool');
});

userRouter.get('/uuid', (req, res) => {
    res.status(200).send(req.session.uuid);
});


// userRouter.post('/send', (req, res) => {
//     const requiredParams = ['uuid', 'password', 'toAddress', 'transaction', 'chain'];
//     // Assume ETH as chain for now, can adjust later
//     if (reqIsMissingParams(req, res, requiredParams)) return;
//     res.send('Parameters are correct');
// });

module.exports = userRouter;