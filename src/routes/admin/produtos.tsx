import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/produtos')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/Produtos"!</div>
}
