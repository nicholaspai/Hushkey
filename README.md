# ethboston

A wallet that abstracts private key custody from user. 

# Motivation:
Most web3 users eventually end up having to store many different private keys. "Private Key Managers" such as MetaMask are incomplete solutions because you cannot sign arbitrary data programmatically, even though they are convenient ways for humans to consolidate their private keys. 

# Crypto: 

A BIP-32 hierarchical deterministic wallet implementation with an API interface.

# Features
- Natural permission hierarchy
- Requirement to store only the master seed phrase not individual private keys

# Example applications:

AZTEC Extension for private transactions. A key-less, private wallet.

#TODO : AJ
    - Password salting and hashing
    - Only allow unique IDs in username selection
