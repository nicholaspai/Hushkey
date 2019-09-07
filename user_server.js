const express = require('express');
const app = express();
const userRouter = require('./user/Routes');

const port = 3000;

app.use('/user', userRouter);

app.listen(port, () => console.log(`User server running on port ${port}`));
