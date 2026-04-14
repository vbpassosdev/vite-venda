import { useState } from "react";
import { SidebarMenu } from "./NavMain";
import { Bell, ChevronLeft, ChevronRight, Home, Menu, User, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [openMobile, setOpenMobile] = useState(false);
  const [openDesktop, setOpenDesktop] = useState(true);

  return (
    <div className="app-page flex min-h-screen">
      {openMobile ? (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 z-30 bg-slate-950/25 md:hidden"
          onClick={() => setOpenMobile(false)}
        />
      ) : null}

      <aside
        className={`app-shell-panel fixed inset-y-0 left-0 z-40 h-full border-r transition-all duration-300 ease-in-out md:static md:shadow-none ${
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
                className="app-btn app-btn-outline app-btn-icon md:hidden"
                onClick={() => setOpenMobile(true)}
              >
                <Menu className="h-5 w-5" />
              </button>

              <button
                type="button"
                className="app-btn app-btn-outline app-btn-icon hidden md:inline-flex"
                onClick={() => setOpenDesktop(!openDesktop)}
                title={openDesktop ? "Recolher menu" : "Expandir menu"}
              >
                {openDesktop ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>

              <div>
                <p className="app-eyebrow">Vendas fiscal</p>
                <h2 className="text-xl font-semibold text-slate-950">Emissao de boleto e NF-e</h2>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="app-btn app-btn-outline app-btn-icon"
                >
                  <Bell className="h-5 w-5" />
                </button>

                <div className="app-card flex items-center gap-3 rounded-2xl px-3 py-2 shadow-sm">
                  <div className="app-avatar-accent flex h-10 w-10 items-center justify-center rounded-2xl">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Usuario de vendas</p>
                    <p className="text-xs text-slate-500">Boletos, cobranca e NF-e</p>
                  </div>
                </div>

                <Link
                  to="/"
                  className="app-btn app-btn-outline app-btn-md shadow-sm"
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


