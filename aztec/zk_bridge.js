const aztec = require('aztec.js')
const { JoinSplitProof, note } = aztec
const secp256k1 = require('./@aztec/secp256k1')
const { AceContract, ZKAssetContract } = require('./contracts')

const web3 = require('./web3')

/**
 * INTERNAL METHODS
 */

// Construct JSProof
const construct_join_split_proof = (
    input_notes,
    output_notes,
    sender,
    public_value,
    public_owner,
    input_note_owners
) => {
    const proof = new JoinSplitProof(
        input_notes,
        output_notes,
        sender,
        public_value,
        public_owner
    )
    const proof_data = proof.encodeABI(ZKAssetContract.options.address)
    const signatures = proof.constructSignatures(
        ZKAssetContract.options.address,
        input_note_owners
    )
    return {
        proof,
        proof_data,
        signatures
    }
}

// Approve ACE to spend public value
const ace_public_approve = async (proof, public_value, eth_wallet) => {
    let data = AceContract.methods.publicApprove(
        ZKAssetContract.options.address, 
        proof.hash, 
        public_value
    )
    let txn = {
        to: AceContract.options.address,
        data: data.encodeABI()
    }
    let signed_txn = await eth_wallet.sign_transaction(
        txn,
        eth_wallet.private_key
    )
    let pending_hash = await web3.eth.sendSignedTransaction(
        signed_txn.rawTransaction
    )
    return pending_hash
}

// Execute AZTEC confidential transfer
const confidential_transfer = async (proof_data, signatures, eth_wallet) => {
    let data = ZKAssetContract.methods.confidentialTransfer(
        proof_data, 
        signatures
    )
    let txn = {
        to: ZKAssetContract.options.address,
        data: data.encodeABI()
    }
    let signed_txn = await eth_wallet.sign_transaction(
        txn,
        eth_wallet.private_key
    )
    let pending_hash = await web3.eth.sendSignedTransaction(
        signed_txn.rawTransaction
    )
    return pending_hash
}

/**
 * EXTERNAL METHODS
 */

// DEPOSIT public value to private value
const erc20_to_zk_notes = async (amount_to_deposit, eth_wallet) => {
    const depositor = secp256k1.accountFromPrivateKey(eth_wallet.private_key)
    const amount_of_notes = amount_to_deposit // @dev: Contrived, but create amount_to_deposit notes
    const deposit_public_value = -1*amount_to_deposit

    // Create notes
    let notes = []
    let amount_per_note = 1
    for (let i = 0; i < amount_of_notes; i++) {
        notes.push(await note.create(depositor.publicKey, amount_per_note))
    }

    // Construct Deposit proof
    let {
        proof,
        proof_data,
        signatures
    } = construct_join_split_proof(
        input_notes=[],
        output_notes=notes,
        sender=eth_wallet.account,
        public_value=deposit_public_value,
        public_owner=eth_wallet.account,
        input_note_owners=[]
    )

    // Approve ACE to spend public value
    let pending_hash_ace = await ace_public_approve(proof, deposit_public_value, eth_wallet)

    // Confidential Transfer
    let pending_hash_ct = await confidential_transfer(proof_data, signatures, eth_wallet)
    
    return {
        pending_hash_ace,
        pending_hash_ct,
        output_notes: notes
    }
}

// REDEEM private value to public value
const zk_notes_to_erc20 = async (notes_to_redeem, input_note_owners, amount_to_redeem, eth_wallet) => {
    const redeem_public_value = 1*amount_to_redeem

    // Create notes
    let notes = notes_to_redeem

    // Construct Withdraw proof
    let {
        proof,
        proof_data,
        signatures
    } = construct_join_split_proof(
        input_notes=notes,
        output_notes=[],
        sender=eth_wallet.account,
        public_value=redeem_public_value,
        public_owner=eth_wallet.account,
        input_note_owners=input_note_owners
    )

    // Confidential Transfer
    let pending_hash_ct = await confidential_transfer(proof_data, signatures, eth_wallet)

    return {
        pending_hash_ct
    }    
}

// TRANSFER private value to private value
const transfer_zk_notes = async (input_notes, input_note_owners, input_amount, amount_to_transfer, eth_wallet) => {
    let sender = secp256k1.accountFromPrivateKey(eth_wallet.private_key)
    let receiver = secp256k1.generateAccount()

    let notes = [
        await note.create(receiver.publicKey, amount_to_transfer),
        await note.create(sender.publicKey, input_amount-amount_to_transfer)
    ]

    // Construct Transfer proof
    let {
        proof,
        proof_data,
        signatures
    } = construct_join_split_proof(
        input_notes=input_notes,
        output_notes=notes,
        sender=eth_wallet.account,
        public_value=0,
        public_owner=eth_wallet.account,
        input_note_owners=input_note_owners
    )

    // Confidential Transfer
    let pending_hash_ct = await confidential_transfer(proof_data, signatures, eth_wallet)

    return {
        pending_hash_ct
    }    
}

module.exports = {
    erc20_to_zk_notes,
    zk_notes_to_erc20,
    transfer_zk_notes
}