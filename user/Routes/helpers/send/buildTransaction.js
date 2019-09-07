const web3 = require('../../../../aztec/web3');

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
            const response = await buildEthTransaction(txInfo);
            if (!(response.success)) return "Error building transaction";
            return response;
        case "EOS":
            // build and return EOS transaction
            break;
        case "TRX":
            // build and return TRX transaction
            break;
    }
}

/* ETH */

const buildEthTransaction = (txInfo) => {
    try {
        const addressTo = txInfo.addressTo;
        const quantity = txInfo.quantity;
        //const contactData = txInfo.contactData; //data
        const transactionObj = {
            "to": addressTo,
            "value": web3.utils.toWei(quantity, 'ether'),
        }
        return {success: true, transaction: transactionObj}
    } catch (err) {
        console.log(err);
        return {success: false, message: "Malformed params"}
    }
};

module.exports = { 
    buildTransaction
}