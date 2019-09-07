const web3 = require('../../aztec/web3')

const sign = (data_to_sign, private_key) => {
    const signature = web3.eth.accounts.sign(data_to_sign, private_key)
    return signature
}

const sign_contract_action = async (transaction_object, contract_address, private_key) => {
    let signer = web3.eth.accounts.privateKeyToAccount(private_key)
    let gas_estimate = await transaction_object.estimateGas({ from: signer.address })
    let signed_transaction = await signer.signTransaction({
        gas: gas_estimate,
        gasPrice: web3.utils.toWei('30', 'gwei'),
        to: contract_address,
        data: transaction_object.encodeABI()
    })
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
    sign_contract_action
}

