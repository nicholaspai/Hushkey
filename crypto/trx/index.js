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

const { get_path_for_address } = require('../bip44/path')
const COIN_TYPES = require('../bip44/cointypes')
const { get_hd_node_from_path } = require('../bip32/index')
const get_account_at_index = (hd_wallet, address_index, account=0) => {
    let coin = COIN_TYPES['TRX']
    account = account.toString() + `'`
    address_index = address_index.toString()
    let path = get_path_for_address(coin, account, address_index)
    let node = get_hd_node_from_path(hd_wallet, path)
    let private_key = node._privateKey.toString('hex')
    let _account = get_account_at_node(node)
    return {
        account: _account,
        private_key
    }
}

module.exports = {
    get_account_at_node,
    get_account_at_index
}