/**
 * HD Chain subtrees: ETHEREUM
 * Source: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-55.md
 */
const { 
    private_to_public
} = require('./utils')

const get_account_at_node = (node) => {
    const x_priv_buffer = node._privateKey
    const eth_pub_key = private_to_public(x_priv_buffer)
    return eth_pub_key
}

module.exports = {
    get_account_at_node
}
