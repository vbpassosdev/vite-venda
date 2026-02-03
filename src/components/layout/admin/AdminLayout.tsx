import { SidebarMenu } from "./NavMain"
import { Bell, User, Menu } from "lucide-react"

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-root">
      
      {/* Sidebar */}
      <aside className="sidebar shrink-0">
        <SidebarMenu />
      </aside>

      {/* Main */}
      <div className="admin-main min-w-0">
        
        {/* Header */}
        <header className="admin-header sticky top-0 z-20">
          <button className="admin-menu-btn">
            <Menu className="w-5 h-5" />
          </button>

          <span className="admin-title">
            Administração
          </span>

          <div className="admin-header-actions">
            <button className="admin-icon-btn">
              <Bell className="w-5 h-5" />
            </button>

            <div className="admin-avatar">
              <User className="w-5 h-5" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="admin-content">
          {children}
        </main>

      </div>
    </div>
  )
}
