const web3 = require('./web3')
export const getBalanceEth = async (address) => {
    try {
        let rawBalance = await web3.eth.getBalance(address)
        return web3.utils.fromWei(rawBalance.toString(), 'ether')    
    } catch (err) {
        return 0
    }
}

const { rpc } = require('./eosjs')
export const getBalanceEos = async (address) => {
    // try {
    //     // FIXME: EOS can only read balances of ACCOUNTS not addresses, need to build this mapping in the future (and maybe seed free accoutns for users?)
    //     let account = getAccountFromAddress(address)
    //     let result = await rpc.get_table_rows({
    //         "code": "eosio.token",
    //         "scope": account,
    //         "table": "accounts"
    //     })
    //     for (let i = 0; i < result.rows.length; i++){
    //         if (result.rows[i].balance.split(" ")[1] === "EOS"){
    //             return result.rows[i].balance.split(" ")[0]
    //         }
    //     }    
    // } catch (err) {
        return 0
    // }
}

const tronWeb = require('tronweb')
export const getBalanceTrx = async (address) => {
    try {
        return await tronWeb.trx.getBalance(address)
    } catch (err) {
        return 0
    }
}

// TODO:
export const getBalanceBtc = async (address) => {
    return 0
}

const { CusdContract } = require('./getContract')
export const getBalanceCusd = async (address) => {
    let balance = await CusdContract.methods.balanceOf(address).call()
    return web3.utils.fromWei(balance.toString(), 'ether')
}

