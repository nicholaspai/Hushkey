/**
 * HD Chain subtrees: TRON
 * Source: https://github.com/rodyce/tron-tests/blob/master/utils/accounts.js
 */

const { 
    private_to_public
 } = require('./utils')

const get_account_at_node = (node) => {
    const x_priv_buffer = node._privateKey
    const tron_pub_key = private_to_public(x_priv_buffer)
    return tron_pub_key
}

module.exports = {
    get_account_at_node
}