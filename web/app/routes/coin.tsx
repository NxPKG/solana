import { createFileRoute } from "@tanstack/react-router"
import { CustomConnectButton } from "~/components/CustomConnectButton"

function RouteComponent() {
  return (
    <>
      {/* <button onClick={() => {}}>Buy 5$ coin</button> */}
      <CustomConnectButton />
    </>
  )
}

export const Route = createFileRoute("/coin")({
  component: () => <RouteComponent />,
})
