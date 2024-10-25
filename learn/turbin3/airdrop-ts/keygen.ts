import { Keypair } from "@solana/web3.js"
import bs58 from "bs58"

// Generate new keypair
let kp = Keypair.generate()

console.log(`You generated new Solana wallet.`)
console.log(`Address: ${kp.publicKey.toBase58()}`)
console.log(`Private key: [${kp.secretKey}]`)

// convert base58 to wallet (needed only for Phantom wallets)
function base58ToWallet(base58: string) {
  const wallet = bs58.decode(base58)
  return wallet
}
