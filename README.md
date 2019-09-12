# Hushkey
## ETHBoston 2019 Hackathon 

A custody service enabling teams to efficiently share encryption and decryption ability without exposing secrets. 

Based on the [BIP44 hierarchy](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) for [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) HD wallets. 

Available coins in [BIP44 ](https://github.com/satoshilabs/slips/blob/master/slip-0044.md)

## Motivation:
Cryptocurrency application development teams need to be able to share the ability to sign encrypted messages. However, they do not need to share the encryption secrets themselves. 

This could be used to allow trusted parties to spend from wallets without giving access to the wallet away.

Our goal was to build a siloed, custody microservice that could provide cryptographic signing ability to team members. 

# Future work
- An inherent permission hierarchy in BIP44+ hierarchy, i.e. account-`0` can sign for account-`1/2/3/...`'s keys but not vice versa
- Sharded encryption of root secret
- Address whitelisting
- Transfer value limits

# Demo applications:
Sign AZTEC-based private transactions. Eventually, integrate an AZTEC mixer to the Ethereum wallet forcing all transactions to be private.

# How to start locally
## Requirements
- Enter secrets in a `.env` file, using the `.env.sample` as a template
- MongoDB username and password

## 1) Start the server & database to store wallets and users
- `node index` starts custody DB and user DB servers, edit ports in `.env.`

## 2) Start the client to view some accounts and sign demo transactions
- ### Build
- - `cd client && npm run build` to build the client website from `src/` into `build/`

- ### Run
- - `npm run start` to run the client in *dev* mode or `serve -s build` to run the prebuilt client
- - `edit server URL's to configure connection to custody DB and user DB servers`