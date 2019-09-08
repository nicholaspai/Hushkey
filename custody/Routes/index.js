const custodyRouter = require('express').Router();
const reqIsMissingParams = require('../../util/reqIsMissingParams');
const crypto = require('../../crypto');
const { storeMasterSeed, retrieveMasterSeed } = require('./helpers/walletAuth');
const seed_account = require('../../aztec/seed_account');
const web3 = require('../../aztec/web3');
const sleep = require('sleep');

/*
 * Health check route for the Custody server
 */
custodyRouter.get('/health', (req, res) => {
    res.status(200).send('Custody server is healthy');
});

custodyRouter.post('/generateWallet', async (req, res) => {
    const requiredParams = ['uuid'];
    if (reqIsMissingParams(req, res, requiredParams)) return;

    const new_wallet = crypto.generate_hd_wallet(); 
    const master_seed = new_wallet.seed_buffer.toString('hex');
    await storeMasterSeed(req.body.uuid, master_seed);
    res.status(200).send("wallet generated");
    // Encrypt and save master seed mapped to by uuid
});

custodyRouter.post('/signTx', async (req, res) => {
    const requiredParams = ['uuid', 'transaction', 'path'];
    if (reqIsMissingParams(req, res, requiredParams)) return;

    try {
        
        const addressIndex = req.body.path.addressIndex;
        const chain = req.body.path.chain;
        const account = req.body.path.account;

        const master_seed = await retrieveMasterSeed(req.body.uuid);
        const seed_buffer = Buffer.from(master_seed, 'hex');
        const hd_wallet = crypto.get_hd_wallet_from_master_seed(seed_buffer);

        const eth_wallet = await crypto.eth_get_account_at_index(hd_wallet, addressIndex, account);
        const private_key = eth_wallet.private_key;

        await seed_account(eth_wallet.account);
        
        // Let contract get seeded
        await sleep.sleep(10);

        const signed_txn = await eth_wallet.sign_transaction(req.body.transaction, private_key);
        const pending_txn = await web3.eth.sendSignedTransaction(signed_txn.rawTransaction);

        return res.status(200).send({success: true, transaction: pending_txn});
    } catch(err) {
        console.error(err);
        return res.status(401).send({success: false, transaction: ''});
    } 
});

// Returns addresses for a given account
custodyRouter.post('/getAddresses', async (req, res) => {
    const requiredParams = ['uuid', 'account', 'chain'];
    if (reqIsMissingParams(req, res, requiredParams)) return;

    const address_list = [];
    try {
        const master_seed = await retrieveMasterSeed(req.body.uuid);
        const seed_buffer = Buffer.from(master_seed, 'hex');
        const hd_wallet = crypto.get_hd_wallet_from_master_seed(seed_buffer);
    
        for (let i = 0; i < 5; i++) {
            const wallet = await crypto[`${req.body.chain.toLowerCase()}_get_account_at_index`](hd_wallet, i, req.body.account);
            address_list.push(wallet.account);
        }

        return res.status(200).send({success: true, addresses: address_list });
    } catch (err) {
        console.error(err);
        return res.status(200).send({success: false});
    }
});

module.exports = custodyRouter;