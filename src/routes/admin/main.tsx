import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/main')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bem-vindo ao painel administrativo</p>
    </div>
  )
}
