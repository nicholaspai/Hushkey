const express = require('express');
const app = express();
const custodyRouter = require('./custody/Routes');
const bodyParser = require('body-parser');
const cors = require('cors')

const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cors({
	origin: '*', // Be sure to switch to your production domain
	optionsSuccessStatus: 200
}));

app.use('/custody', custodyRouter);



app.listen(port, () => console.log(`Custody server running on port ${port}`));
