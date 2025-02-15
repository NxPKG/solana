import { WalletName } from "@solana/wallet-adapter-base"
import { Wallet } from "@solana/wallet-adapter-react"
import { useCallback, useState } from "react"
import { useWalletMultiButton } from "@solana/wallet-adapter-base-ui"

export function CustomConnectButton() {
  const [walletModalConfig, setWalletModalConfig] = useState<Readonly<{
    onSelectWallet(walletName: WalletName): void
    wallets: Wallet[]
  }> | null>(null)
  const { buttonState, onConnect, onDisconnect, onSelectWallet } =
    useWalletMultiButton({
      onSelectWallet: setWalletModalConfig,
    })
  let label
  switch (buttonState) {
    case "connected":
      label = "Disconnect"
      break
    case "connecting":
      label = "Connecting"
      break
    case "disconnecting":
      label = "Disconnecting"
      break
    case "has-wallet":
      label = "Connect"
      break
    case "no-wallet":
      label = "Select Wallet"
      break
  }
  const handleClick = useCallback(() => {
    switch (buttonState) {
      case "connected":
        return onDisconnect
      case "connecting":
      case "disconnecting":
        break
      case "has-wallet":
        return onConnect
      case "no-wallet":
        return onSelectWallet
        break
    }
  }, [buttonState, onDisconnect, onConnect, onSelectWallet])
  return (
    <>
      <button
        disabled={
          buttonState === "connecting" || buttonState === "disconnecting"
        }
        onClick={handleClick}
      >
        {label}
      </button>
      {walletModalConfig ? (
        <div>
          {walletModalConfig.wallets.map((wallet) => (
            <button
              key={wallet.adapter.name}
              onClick={() => {
                walletModalConfig.onSelectWallet(wallet.adapter.name)
                setWalletModalConfig(null)
              }}
            >
              {wallet.adapter.name}
            </button>
          ))}
        </div>
      ) : null}
    </>
  )
}
