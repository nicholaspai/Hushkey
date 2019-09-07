const MAX_INT = 1

const web3 = require('./web3')
const {
    CusdContract,
    AceContract
} = require('./contracts')

const get_allowance = async (address) => {
    let allowance = await CusdContract.methods.allowance(address, AceContract.options.address).call()
    return parseFloat(web3.utils.fromWei(allowance, 'ether'))
}

const get_increase_allowance_transaction = () => {
    let approveTransaction = CusdContract.methods.increaseApproval(
        AceContract.options.address, 
        MAX_INT
    )
    return approveTransaction
}

module.exports = {
    get_allowance
}

// Test
const test = async () => {
    const cryptomodule = require('../crypto')
    let hd_wallet = cryptomodule.generate_hd_wallet()
    let hd_node = hd_wallet.hd_wallet
    let eth_wallet = cryptomodule.eth_get_account_at_index(hd_node, 0, 0)
    let signer = eth_wallet.account
    console.log(`Using eth account: ${signer}`)
    let allowance = await get_allowance(signer)
    console.log(`Current ACE allowance to spend:`, allowance)

    let unsigned_increase_approval_txn = get_increase_allowance_transaction()
    let signed_increase_approval_txn = await eth_wallet.sign_contract_action(
        unsigned_increase_approval_txn,
        CusdContract.options.address,
        eth_wallet.private_key
    )
    let pending_hash = await web3.eth.sendSignedTransaction(
        signed_increase_approval_txn.rawTransaction
    )
    console.log(pending_hash)
    // console.log(`Signed txn to toggle ON unlimited allowance:`, signed_increase_approval_txn)
}
test()