const express = require('express');
const app = express();
const custodyRouter = require('./custody/Routes');

const port = 3001;

app.use('/custody', custodyRouter);

app.listen(port, () => console.log(`Custody server running on port ${port}`));
