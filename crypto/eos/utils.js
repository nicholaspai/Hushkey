const eos_ecc = require('eosjs-ecc')

const private_to_public = (pri_key_bytes) => {
    const pub_key_bytes = eos_ecc.privateToPublic(private_to_eos_private(pri_key_bytes))
    return pub_key_bytes
}

const private_to_eos_private = (pri_key_bytes) => {
    const priv_key_WIF = eos_ecc.PrivateKey(pri_key_bytes).toWif()
    return priv_key_WIF
}

module.exports = {
    private_to_public,
    private_to_eos_private
}