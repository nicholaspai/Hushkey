const ENDPOINT = 'https://cusd-faucet-server-ropsten.herokuapp.com/'
const web3 = require('./web3')
const axios = require('axios')

export const dripCusd = async (amount, address) => {
    let method = "api/faucet/minter"
    let url = ENDPOINT+method
    let post_data = {
        amount: web3.utils.toWei(amount.toString(), 'ether'),
        user: address
    }
    let response = await axios.post(url, post_data)
    return response.data
}

export const dripEth = async (amount, address) => {
    let method = "api/faucet/minter/eth"
    let url = ENDPOINT+method
    let post_data = {
        amount: web3.utils.toWei(amount.toString(), 'ether'),
        user: address
    }
    let response = await axios.post(url, post_data)
    return response.data
}