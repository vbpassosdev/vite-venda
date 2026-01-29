import { Sidebar, SidebarContent, SidebarProvider } from "@/components/ui/sidebar";
import { NavMain } from "./NavMain";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <NavMain />
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
