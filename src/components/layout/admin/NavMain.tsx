import { Link, useRouterState } from "@tanstack/react-router"
import { Star } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`)

  const menuItems = [
    {
      label: "Influenciadores",
      to: "/admin/influenciadores",
      icon: Star,
    },
    {
      label: "Clientes",
      to: "/admin/clientes",
      icon: Star,
    },
  ]

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Administração</SidebarGroupLabel>

      <SidebarMenu>
        {menuItems.map((item) => {
          const Icon = item.icon

          return (
            <SidebarMenuItem key={item.to}>
              <SidebarMenuButton
                asChild
                tooltip={item.label}
                isActive={isActive(item.to)}
              >
                <Link to={item.to}>
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
