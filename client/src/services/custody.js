import axios from 'axios'

const ENDPOINT = 'https://ethboston.herokuapp.com/user/tx/'

export const getAddresses = async (uuid, password, chain, account) => {
    let method = `addresses`
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
    let method =`signTx`
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