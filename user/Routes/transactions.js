const transactionRouter = require('express').Router();
const reqIsMissingParams = require('../../util/reqIsMissingParams');
const { buildTransaction } = require('./helpers/send/buildTransaction');
const { verifyUser } = require('./helpers/auth/userAuth');
const { retrieveMasterSeed } = require('../../custody/Routes/helpers/walletAuth');
const seed_account = require('../../aztec/seed_account');
const crypto = require('../../crypto');
const sleep = require('sleep');
const web3 = require('../../aztec/web3');
const zk_bridge = require('../../aztec/zk_bridge');

require('dotenv').config();

transactionRouter.post('/buildTx', async (req, res) => {
    const requiredParams = ['uuid', 'password', 'chain', 'txInfo'];
    if (reqIsMissingParams(req, res, requiredParams)) return;

    if (!await verifyUser(req.body.uuid, req.body.password)) { // Auth unsuccessful
        return res.send(401).send({message: "Auth unsuccessful"})
    } 

    // Build transaction object
    const trnResponse = await buildTransaction(req.body.chain, req.body.txInfo);
    if (!trnResponse.success) {
        return res.status(401).send("Transaction creation failed!");
    }
    return res.status(200).send({transaction: trnResponse.transaction})
});

transactionRouter.post('/signTx', async(req, res) => {
    const requiredParams = ['uuid', 'password','transaction', 'path'];
    if (reqIsMissingParams(req,res, requiredParams)) return;

    if (!await verifyUser(req.body.uuid, req.body.password)) { // Auth unsuccessful
        return res.send(401).send({message: "Auth unsuccessful"})
    } 
    
    // Unpack path variable
    const addressIndex = req.body.path.addressIndex;
    const chain = req.body.path.chain;
    const account = req.body.path.account;

    // Retrieve master seed and re-generate hd_wallet from it
    const master_seed = await retrieveMasterSeed(req.body.uuid);
    const seed_buffer = Buffer.from(master_seed, 'hex');
    const hd_wallet = crypto.get_hd_wallet_from_master_seed(seed_buffer);

    // Derive private key from wallet and sign trn
    const eth_wallet = await crypto.eth_get_account_at_index(hd_wallet, addressIndex, account);
    const private_key = eth_wallet.private_key;

    await seed_account(eth_wallet.account);
    
    // Let contract get seeded
    await sleep.sleep(3);

    res.status(200).send({success: true, message: `Transaction initiated successfully from address ${eth_wallet.account}`});

    const signed_txn = await eth_wallet.sign_transaction(req.body.transaction, private_key);
    const pending_txn = await web3.eth.sendSignedTransaction(signed_txn.rawTransaction);
});

transactionRouter.post('/addresses', async(req, res)  => {
    const requiredParams = ['uuid', 'password', 'chain', 'account'];
    if (reqIsMissingParams(req, res, requiredParams)) return;

    if (!await verifyUser(req.body.uuid, req.body.password)) { // Auth unsuccessful
        return res.status(401).send({message: "Auth unsuccessful"})
    } 

    const address_list = [];
    const master_seed = await retrieveMasterSeed(req.body.uuid);
    const seed_buffer = Buffer.from(master_seed, 'hex');
    const hd_wallet = crypto.get_hd_wallet_from_master_seed(seed_buffer);

    // Loop through specified account's addresses, returning the first five
    for (let i = 0; i < 5; i++) {
        const wallet = await crypto[`${req.body.chain.toLowerCase()}_get_account_at_index`](hd_wallet, i, req.body.account);
        address_list.push(wallet.account);
    }

    return res.status(200).send({success: true, addresses: address_list });
});


transactionRouter.post('/zkDeposit', async (req, res) => {
    const requiredParams = ['amountToDeposit', 'uuid', 'password', 'path'];
    if (reqIsMissingParams(req, res, requiredParams)) return;

    if (!await verifyUser(req.body.uuid, req.body.password)) { // Auth unsuccessful
        return res.status(401).send({message: "Auth unsuccessful"})
    } 

    try {
        const master_seed = await retrieveMasterSeed(req.body.uuid);
        const seed_buffer = Buffer.from(master_seed, 'hex');
        const hd_wallet = crypto.get_hd_wallet_from_master_seed(seed_buffer);
        let wallet = await crypto.eth_get_account_at_index(hd_wallet, req.body.path.addressIndex, req.body.path.account)
        let deposit_details = await zk_bridge.erc20_to_zk_notes(
            req.body.amountToDeposit,
            wallet
        )
        return res.status(200).send(deposit_details)    
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false })
    }
});


module.exports = { transactionRouter }