import { ReactNode } from "react"

interface BaseListProps {
  title: string
  subtitle?: string
  actions?: ReactNode
  toolbar?: ReactNode
  loading?: boolean
  empty?: boolean
  emptyMessage?: string
  children: ReactNode
}

export function BaseList({
  title,
  subtitle,
  actions,
  toolbar,
  loading = false,
  empty = false,
  emptyMessage = "Nenhum registro encontrado.",
  children,
}: BaseListProps) {
  return (
    <div className="max-w-2xl p-6">
      <header className="list-header">
        <div>
          <h1 className="list-title">{title}</h1>

          {subtitle && (
            <p className="mt-1 text-sm app-text-muted">
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </header>

      {toolbar && (
        <div className="app-shell-panel flex flex-wrap items-center gap-3 rounded-xl p-3">
          {toolbar}
        </div>
      )}

      <div className="table-wrapper-floral">
        {loading && (
          <div className="app-text-muted p-12 text-center font-medium animate-pulse">
            Carregando dados...
          </div>
        )}

        {!loading && empty && (
          <div className="empty-state">
            <h3>{emptyMessage}</h3>
            <p className="text-sm opacity-80">
              Tente revisar os filtros ou adicionar um novo registro.
            </p>
          </div>
        )}

        {!loading && !empty && (
          <div className="p-4">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
