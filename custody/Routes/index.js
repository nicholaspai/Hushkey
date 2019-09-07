const custodyRouter = require('express').Router();
const reqIsMissingParams = require('../../middleware/reqIsMissingParams');

/*
 * Health check route for the Custody server
 */
custodyRouter.get('/health', (req, res) => {
    res.status(200).send('Custody server is healthy');
});

custodyRouter.get('/getAddress', (req, res) => {
    res.status(200).send('Address placeholder');
});

custodyRouter.post('/sendTransaction', (req, res) => {
    const required = ['transaction', 'userKey'];
    // Send transaction to Nick's custody to get it signed and return transaction status
    res.status(200).send('Tx status placeholder');
});

module.exports = custodyRouter;