import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js"
import walletKey from "./solana-wallet-key.json"

const keypair = Keypair.fromSecretKey(new Uint8Array(walletKey))

const connection = new Connection("https://api.devnet.solana.com")
;(async () => {
  try {
    // claim 2 devnet SOL tokens
    const txhash = await connection.requestAirdrop(
      keypair.publicKey,
      2 * LAMPORTS_PER_SOL
    )
    console.log(
      `Success! TX: https://explorer.solana.com/tx/${txhash}?cluster=devnet`
    )
  } catch (e) {
    console.error(`Error: ${e}`)
  }
})()
