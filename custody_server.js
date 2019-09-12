const express = require('express');
const app = express();
const custodyRouter = require('./custody/Routes');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config();

const port = (process.env.PORT_CUSTODY ? process.env.PORT_CUSTODY : 3000)

const _app = () => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(cors({
		origin: '*', // Be sure to switch to your production domain
		optionsSuccessStatus: 200
	}));
	
	app.use('/custody', custodyRouter);
	
	/**
	 *  Pre-Run Scripts
	 * 
	 * */
	const connectToCustodyDb = require('./util/connectToCustodyDb');
	
	// Connect to wallet custody DB
	connectToCustodyDb();
	
	/**
	 * Run
	 */
	app.listen(port, () => console.log(`Custody server running on port ${port}`));	
}

module.exports = _app
