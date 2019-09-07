const custodyRouter = require('express').Router();
const reqIsMissingParams = require('../../middleware/reqIsMissingParams');

/*
 * Health check route for the Custody server
 */
custodyRouter.get('/health', (req, res) => {
    res.status(200).send('Custody server is healthy');
});

custodyRouter.post('/generateWallet', (req, res) => {
    // Generates wallet and is passed seed from Crypto.
    // Maps uuid -> PROTECTED(seed)
});

// Returns addresses for a given account
custodyRouter.get('/getAddresses', (req, res) => {
    const requiredParams = ['uuid'];
    // When addresses are returned to user, creates an in memory mapping of Address_Index (0-5, w.e) -> Path (memcache?)
    // path consists of coin type, account, address_index


    // Creates a mapping of 
    //Address -> Path
    // coin type, account, address index -> PATH
    res.status(200).send('Address placeholder');
});

custodyRouter.post('/sendTransaction', (req, res) => {
    const required = ['transaction', 'userKey'];
    // Send transaction to Nick's custody to get it signed and return transaction status
    res.status(200).send('Tx status placeholder');
});

module.exports = custodyRouter;