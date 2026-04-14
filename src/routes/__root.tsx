import "../index.css";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="app-page">
      <Outlet />
    </div>
  ),

  notFoundComponent: () => (
    <div className="app-page flex min-h-screen items-center justify-center px-6">
      <div className="app-card-lg w-full max-w-md p-8 text-center">
        <p className="app-eyebrow">Erro 404</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Pagina nao encontrada</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          O endereco acessado nao existe neste ambiente de vendas de boletos e NF-e.
        </p>
        <Link
          to="/"
          className="app-btn app-btn-primary app-btn-md mt-6"
        >
          Voltar para o inicio
        </Link>
      </div>
    </div>
  ),
});


