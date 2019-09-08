const web3 = require('./web3')
const MAX_INT = web3.utils.toWei('10000', 'ether')

const {
    CusdContract,
    AceContract
} = require('./getContract')

const get_increase_allowance_transaction = () => {
    let approveTransaction = CusdContract.methods.increaseApproval(
        AceContract.options.address, 
        MAX_INT
    )
    let txn = {
        to: CusdContract.options.address,
        data: approveTransaction.encodeABI()
    }
    return txn
}

module.exports = {
    get_increase_allowance_transaction
}

