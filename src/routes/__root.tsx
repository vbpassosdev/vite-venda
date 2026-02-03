import "../index.css";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  ),

  notFoundComponent: () => (
  <div>
    <h2>404</h2>
    <p>Ops! Página não encontrada</p>
    <a href="/">Voltar para o início</a>
  </div>
),
});