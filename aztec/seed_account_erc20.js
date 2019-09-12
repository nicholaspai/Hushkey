const web3 = require('./web3')
require('dotenv').config()
const eth_utils = require('../crypto/eth/sign_data')
const { dripCusd, dripEth } = require('./faucet')

const {
    Wt0Contract
} = require('./contracts')
const seed_account = async (recipient) => {
    // EASY
    let result = await dripCusd(50, recipient)
    console.log(result)
    
    // HARD
    // let contract_data = Wt0Contract.methods.mintCUSD(recipient, web3.utils.toWei('50', 'ether'))
    // let txn = {
    //     to: Wt0Contract.options.address,
    //     data: contract_data.encodeABI()
    // }
    // let signed_txn = await eth_utils.sign_transaction(txn, process.env.SEEDER_ERC20_PRIVATE_KEY)
    // let pending_hash = await web3.eth.sendSignedTransaction(signed_txn.rawTransaction)
    // return pending_hash
}

module.exports = seed_account