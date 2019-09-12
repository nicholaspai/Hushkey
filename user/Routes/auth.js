const authRouter = require('express').Router();
const reqIsMissingParams = require('../../util/reqIsMissingParams');
const { registerUser, verifyUser } = require('./helpers/auth/userAuth');
const crypto = require('../../crypto');
const { storeMasterSeed } = require('../../custody/Routes/helpers/walletAuth');

require('dotenv').config();

authRouter.post('/createUser', async (req, res) => {
    try {
        const requiredParams = ['uuid', 'password'];
        if (reqIsMissingParams(req, res, requiredParams)) return;
        // Ensures uuid/username is unique
        const status = await registerUser(req.body.uuid, req.body.password);

        if (!status.success) {
            return res.status(400).send(status.message);
        } else {
            // Generates an HD wallet for this new user and stores their master seed derivation phrase
            const new_wallet = crypto.generate_hd_wallet(); 
            const master_seed = new_wallet.seed_buffer.toString('hex');
            await storeMasterSeed(req.body.uuid, master_seed);

            return res.status(200).send('User creation successful');
        }
    } catch(err) {
        console.error(err);
        res.status(400).send('User creation failed');
    }
});

authRouter.get('/createUser', async (req, res) => {
    try {
        const requiredParams = ['uuid', 'password'];
        if (reqIsMissingParams(req, res, requiredParams)) return;
        const success = await verifyUser(req.body.uuid, req.body.password);

        if (!success) {
            return res.status(400).send('Username invalid');
        } else {
            return res.status(200).send('User read successful');
        }

    } catch(err) {
        console.error(err);
        res.status(400).send('User creation failed');
    }
})

module.exports = {
    authRouter
}