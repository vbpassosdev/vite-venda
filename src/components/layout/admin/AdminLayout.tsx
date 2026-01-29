import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { NavMain } from "./NavMain"
import { Separator } from "@/components/ui/separator"

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
   

      <SidebarInset>
        <header className="flex h-12 items-center gap-2 px-4 border-b">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm font-medium">Admin</span>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </SidebarInset>


         <Sidebar>
        <SidebarContent>
          <NavMain />
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
