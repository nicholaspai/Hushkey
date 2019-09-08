const authRouter = require('express').Router();
const reqIsMissingParams = require('../../util/reqIsMissingParams');
const { registerUser, verifyUser } = require('./helpers/auth/userAuth');
const { authenticate } = require('../../middleware/authenticate');
const axios = require('axios');
require('dotenv').config();

authRouter.post('/createUser', async (req, res) => {
    try {
        const requiredParams = ['uuid', 'password'];
        if (reqIsMissingParams(req, res, requiredParams)) return;
        // Ensure user is UNIQUE!
        const status = await registerUser(req.body.uuid, req.body.password);

        if (!status.success) {
            res.status(200).send('Username taken, try another');
            return;
        }
        
        let data = {
            "uuid": req.body.uuid
        }
        await axios.post(`http://${process.env.root}/custody/generateWallet`, data);

        res.status(200).send('User creation successful');

    } catch(err) {
        console.log(err);
        res.status(400).send('User creation failed');
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const requiredParams = ['uuid', 'password'];
        if (reqIsMissingParams(req, res, requiredParams)) return;
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

authRouter.post('/logout', authenticate, async (req, res) => {
    req.session.auth = false;
    res.status(200).send({ message:'User logged out' });
});

module.exports = {
    authRouter
}