const custodyRouter = require('express').Router();
const reqIsMissingParams = require('../../util/reqIsMissingParams');
const crypto = require('../../crypto');
const storeMasterSeed = require('./helpers/storeMasterSeed');

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

custodyRouter.post('/signTx', (req, res) => {
    const requiredParams = ['transaction', 'path'];
    const addressIndex = path.addressIndex;
    const chain = path.chain;
    const account = path.account;

    // Get HD wallet from seed
    // let master_seed// = Buffer.from(get_seed(user), "hex")
    //let user_hd_wallet = crypto.get_hd_wallet_from_master_seed(master_seed);

    //let eth_wallet = crypto.eth_get_account_at_index(user_hd_wallet, 0, 0);
    // let get_account_func = crypto[`${chain.toLowerCase()}_get_account_at_index`]
    // let sub_wallet = get_account_func(user_hd_wallet, account, addressIndex)
    //let private_key = sub_wallet.private_key
    // //let signed_txn = sub_wallet.sign_transaction(txn, private_key) // call one of the sign functions
    
    // const signedTx = "hsldfhamsxsuhnsgh";
    // res.status(200).send({ success: true, signedTx: signedTx });
});

// Returns addresses for a given account
custodyRouter.get('/getAddresses', (req, res) => {
    const requiredParams = ['uuid'];
    // When addresses are returned to user, creates an in memory mapping of Address_Index (0-5, w.e) -> Path (memcache?)
    // path consists of coin type, account, address_index


    // Creates a mapping of 
    //Address -> Path
    // coin type, account, address index -> PATH
    res.status(200).send({txResponse: 'Address placeholder'});
});

module.exports = custodyRouter;