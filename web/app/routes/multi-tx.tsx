import { createFileRoute } from "@tanstack/react-router"

function RouteComponent() {
  return (
    <div>
      <div>test</div>
    </div>
  )
}

export const Route = createFileRoute("/multi-tx")({
  component: () => RouteComponent,
})
