const transactionRouter = require('express').Router();
const reqIsMissingParams = require('../../util/reqIsMissingParams');
const { authenticate } = require('../../middleware/authenticate');
const buildTransaction = require('./helpers/send/buildTransaction');

transactionRouter.post('/send', authenticate, async(req, res) => {
    // buildTransaction(chain, txInfo);
    res.status(200).send('sent');
})

module.exports = { transactionRouter }