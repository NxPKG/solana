## Setup

```
bun i
```

## Create solana wallet address/key pair

```sh
# create solana wallet
bun keygen.ts

# it will give a wallet address like 9XH6NokH7FUfDp2pGZxNkhGKMx5pfRefxtB1EyJwYXCA
# and private key as [70,85,..]
# put this array of numbers which is private key of the wallet into file called `solana-wallet-key.json`
```

## Airdrop some SOL into that wallet

> it expects there to be `solana-wallet-key.json` file present with the key

```sh
bun airdrop.ts
```

## Send SOL to another wallet

```sh
bun transfer.ts
```

It will drain the wallet with the airdrop and put all the SOL on it into the address specified on this line:

```js
const to = new PublicKey("6SEg4Exnk9fgaw8krTPGDBJt6gFRNnipPni2odh66bq8")
```
