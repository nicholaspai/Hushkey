const web3 = require('./web3')
require('dotenv').config()
const eth_utils = require('../crypto/eth/sign_data')
const seed_account = async (recipient) => {
    let txn = {
        to: recipient,
        value: web3.utils.toWei('0.5', 'ether'),
    }
    let signed_txn = await eth_utils.sign_transaction(txn, process.env.SEEDER_PRIVATE_KEY)
    let pending_hash = await web3.eth.sendSignedTransaction(signed_txn.rawTransaction)
    return pending_hash
}

module.exports = seed_account