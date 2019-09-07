/**
 * HD Chain subtrees: EOS
 */
const { 
    private_to_public,
    private_to_eos_private
} = require('./utils')

const get_account_at_node = (node) => {
    const x_priv_buffer = node._privateKey
    const eos_pub_key = private_to_public(x_priv_buffer)
    return eos_pub_key
}

const { get_path_for_address } = require('../bip44/path')
const COIN_TYPES = require('../bip44/cointypes')
const { get_hd_node_from_path } = require('../bip32/index')
const { sign, recover_signature } = require('./sign_data')
const get_account_at_index = (hd_wallet, address_index, account=0) => {
    let coin = COIN_TYPES['EOS']
    account = account.toString() + `'`
    address_index = address_index.toString()
    let path = get_path_for_address(coin, account, address_index)
    let node = get_hd_node_from_path(hd_wallet, path)
    let private_key = private_to_eos_private(node._privateKey)
    let _account = get_account_at_node(node)
    return {
        account: _account,
        private_key,
        sign,
        recover_signature
    }
}

module.exports = {
    get_account_at_node,
    get_account_at_index
}