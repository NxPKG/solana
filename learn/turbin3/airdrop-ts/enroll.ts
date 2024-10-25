import { Connection, Keypair, PublicKey } from "@solana/web3.js"
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor"
import { IDL, type Turbin3Prereq } from "./programs/Turbin3_prereq"
import walletKey from "./programs/Turbin3-wallet-key.json"

const keypair = Keypair.fromSecretKey(new Uint8Array(walletKey))

const connection = new Connection("https://api.devnet.solana.com")

const github = Buffer.from("nxpkg", "utf8")

const provider = new AnchorProvider(connection, new Wallet(keypair), {
  commitment: "confirmed",
})

const program: Program<Turbin3Prereq> = new Program(IDL, provider)

// Create PDA for enrollment account
const enrollment_seeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()]
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(
  enrollment_seeds,
  program.programId
)

// Execute enrollment transaction
;(async () => {
  try {
    const txhash = await program.methods
      .complete(github)
      .accounts({
        signer: keypair.publicKey,
      })
      .signers([keypair])
      .rpc()
    console.log(
      `Success! TX: https://explorer.solana.com/tx/${txhash}?cluster=devnet`
    )
  } catch (e) {
    console.error(`Error: ${e}`)
  }
})()
