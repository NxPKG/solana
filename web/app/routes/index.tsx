import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { WalletButton } from "~/components/WalletButton"

function RouteComponent() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  return (
    <>
      {/* TODO: breaking, is not same as in https://github.com/jup-ag/terminal */}
      <WalletButton setIsWalletModalOpen={setIsWalletModalOpen} />
    </>
  )
}

export const Route = createFileRoute("/")({
  component: RouteComponent,
})
