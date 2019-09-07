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

const { get_path_for_address } = require('../bip44/path')
const COIN_TYPES = require('../bip44/cointypes')
const { get_hd_node_from_path } = require('../bip32/index')
const { sign, recover_signature } = require('./sign_data')
const get_account_at_index = (hd_wallet, address_index, account=0) => {
    let coin = COIN_TYPES['BTC']
    account = account.toString() + `'`
    address_index = address_index.toString()
    let path = get_path_for_address(coin, account, address_index)
    let node = get_hd_node_from_path(hd_wallet, path)
    let private_key = node._privateKey.toString('hex')
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
