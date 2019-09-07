/**
 * Main
 */
// @debug Test imports:
const cryptomodule = require('./index')
// const { get_account_at_node: eos_get_account_at_node } = require('../eos')
// const { sign: eos_sign, recover_signature: eos_recover_signature } = require('../eos/sign_data')
// const { private_to_eos_private } = require('../eos/utils')
// const { get_account_at_node: eth_get_account_at_node } = require('../eth')
// const { sign: eth_sign, recover_signature: eth_recover_signature } = require('../eth/sign_data')
// const { get_account_at_node: trx_get_account_at_node } = require('../trx')
// const { get_account_at_node: btc_get_account_at_node } = require('../btc')
// const { sign: btc_sign, recover_signature: btc_recover_signature } = require('../btc/sign_data')

const main = async () => {
    // Generate master wallet
    let new_wallet = cryptomodule.generate_hd_wallet()
    let master_seed = new_wallet.seed_buffer.toString('hex')
    let master_node = new_wallet.hd_wallet
    console.log(`Master seed from which the wallet is derived: ${master_seed}`) 
    // //@dev !!Never reveal master_node._privateKey or master_node._publicKey!!

    const TEST_MESSAGE = "Hello, I am Nick"

    // Ethereum
    console.group(`\n**Ethereum`)
    let eth_account = cryptomodule.eth_get_account_at_index(master_node, 0, 0)
    console.log(`- Ethereum account at child node:`, eth_account.account)
    let eth_priv_key = `0x`+eth_account.private_key
    console.log(`- Ethereum private key:`, eth_priv_key)
    let eth_sig = eth_account.sign(TEST_MESSAGE, eth_priv_key)
    console.log(`- Ethereum signature:`, eth_sig.signature)
    let eth_recover = eth_account.recover_signature(eth_sig, TEST_MESSAGE)
    console.log(`- Ethereum recovered signature:`, eth_recover)
    console.groupEnd()

    // EOS
    console.group(`\n**EOS`)
    let eos_account = cryptomodule.eos_get_account_at_index(master_node, 0, 0)
    console.log(`- EOS account at child node:`, eos_account.account)
    let eos_priv_key = eos_account.private_key
    console.log(`- EOS private key:`, eos_priv_key)
    let eos_sig = eos_account.sign(TEST_MESSAGE, eos_priv_key)
    console.log(`- EOS signature:`, eos_sig)
    let eos_recover = eos_account.recover_signature(eos_sig, TEST_MESSAGE)
    console.log(`- EOS recovered signature:`, eos_recover)
    console.groupEnd()

    // TRX
    console.group(`\n**TRX`)
    let trx_account = cryptomodule.trx_get_account_at_index(master_node, 0, 0)
    console.log(`- TRX account at child node:`, trx_account.account)
    let trx_priv_key = trx_account.private_key
    console.log(`- TRX private key:`, trx_priv_key)
    console.groupEnd()

    // BTC
    console.group(`\n**BTC`)
    let btc_account = cryptomodule.btc_get_account_at_index(master_node, 0, 0)
    console.log(`- BTC account at child node:`, btc_account.account)
    let btc_priv_key = btc_account.private_key
    console.log(`- BTC private key:`, btc_priv_key)
    let btc_sig = btc_account.sign(TEST_MESSAGE, btc_priv_key)
    console.log(`- BTC signature:`, btc_sig)
    let btc_recover = btc_account.recover_signature(btc_sig, TEST_MESSAGE, btc_account.account)
    console.log(`- BTC recovered signature:`, btc_recover)
    console.groupEnd()
    
}
main()