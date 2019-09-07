var createHash = require('create-hash')
var bs58check = require('bs58check')

const public_to_public = (pub_key_bytes) => {
    const sha256_hash = createHash('sha256').update(pub_key_bytes).digest()
    const rmd160_hash = createHash('rmd160').update(sha256_hash).digest()
    
    var new_buffer = Buffer.allocUnsafe(21)
    // Add version byte in front of RIPEMD-160 hash 
    // (0x00 for mainnet, 0x6f for testnet)
    new_buffer.writeUInt8(0x00, 0)
    rmd160_hash.copy(new_buffer, 1) //new_buffer now holds the extended RIPMD-160 result
    const base58_check = bs58check.encode(new_buffer)
    return base58_check
}

module.exports = {
    public_to_public
}