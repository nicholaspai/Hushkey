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
        return {
            hd_wallet,
            seed_buffer
        }  
    } catch (err) {
        throw new Error(`Generate BIP32 HD wallet:`,err)
    }
}
const get_hd_wallet_from_master_seed = (seed_buffer) => {
    let hd_wallet = hdkey.fromMasterSeed(seed_buffer)
    return hd_wallet
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
    get_hd_wallet_from_master_seed,
    get_hd_node_from_path,
    get_hd_node_from_path
}