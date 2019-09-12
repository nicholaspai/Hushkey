const Wallet = require('../../models/wallet');
/** 
 * Methods
 * - Internal
 */

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

const retrieveMasterSeed = async (uuid) => {
    try {
        const seed = await Wallet.find({uuid: uuid});
        return seed[0].seed;
    } catch (err) {
        console.log("Something broke retrieving master seed");
    }
}

module.exports = { 
    storeMasterSeed,
    retrieveMasterSeed
}