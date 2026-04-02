import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/clienteslist')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/clienteslist"!</div>
}
