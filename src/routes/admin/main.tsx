import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/main')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Bem-vindo ao painel administrativo</p>
    </div>
  )
}
