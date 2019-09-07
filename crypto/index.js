// Exports

// HD Wallet
const { generate_hd_wallet } = require('./bip32')

// Ethereum
const { get_account_at_index: eth_get_account_at_index } = require('./eth') 

// EOS
const { get_account_at_index: eos_get_account_at_index } = require('./eos') 

// BTC
const { get_account_at_index: btc_get_account_at_index } = require('./btc') 

// TRX
const { get_account_at_index: trx_get_account_at_index } = require('./trx') 

module.exports = {
    generate_hd_wallet,
    eth_get_account_at_index,
    eos_get_account_at_index,
    btc_get_account_at_index,
    trx_get_account_at_index
}