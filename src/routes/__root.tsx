import "../index.css";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  ),

  notFoundComponent: () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-2">
    <h2 className="text-7xl font-extrabold text-pink-500">404</h2>
    <p className="text-gray-600 text-lg">Ops! Página não encontrada</p>
    <a href="/" className="text-pink-600 hover:underline">
      Voltar para o início
    </a>
  </div>
),
});
