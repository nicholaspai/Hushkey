const Web3 = require('web3')
const providerName = (
    process.env.ALCHEMY_API_KEY ?
    `https://eth-ropsten.alchemyapi.io/jsonrpc/${process.env.ALCHEMY_API_KEY}` :
    `https://ropsten.infura.io/v3/aaabeab5d0e0425ca54de5f96af7451e`
)

const web3 = new Web3(providerName)

module.exports = web3