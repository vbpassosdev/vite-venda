import { Link, useRouterState } from "@tanstack/react-router";
import { Star } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isActiveInfluenciadores =
    pathname === "/admin/influenciadores" ||
    pathname.startsWith("/admin/influenciadores/");

  const isActiveClientes = pathname.startsWith("/admin/clientes");

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Administração</SidebarGroupLabel>

      <SidebarMenu>
        <SidebarMenuItem asChild>
          <Link to="/admin/influenciadores">
            <SidebarMenuButton isActive={isActiveInfluenciadores} tooltip="Influenciadores">
              <Star className="size-4" />
              <span>Influenciadores</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>

        <SidebarMenuItem asChild>
          <Link to="/admin/clientes">
            <SidebarMenuButton isActive={isActiveClientes} tooltip="Clientes">
              <Star className="size-4" />
              <span>Clientes</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
