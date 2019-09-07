/**
 * HD Chain subtrees: EOS
 */
const { 
    private_to_public
} = require('./utils')

const get_account_at_node = (node) => {
    const x_priv_buffer = node._privateKey
    const eos_pub_key = private_to_public(x_priv_buffer)
    return eos_pub_key
}

module.exports = {
    get_account_at_node
}