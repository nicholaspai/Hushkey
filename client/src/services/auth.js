import axios from 'axios'

const ENDPOINT = require('./networkConstants')['SERVER_ENDPOINT']

export const login = async (uuid, password) => {
    let method = `/user/auth/login`
    let url = ENDPOINT + method
    let data = {
        uuid,
        password
    }
    try {
        let response = await axios.post(url, data)
        return response.data    
    } catch (err) {
        console.error(`/user/auth/login:`,err)
    }
}