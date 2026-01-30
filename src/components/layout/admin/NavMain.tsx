import { Link, useRouterState } from "@tanstack/react-router";
import { Star } from "lucide-react";
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
    { label: "Influenciadores", to: "/admin/influenciadores", icon: Star },
    { label: "Clientes", to: "/admin/clientes", icon: Star },
  ];

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  return (
    <aside
      className="flex flex-col w-64 p-4 border-r rounded-(--radius)"
      style={{
        backgroundColor: "hsl(var(--sidebar))",
        borderColor: "hsl(var(--sidebar-border))",
      }}
    >
      <h1
        className="text-lg font-bold mb-6"
        style={{ color: "hsl(var(--primary))" }}
      >
        Administração
      </h1>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const active = isActive(item.to);
          const Icon = item.icon;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-(--radius) transition-colors duration-200",
                active
                  ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                  : "text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-hover))] hover:text-[hsl(var(--primary-foreground))]"
              )}
            >
              <Icon className="w-5 h-5 text-[hsl(var(--sidebar-icon))]" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
