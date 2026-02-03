import { SidebarMenu } from "./NavMain";
import { Bell, User, Menu } from "lucide-react";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-root">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h1 className="admin-brand">Nome da Empresa</h1>
        <SidebarMenu />
      </aside>

      {/* Main */}
      <div className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <button className="admin-menu-btn">
            <Menu className="w-5 h-5" />
          </button>

          <span className="admin-title">Administração</span>

          <div className="admin-header-actions">
            <button className="admin-icon-btn">
              <Bell className="w-5 h-5" />
            </button>

            <div className="admin-avatar">
              <User className="w-4 h-4" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
