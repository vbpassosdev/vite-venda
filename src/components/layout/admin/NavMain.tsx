import { Link, useRouterState } from "@tanstack/react-router";
import { List, Star, ShoppingCart } from "lucide-react";
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

export function SidebarMenu() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const menuGroups: MenuGroup[] = [
    {
      title: "Cadastros",
      items: [
        { label: "Empresa", to: "/admin/empresa", icon: Star },
        { label: "Lista de Clientes", to: "/admin/clienteslist", icon: List },
        { label: "Lista de Vendedores", to: "/admin/vendedoreslist", icon: List },      
        { label: "Lista de Produtos", to: "/admin/produtoslist", icon: List },        
      ],
    },

    {
      title: "Vendas",
      items: [
        { label: "Lista de Pedidos", to: "/admin/pedidoslist", icon: List },
      ],
    },
    
    {
      title: "Financeiro",
      items: [
        { label: "Lista de Títulos", to: "/admin/tituloslist", icon: ShoppingCart },
      ],
    },
  ];

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  return (
    <>
      {/* Header */}
      <div className="sidebar-header">
        <h1 className="sidebar-title">Administração</h1>
      </div>

      {/* Menu */}
      
      <nav className="sidebar-nav">
        {menuGroups.map((group) => (
          <div key={group.title} className="sidebar-group">
            <p className="sidebar-section-title">{group.title}</p>

            {group.items.map((item) => {
              const active = isActive(item.to);
              const Icon = item.icon;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={clsx("sidebar-item", active && "active")}
                >
                  <div className="sidebar-icon">
                    <Icon />
                  </div>

                  <span className="sidebar-label">{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </>
  );
}