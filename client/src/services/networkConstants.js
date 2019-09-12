require('dotenv').config()

// const prod_endpoint = process.env.PROD_CLIENT_URL ? process.env.PROD_CLIENT_URL : `https://ethboston.herokuapp.com`
const local_endpoint = process.env.PORT_USER ? `http://localhost:${process.env.PORT_USER}` : `http://localhost:9999`

module.exports = {
    SERVER_ENDPOINT: local_endpoint
}