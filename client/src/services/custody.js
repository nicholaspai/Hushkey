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

export const signTx = async (uuid, password, transaction, chain, account, addressIndex) => {
    let method =`/user/tx/signTx`
    let url = ENDPOINT + method
    let data = {
        uuid,
        password,
        transaction,
        path: {
            addressIndex,
            chain,
            account
        }
    }
    try {
        let response = await axios.post(url, data)
        return response.data    
    } catch (err) {
        console.error(`user/tx/signTx:`,err)
    }

}