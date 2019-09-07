// We define the following 5 levels in BIP32 path:
// m / purpose' / coin_type' / account' / change / address_index
// Apostrophe in the path indicates that BIP32 hardened derivation is used.
// Each level has a special meaning, described in the chapters below.

const get_path_for_address = (cointype, account=`0'`, address_index=`0`) => {
    return `m/44'/${cointype}/${account}/0/${address_index}`
}

module.exports = {
    get_path_for_address
}