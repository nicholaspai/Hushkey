// General imports
const fs = require('fs')

// Global pre-run setup
const NET = 'Ropsten'

// Web3
const web3 = require('./web3')

// Aztec imports
const aztecContractAddresses = require('@aztec/contract-addresses')
const networkIdMap = aztecContractAddresses.NetworkId // Map network-name to network-id
const aztecContractArtifacts = require('@aztec/contract-artifacts')

// Contract ABI's
const CUSDABI = JSON.parse(fs.readFileSync('./aztec/artifacts/MetaToken.json'))['abi']

// Load addresses
const availableAddresses = aztecContractAddresses.getContractAddressesForNetwork(networkIdMap[NET])
const contractAddresses = require('./address_book').contracts
const CusdAddress = contractAddresses['CUSD_ROPSTEN']
const ZKAssetAddress = contractAddresses['ZK20_ROPSTEN']

// Load contracts
const AceContract = new web3.eth.Contract(aztecContractArtifacts.ACE.abi, availableAddresses.ACE)
const CusdContract = new web3.eth.Contract(CUSDABI, CusdAddress)
const ZKAssetContract = new web3.eth.Contract(aztecContractArtifacts.ZkAsset.abi, ZKAssetAddress)

module.exports = {
    AceContract,
    CusdContract,
    ZKAssetContract
}
