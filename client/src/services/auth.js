import axios from 'axios'

const ENDPOINT = 'https://ethboston.herokuapp.com/user/auth'

export const login = async (uuid, password) => {
    let method = `login`
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