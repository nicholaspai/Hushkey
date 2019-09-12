import axios from 'axios'

const ENDPOINT = require('./networkConstants')['SERVER_ENDPOINT']

export const getAddresses = async (uuid, password, chain, account) => {
    let method = `/user/tx/addresses`
    let url = ENDPOINT + method
    let data = {
        uuid,
        password,
        chain,
        account
    }
    try {
        let response = await axios.post(url, data)
        return response.data    
    } catch (err) {
        console.error(`user/tx/getAddresses:`,err)
    }
}

export const depositERC20IntoZk = async (amountToDeposit, uuid, password, account, chain, addressIndex) => {
    let method = `/user/tx/zkDeposit`
    let url = ENDPOINT + method
    let data = {
        uuid,
        password,
        amountToDeposit,
        path: {
            addressIndex,
            account,
            chain
        }
    }
    try {
        let response = await axios.post(url, data)
        return response.data    
    } catch (err) {
        console.error(`user/tx/getAddresses:`,err)
    }
}