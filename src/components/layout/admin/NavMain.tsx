import { Link, useRouterState } from "@tanstack/react-router";
import { List, Star, User } from "lucide-react";
import { clsx } from "clsx";

type MenuItem = {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
};

export function SidebarMenu() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const menuItems: MenuItem[] = [
    { label: "Influenciadores", to: "/admin/influenciadores", icon: List },
    { label: "Influenciadores Lista", to: "/admin/influenciadoreslist", icon: Star },
    { label: "Clientes", to: "/admin/clientes", icon: User },
    { label: "Clientes Lista", to: "/admin/clienteslist", icon: List },
  ];

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  return (
    <>
      {/* Header */}
      <div className="sidebar-header">
        <h1 className="sidebar-title">Administração</h1>
      </div>

      {/* Nav Main */}
      <nav>
        {menuItems.map((item) => {
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
      </nav>
    </>
  );
}
