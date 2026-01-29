import "../index.css";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen">
      <Outlet />
    </div>
  ),
  notFoundComponent: () => (
    <div className="p-6">
      <h2 className="text-xl font-bold">404</h2>
      <p>Página não encontrada</p>
    </div>
  ),
});
