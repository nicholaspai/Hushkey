import axios from 'axios'

const ENDPOINT = 'https://carbon-market-maker.herokuapp.com/api/'

export const getQuote = async (base, quote) => {
    let method = `quotes?base=${base}&quote=${quote}`
    let url = ENDPOINT + method
    let headers = {
        'api_secret': 'gr4ac3fullyrepeg$',
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    try {
        let response = await axios.get(url, {headers})
        return response.data    
    } catch (err) {
        console.error(`beta.katechon.world:`,err)
    }
}