const connectToCustodyDb = require('../../../util/connectToCustodyDb');
const Wallet = require('../../models/wallet');
connectToCustodyDb();

const storeMasterSeed = async (uuid, master_seed) => {
    const wallet = new Wallet({
        uuid: uuid,
        seed: master_seed,
        dateCreated: new Date(Date.now())
    });

    wallet.save((err) => {
        if (err) console.log(err);
        return "error";
    });
    return "Success";
}

module.exports = storeMasterSeed;