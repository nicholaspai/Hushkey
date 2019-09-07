const aztec = require('aztec.js')
const { JoinSplitProof, note } = aztec
const secp256k1 = require('@aztec/secp256k1')
const { AceContract, ZKAssetContract } = require('./contracts')

const web3 = require('./web3')

const erc20_to_zk_notes = async (amount_to_deposit, eth_wallet) => {
    const depositor = secp256k1.accountFromPrivateKey(eth_wallet.private_key)
    const public_value = -1*amount_to_deposit

    let notes = [ await note.create(depositor.publicKey, amount_to_deposit)]

    // Construct JS proof
    const input_notes = []
    const output_notes = notes
    const sender = eth_wallet.account
    const public_owner = sender
    const proof = new JoinSplitProof(
        input_notes, 
        output_notes, 
        sender, 
        public_value, 
        public_owner
    )
    const proof_data = proof.encodeABI(ZKAssetContract.options.address)
    const input_note_owners = []
    signatures = proof.constructSignatures(
        ZKAssetContract.options.address, 
        input_note_owners
    )

    // Approve ACE to spend public value
    let txn_data = AceContract.methods.publicApprove(
        ZKAssetContract.options.address, 
        proof.hash, 
        public_value
    )
    let txn = {
        to: AceContract.options.address,
        data: txn_data.encodeABI()
    }
    let signed_txn = await eth_wallet.sign_transaction(
        txn,
        eth_wallet.private_key
    )
    let pending_hash = await web3.eth.sendSignedTransaction(
        signed_txn.rawTransaction
    )

    // Confidential Transfer
    let ct_txn_data = ZKAssetContract.methods.confidentialTransfer(
        proof_data, 
        signatures
    )
    let ct_txn = {
        to: ZKAssetContract.options.address,
        data: ct_txn_data.encodeABI()
    }
    let signed_ct_txn = await eth_wallet.sign_transaction(
        ct_txn,
        eth_wallet.private_key
    )
    let pending_ct_hash = await web3.eth.sendSignedTransaction(
        signed_ct_txn.rawTransaction
    )
    
    return {
        ace_public_approve_hash: pending_hash,
        zk_confidential_transfer_hash: pending_ct_hash,
        output_notes
    }
}

module.exports = {
    erc20_to_zk_notes
}