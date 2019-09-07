const Tronweb = require('tronweb')

const sign = (data_to_sign, private_key) => {
    const signature = await Tronweb.trx.sign(transaction, privKey);
    return signature
}

const recover_signature = (signature, data_signed) => {
    const web3 = new Web3()
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
    recover_signature
}

