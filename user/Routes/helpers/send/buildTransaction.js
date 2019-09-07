const TronWeb = require('tronweb');
const BigNumber = require('bignumber.js');
const Web3 = require('web3');
const { getCurrentGasPrices } = require('./getCurrentGasPrices.js');

require('dotenv').config();

// // tron
// const HttpProvider = TronWeb.providers.HttpProvider;
// const TRON_NODE_URL = PROD ? 'https://api.trongrid.io' : 'https://api.shasta.trongrid.io';
// const fullNode = new HttpProvider(TRON_NODE_URL);
// const solidityNode = new HttpProvider(TRON_NODE_URL);
// const eventServer = TRON_NODE_URL;
// const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);

// eth
const networkToUse = (
    process.env.ALCHEMY_API_KEY 
    ? `https://eth-ropsten.alchemyapi.io/jsonrpc/${process.env.ALCHEMY_API_KEY}` 
    : `https://ropsten.infura.io/v3/aaabeab5d0e0425ca54de5f96af7451e`
)

const buildTransaction = async (chain, txInfo) => {
    switch(chain) {
        case "BTC":
            // build and return BTC transaction
            break;
        case "ETH":
            console.log("Building Eth transaction...");
            const response = await buildEthTransaction(txInfo);
            if (!(response.success)) return "Error building transaction";
            return response.tx;
        case "EOS":
            // build and return EOS transaction
            break;
        case "TRX":
            // build and return TRX transaction
            break;
    }
}

/* ETH */
// const buildEthTransaction = async (txInfo) => {
//     try {
//         var sendAddr = txInfo.addressFrom;
//         var recvAddr = txInfo.addressTo;
//         var quantity = txInfo.quantity;
//     } catch (err) {
//         return {success: false, messasge: "Malformed params"}
//     }
//     const pricesObj = await getCurrentGasPrices();
	
// 	if (!pricesObj.success) {
// 		return {success: false, message: 'getCurrentGasPrices error', error: pricesObj.err};
// 	}
// 	const gasPrices = pricesObj.prices;

// 	web3HTTP.eth.defaultAccount = sendAddr;
// 	try {
// 		const nonce = await web3HTTP.eth.getTransactionCount(web3HTTP.eth.defaultAccount, 'pending');
// 		const weiAmount = new BigNumber(quantity).times(new BigNumber(1000000000000000000)).toFixed(0);

//         console.log(sendAddr);
//         console.log(recvAddr);
//         console.log(web3HTTP.utils.toHex(weiAmount));
//         console.log(web3HTTP.utils.toHex(gasPrices.medium * 1000000000));
//         console.log(nonce);
//         console.log(chain_id);
// 		const details = {
// 			to: recvAddr,
// 			value: web3HTTP.utils.toHex(weiAmount),
// 			gas: web3HTTP.utils.toHex(21000),
// 			gasPrice: web3HTTP.utils.toHex(gasPrices.medium * 1000000000), // converts the gwei price to wei
// 		};
// 		return {success: true, tx: details};

// 	} catch (err) {
// 		console.log('buildEthTransaction: ' + err);
// 		return {success: false, message: 'error getting transaction count', error: err};
// 	}
// };

module.exports = { 
    buildTransaction
}