import { Link, useRouterState } from "@tanstack/react-router";
import { Star, User, Sparkles } from "lucide-react";
import { clsx } from "clsx";

type MenuItem = {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
};

export function SidebarMenu() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const menuItems: MenuItem[] = [
    { label: "Influenciadores", to: "/admin/influenciadores", icon: Sparkles },
    { label: "Lista Influenciadores", to: "/admin/influenciadoreslist", icon: Star },
    { label: "Clientes", to: "/admin/clientes", icon: User },
    { label: "Lista Clientes", to: "/admin/clienteslist", icon: Star },
  ];

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  return (
    <aside className="sidebar-floral">
      {/* HEADER */}
      <div className="sidebar-header-floral">
        <div className="sidebar-avatar">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h1 className="sidebar-title-floral">Administração</h1>
          <span className="sidebar-subtitle">Painel Master</span>
        </div>
      </div>

      {/* NAV MAIN */}
      <nav>
        {menuItems.map((item) => {
          const active = isActive(item.to);
          const Icon = item.icon;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={clsx("sidebar-item-floral", active && "active")}
            >
              <div className="sidebar-icon-floral">
                <Icon />
              </div>

              <span className="sidebar-label-floral">{item.label}</span>

              {item.badge && (
                <span className="sidebar-badge">{item.badge}</span>
              )}

              {active && <span className="sidebar-glow" />}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <footer className="sidebar-footer-floral">
        <span className="footer-text">Lavender UI ✨</span>
      </footer>
    </aside>
  );
}
