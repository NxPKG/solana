import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { WalletButton } from "~/components/WalletButton"

function RouteComponent() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  return (
    <>
      <WalletButton setIsWalletModalOpen={setIsWalletModalOpen} />
    </>
  )
}

export const Route = createFileRoute("/wallet-connect")({
  component: () => <RouteComponent />,
})
