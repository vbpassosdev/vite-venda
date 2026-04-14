import { Link, useRouterState } from "@tanstack/react-router";
import {
  BadgeDollarSign,
  BarChart3,
  Boxes,
  FileText,
  LayoutDashboard,
  ReceiptText,
  ShoppingCart,
  Users,
  UserSquare2,
} from "lucide-react";
import { clsx } from "clsx";

type MenuItem = {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
};

type MenuGroup = {
  title: string;
  items: MenuItem[];
};

const menuGroups: MenuGroup[] = [
  {
    title: "Painel",
    items: [{ label: "Panorama", to: "/admin/main", icon: LayoutDashboard }],
  },
  {
    title: "Cadastros",
    items: [
      { label: "Clientes", to: "/admin/clienteslist", icon: Users },
      { label: "Vendedores", to: "/admin/vendedoreslist", icon: UserSquare2 },
      { label: "Produtos", to: "/admin/produtoslist", icon: Boxes },
    ],
  },
  {
    title: "Fluxos de vendas",
    items: [
      { label: "Pedidos", to: "/admin/pedidoslist", icon: ShoppingCart },
      { label: "Titulos", to: "/admin/tituloslist", icon: ReceiptText },
      { label: "Financeiro", to: "/admin/tituloslist", icon: BadgeDollarSign },
      { label: "NF-e", to: "/admin/produtoslist", icon: FileText },
    ],
  },
];

export function SidebarMenu() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  return (
    <div className="app-surface flex h-full flex-col px-4 py-5">
      <div className="app-card mb-6 p-5">
        <div className="flex items-center gap-3">
          <div className="app-icon-primary rounded-2xl p-3">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <p className="app-eyebrow">
              Vendas
            </p>
            <h1 className="text-lg font-semibold text-slate-900">Menu de acesso</h1>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          Navegue pelas telas de clientes, pedidos, titulos, boletos e NF-e.
        </p>
      </div>

      <nav className="flex-1 space-y-6">
        {menuGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.2em] app-text-muted">
              {group.title}
            </p>

            <div className="space-y-2">
              {group.items.map((item) => {
                const active = isActive(item.to);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={clsx(
                      "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition",
                      active
                        ? "bg-slate-900 text-white shadow-[0_18px_30px_rgba(15,23,42,0.22)]"
                        : "text-slate-600 hover:bg-white hover:text-slate-900",
                    )}
                  >
                    <span
                      className={clsx(
                        "rounded-xl p-2",
                        active ? "bg-white/10" : "bg-sky-50 text-sky-700",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}


