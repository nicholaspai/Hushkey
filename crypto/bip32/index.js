/**
 * Imports
 */

// Implementation of BIP32: HD Wallets
const hdkey = require('hdkey')
// BIP32 master seed phrase generation and associated mnemonic
const bip39 = require('bip39') 

/**
 * Internal Methods
 */
const generate_master_mnemonic = () => {
    // @dev: default entropy strength is 128 (max is 512), BIP32 recommends 256, must be a multiple of 8
    try {
        const mnemonic = bip39.generateMnemonic(strength=256)
        return mnemonic 
    } catch (err) {
        throw new Error(`Generate BIP39 mnemonic:`,err)
    }
}

/**
 * External Methods
 */

const generate_hd_wallet = () => {
    try {
        let new_mnemonic = generate_master_mnemonic()
        let seed_buffer = bip39.mnemonicToSeedSync(new_mnemonic)
        let hd_wallet = hdkey.fromMasterSeed(seed_buffer)
        return hd_wallet    
    } catch (err) {
        throw new Error(`Generate BIP32 HD wallet:`,err)
    }
}
const get_hd_node_from_path = (hd_wallet, bip_44_path) => {
    try {
        let child_node = hd_wallet.derive(bip_44_path)
        return child_node
    } catch (err) {
        throw new Error(`Could not generate HD key from path ${bip_44_path}:`,err)
    }
}

module.exports = {
    generate_hd_wallet,
    get_hd_node_from_path,
    get_hd_node_from_path
}

/**
 * Main
 */
// @debug Test imports:
const COIN_TYPES = require('../bip44/cointypes')
const { get_path_for_address } = require('../bip44/path')
const { get_account_at_node: eos_get_account_at_node } = require('../eos')
const { private_to_eos_private } = require('../eos/utils')
const { get_account_at_node: eth_get_account_at_node } = require('../eth')
const { get_account_at_node: trx_get_account_at_node } = require('../trx')

const main = async () => {
    // Generate master wallet
    let new_wallet = generate_hd_wallet()
    // console.log(new_wallet) 
    //@dev !!Never reveal new_wallet._privateKey or new_wallet._publicKey!!

    // Ethereum
    console.group(`\n**Ethereum`)
    let eth_path = get_path_for_address(
        COIN_TYPES['ETH'],
        account=`0'`,
        change=`0`,
        address_index=`0`
    )
    let eth_child_node = get_hd_node_from_path(new_wallet, eth_path)
    let eth_account = eth_get_account_at_node(eth_child_node)
    console.log(`- Ethereum account at child node:`, eth_account)
    let eth_priv_key = eth_child_node._privateKey.toString('hex')
    console.log(`- Ethereum private key:`, eth_priv_key)
    console.groupEnd()

    // EOS
    console.group(`\n**EOS`)
    let eos_path = get_path_for_address(
        COIN_TYPES['EOS'],
        account=`0'`,
        change=`0`,
        address_index=`0`
    )
    let eos_child_node = get_hd_node_from_path(new_wallet, eos_path)
    let eos_account = eos_get_account_at_node(eos_child_node)
    console.log(`- EOS account at child node:`, eos_account)
    let eos_priv_key = private_to_eos_private(eos_child_node._privateKey)
    console.log(`- EOS private key:`, eos_priv_key)
    console.groupEnd()

    // TRX
    console.group(`\n**TRX`)
    let trx_path = get_path_for_address(
        COIN_TYPES['TRX'],
        account=`0'`,
        change=`0`,
        address_index=`0`
    )
    let trx_child_node = get_hd_node_from_path(new_wallet, trx_path)
    let trx_account = trx_get_account_at_node(trx_child_node)
    console.log(`- TRX account at child node:`, trx_account)
    let trx_priv_key = eos_child_node._privateKey.toString('hex')
    console.log(`- TRX private key:`, trx_priv_key)
    console.groupEnd()

}
main()