import {
  Transaction,
  SystemProgram,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js"
import walletKey from "./solana-wallet-key.json"

const from = Keypair.fromSecretKey(new Uint8Array(walletKey))

// Turbin3 public key
const to = new PublicKey("6SEg4Exnk9fgaw8krTPGDBJt6gFRNnipPni2odh66bq8")

// Solana devnet connection
const connection = new Connection("https://api.devnet.solana.com")

;(async () => {
  try {
    // Get balance of dev wallet
    const balance = await connection.getBalance(from.publicKey)

    // Create test transaction to calculate fees
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: balance,
        // lamports: LAMPORTS_PER_SOL / 100, // here as example of sending 0.01 SOL
      })
    )
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash("confirmed")
    ).blockhash
    transaction.feePayer = from.publicKey

    // Calculate exact fee rate to transfer entire SOL amount out of account minus fees
    const fee =
      (
        await connection.getFeeForMessage(
          transaction.compileMessage(),
          "confirmed"
        )
      ).value || 0

    // Remove our transfer instruction to replace it
    transaction.instructions.pop()

    // Now add the instruction back with correct amount of lamports
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: balance - fee,
        // lamports: LAMPORTS_PER_SOL / 100, // here as example of sending 0.01 SOL
      })
    )

    // Sign transaction, broadcast, and confirm
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      from,
    ])
    console.log(
      `Success! TX: https://explorer.solana.com/tx/${signature}?cluster=devnet`
    )
  } catch (e) {
    console.error(`Error: ${e}`)
  }
})()
