const web3 = require('../../aztec/web3')

const sign = (data_to_sign, private_key) => {
    const signature = web3.eth.accounts.sign(data_to_sign, private_key)
    return signature
}

const sign_transaction = async (tx, private_key) => {
    // @dev set gas config in one place here
    tx.gas = 5500000
    tx.gasPrice = web3.utils.toWei('50', 'gwei')
    let signer = web3.eth.accounts.privateKeyToAccount(private_key)
    let signed_transaction = await signer.signTransaction(tx)
    return signed_transaction
}

const recover_signature = (signature, data_signed) => {
    let message_hash = web3.eth.accounts.hashMessage(data_signed)
    let recover = web3.eth.accounts.recover({
        messageHash: message_hash,
        v: signature.v,
        r: signature.r,
        s: signature.s
    })
    return recover
}

module.exports = {
    sign,
    recover_signature,
    sign_transaction
}

