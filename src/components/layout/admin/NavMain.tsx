import { Link, useRouterState } from "@tanstack/react-router"
import { Star } from "lucide-react"
import { clsx } from "clsx"

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
      <SidebarGroupLabel className="text-xs uppercase tracking-wide px-2 mb-2" 
        style={{ color: '#ec4899' }}>
        <h1 className="px-50">Administração</h1>
      </SidebarGroupLabel>

      <SidebarMenu className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.to)

          return (
            <SidebarMenuItem key={item.to}>
              <SidebarMenuButton 
                asChild 
                tooltip={item.label}
                isActive={active}
                className={clsx(
                  "gap-3",
                  active && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                )}
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