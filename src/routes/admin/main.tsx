import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/main')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/main"!</div>
}
