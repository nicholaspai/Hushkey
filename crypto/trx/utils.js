const { ec: EC } = require('elliptic')
const { keccak256 } = require('js-sha3')
const { hexStr2byteArray } = require('../utils/hex')
const { getBase58CheckAddress } = require('../utils/base58')

const private_to_public = (pri_key_bytes) => {
    const ec = new EC('secp256k1')
    const key = ec.keyFromPrivate(pri_key_bytes, 'bytes')
    const pub_key = key.getPublic()
    const x = pub_key.x
    const y = pub_key.y

    let x_hex = x.toString('hex')

    while (x_hex.length < 64) {
        x_hex = `0${x_hex}`
    }

    let y_hex = y.toString('hex')

    while (y_hex.length < 64) {
        y_hex = `0${y_hex}`
    }

    const pub_key_hex = `04${x_hex}${y_hex}`
    let pub_key_bytes = hexStr2byteArray(pub_key_hex)

    if (pub_key_bytes.length === 65) {
        pub_key_bytes = pub_key_bytes.slice(1)
    }

    const hash = keccak256(pub_key_bytes).toString()
    const ADDRESS_PREFIX = "41"
    const address_hex = ADDRESS_PREFIX + hash.substring(24)

    return getBase58CheckAddress(hexStr2byteArray(address_hex))
}

module.exports = {
    private_to_public
}