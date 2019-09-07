const eth_util = require('ethereumjs-util')

const private_to_public = (pri_key_bytes) => {
    const pub_key_bytes = eth_util.privateToPublic(pri_key_bytes)
    const address_bytes = eth_util.publicToAddress(pub_key_bytes)
    const address_hex = address_bytes.toString('hex')
    const address = eth_util.toChecksumAddress(address_hex)
    return address

}

module.exports = {
    private_to_public
}