const mongoose = require('mongoose');

var walletSchema = new mongoose.Schema({
    uuid: String,
    seed: String,
    dateCreated: String
});

module.exports = mongoose.model('Wallet', walletSchema, 'wallet');