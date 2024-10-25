## Create solana wallet address/key pair

```sh
cargo test keygen -- --nocapture
```

## Airdrop some SOL into that wallet

> it expects there to be `solana-wallet-key.json` file present with the key

```sh
cargo test airdrop -- --nocapture
```
