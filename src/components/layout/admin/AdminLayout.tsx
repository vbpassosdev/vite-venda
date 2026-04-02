import { useState } from "react";
import { SidebarMenu } from "./NavMain";
import { Bell, ChevronLeft, ChevronRight, Home, Menu, User, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [openMobile, setOpenMobile] = useState(false);
  const [openDesktop, setOpenDesktop] = useState(true);

  return (
    <div className="flex min-h-screen bg-[linear-gradient(180deg,#f4f7fb_0%,#eef5ff_100%)] text-slate-900">
      {openMobile ? (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 z-30 bg-slate-950/25 md:hidden"
          onClick={() => setOpenMobile(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 h-full border-r border-slate-200/70 bg-white/90 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur transition-all duration-300 ease-in-out md:static md:shadow-none ${
          openMobile ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 ${openDesktop ? "w-[290px]" : "md:w-[96px]"}`}
      >
        <div className="flex items-center justify-between p-4 md:hidden">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Menu</span>
          <button
            type="button"
            className="rounded-xl p-2 text-slate-600 hover:bg-slate-100"
            onClick={() => setOpenMobile(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <SidebarMenu />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-white/70 bg-white/75 px-4 py-4 backdrop-blur lg:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-2xl border border-slate-200 bg-white p-2 text-slate-600 shadow-sm md:hidden"
                onClick={() => setOpenMobile(true)}
              >
                <Menu className="h-5 w-5" />
              </button>

              <button
                type="button"
                className="hidden rounded-2xl border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:bg-slate-50 md:block"
                onClick={() => setOpenDesktop(!openDesktop)}
                title={openDesktop ? "Recolher menu" : "Expandir menu"}
              >
                {openDesktop ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Vendas fiscal</p>
                <h2 className="text-xl font-semibold text-slate-950">Emissao de boleto e NF-e</h2>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 shadow-sm transition hover:bg-slate-50"
                >
                  <Bell className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Usuario de vendas</p>
                    <p className="text-xs text-slate-500">Boletos, cobranca e NF-e</p>
                  </div>
                </div>

                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50"
                >
                  <Home className="h-4 w-4" />
                  Inicio
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}


