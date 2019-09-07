/**
 * HD Chain subtrees: BITCOIN
 * Source: https://medium.com/bitcraft/so-you-want-to-build-a-bitcoin-hd-wallet-part-1-8b27aa001ac3
 */
const { 
    public_to_public
} = require('./utils')

const get_account_at_node = (node) => {
    const x_pub_buffer = node._publicKey
    const btc_pub_key = public_to_public(x_pub_buffer)
    return btc_pub_key
}

module.exports = {
    get_account_at_node
}
