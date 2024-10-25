import { get, create } from "ronin"

async function main() {
  const newCoin = await create.coin.with({
    aAddress: "6SEg4Exnk9fgaw8krTPGDBJt6gFRNnipPni2odh66bq1",
    bAddress: "6SEg4Exnk9fgaw8krTPGDBJt6gFRNnipPni2odh66bq2",
    cAddress: "6SEg4Exnk9fgaw8krTPGDBJt6gFRNnipPni2odh66bq3",
    dAddress: "6SEg4Exnk9fgaw8krTPGDBJt6gFRNnipPni2odh66bq4",
  })
  console.log(newCoin)
}

await main()
