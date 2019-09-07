
// Fix Error: More than one instance of bitcore-lib found. Please make sure to require bitcore-lib
// and check that submodules do not also include their own bitcore-lib dependency.
Object.defineProperty(global, '_bitcore', { get(){ return undefined }, set(){} });

var Message = require('bitcore-message')
const bitcore = require('bitcore-lib')

// Source: https://github.com/bitpay/bitcore-lib/blob/master/docs/examples.md#import-an-address-via-wif
const sign = (data_to_sign, private_key) => {
    var privateKey = new bitcore.PrivateKey(private_key);
    const message = new Message(data_to_sign);
    const signature = message.sign(privateKey);
    return signature
}

const recover_signature = (signature, data_signed, address) => {
    let verified = new Message(data_signed).verify(address, signature)
    return verified
}

module.exports = {
    sign,
    recover_signature
}