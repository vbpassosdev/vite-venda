import { useState } from "react"
import { SidebarMenu } from "./NavMain"
import { Bell, User, Menu, X } from "lucide-react"

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      
      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-40
          h-full w-64 shrink-0
          bg-white border-r
          transform transition-transform
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex justify-between items-center p-4 md:hidden">
          <span className="font-semibold">Admin</span>
          <button onClick={() => setOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <SidebarMenu />
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0">
        
        {/* Header */}
        <header className="sticky top-0 z-20 h-14 px-4 flex items-center justify-between border-b bg-white">
          <button
            className="md:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          <span className="font-semibold">
            Administração
          </span>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded hover:bg-muted">
              <Bell className="w-5 h-5" />
            </button>

            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>

      </div>
    </div>
  )
}
