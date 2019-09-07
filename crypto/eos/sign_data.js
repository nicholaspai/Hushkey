const eos_ecc = require('eosjs-ecc')

const sign = (data_to_sign, private_key_wif) => {
    const signature = eos_ecc.sign(data_to_sign, private_key_wif)
    return signature
}

const recover_signature = (signature, data_signed) => {
    let recover = eos_ecc.recover(signature, data_signed)
    return recover
}

module.exports = {
    sign,
    recover_signature
}

