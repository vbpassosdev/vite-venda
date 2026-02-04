import { Link, useRouterState } from "@tanstack/react-router";
import { List, Star, User, ShoppingCart, Package } from "lucide-react";
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
       // { label: "Influenciadores", to: "/admin/influenciadores", icon: User },
       // { label: "Lista Influenciadores", to: "/admin/influenciadoreslist", icon: List },
        { label: "Clientes", to: "/admin/clientes", icon: User },
        { label: "Lista Clientes", to: "/admin/clienteslist", icon: List },
        { label: "Produtos", to: "/admin/produtos", icon: Package },
        { label: "Lista de Produtos", to: "/admin/produtoslist", icon: Star },
      ],
    },

    {
      title: "Vendas",
      items: [
        { label: "Pedidos", to: "/admin/pedidos", icon: ShoppingCart },
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
