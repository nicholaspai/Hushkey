const transactionRouter = require('express').Router();
const reqIsMissingParams = require('../../util/reqIsMissingParams');
const { authenticate } = require('../../middleware/authenticate');
const { buildTransaction } = require('./helpers/send/buildTransaction');
const axios = require('axios');

transactionRouter.post('/buildTx', authenticate, async(req, res) => {
    const requiredParams = ['chain', 'txInfo'];
    if (reqIsMissingParams(req, res, requiredParams)) return;
    const transaction = await buildTransaction(req.body.chain, req.body.txInfo);
    res.status(200).send({ transaction: transaction });
});

transactionRouter.post('/signTx', authenticate, async(req, res) => {
    const requiredParams = ['chain', 'txInfo'];
    if (reqIsMissingParams(req,res, requiredParams)) return;
    let data = {
        chain: req.body.chain,
        transaction: req.body.txInfo
    }
    try {
        const txResponse = await axios.post('http://localhost:3001/custody/signTx', data);
        if (!txResponse.data.success) {
            res.status(401).send({success: false, transaction: ''});
        } else {
            console.log(txResponse.data);
            res.status(200).send({success: true, transaction: txResponse.data.signedTx});
        }
    } catch (err) {
        console.log(err);
        res.status(400).send("failed");
    }    
});

transactionRouter.post('/sendTx', authenticate, async(req, res) => {
    const requiredParams = ['chain', 'transaction'];

    // ACTUALLY SEND TRANSACTION ON ETH
    
});

module.exports = { transactionRouter }