const web3 = require('./web3')
const MAX_INT = web3.utils.toWei('10000', 'ether')

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

const seed_account = require('./seed_account')

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
    let txn = {
        to: CusdContract.options.address,
        data: unsigned_increase_approval_txn.encodeABI()
    }
    let signed_increase_approval_txn = await eth_wallet.sign_transaction(
        txn,
        eth_wallet.private_key
    )

    // First, seed sending account
    let pending_seed = await seed_account(signer)
    console.log(`Seeded account:`, pending_seed)

    let pending_hash = await web3.eth.sendSignedTransaction(
        signed_increase_approval_txn.rawTransaction
    )
    console.log(pending_hash)

    let post_allowance = await get_allowance(signer)
    console.log(`New ACE allowance to spend:`, post_allowance)
}
test()