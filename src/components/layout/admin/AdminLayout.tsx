import { useState } from "react"
import { SidebarMenu } from "./NavMain"
import { Bell, User, Menu, X, ChevronLeft, ChevronRight } from "lucide-react"

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [openMobile, setOpenMobile] = useState(false)
  const [openDesktop, setOpenDesktop] = useState(true)

  return (
    <div className="flex h-screen overflow-hidden">
      
      {/* Overlay mobile */}
      {openMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setOpenMobile(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-40
          h-full bg-white shrink-0
          transform transition-all duration-300 ease-in-out
          ${openMobile ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${openDesktop ? "md:w-64" : "md:w-0 md:overflow-hidden"}
        `}
      >
        <div className="flex justify-between items-center p-4 md:hidden">
          <span className="font-semibold">Admin</span>
          <button onClick={() => setOpenMobile(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <SidebarMenu />
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0">
        
        {/* Header */}
        <header className="sticky top-0 z-20 h-14 px-4 flex items-center justify-between bg-white border-b">
          <div className="flex items-center gap-2">
            <button
              className="md:hidden"
              onClick={() => setOpenMobile(true)}
            > 
              <Menu className="w-5 h-5" />
            </button>

            <button
              className="hidden md:block p-2 rounded hover:bg-gray-100 transition"
              onClick={() => setOpenDesktop(!openDesktop)}
              title={openDesktop ? "Recolher sidebar" : "Expandir sidebar"}
            >
              {openDesktop ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>
          </div>

          <span className="font-semibold">
            Administração
          </span>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded hover:bg-gray-100 transition">
              <Bell className="w-5 h-5" />
            </button>

            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
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
