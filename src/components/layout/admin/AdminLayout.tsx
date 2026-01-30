import { SidebarMenu } from "./NavMain";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className="w-64 flex flex-col p-4 border-r rounded-(--radius)"
        style={{
          backgroundColor: "hsl(var(--sidebar))",
          borderColor: "hsl(var(--sidebar-border))",
        }}
      >
        <h1
          className="text-lg font-bold mb-6"
          style={{ color: "hsl(var(--primary))" }}
        >
          Nome da Empresa
        </h1>
        <SidebarMenu />
      </aside>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col">
        <header className="flex h-12 items-center gap-2 px-4 border-b">
          <button className="px-2 py-1 rounded bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
            Menu
          </button>
          <span className="text-sm font-medium">Admin</span>
        </header>

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
