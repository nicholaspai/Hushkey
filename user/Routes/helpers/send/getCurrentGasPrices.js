const axios = require('axios');

const getCurrentGasPrices = async () => {
    try {
		let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json');
		let prices = {
			low: response.data.safeLow / 10,
			medium: response.data.average / 10,
			high: response.data.fast / 10
		};
		return {success: true, prices};
	} catch (err) {
		console.log('getCurrentGasPrices: ' + err);
		return {success: false, error: err};
	}
}

module.exports = {
    getCurrentGasPrices
}