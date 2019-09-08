import axios from 'axios'

const ENDPOINT = 'http://localhost:3000/user/tx/'

export const getAddresses = async (chain, account) => {
    let method = `getAddresses`
    let url = ENDPOINT + method
    let data = {
        chain,
        account
    }
    try {
        let response = await axios.get(url, { data })
        return response.data    
    } catch (err) {
        console.error(`user/tx/getAddresses:`,err)
    }
}