import "../index.css";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  ),

  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#f7fafc_0%,#edf4ff_100%)] px-6">
      <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">Erro 404</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Pagina nao encontrada</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          O endereco acessado nao existe neste ambiente de vendas de boletos e NF-e.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          Voltar para o inicio
        </Link>
      </div>
    </div>
  ),
});


