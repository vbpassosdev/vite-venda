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

      {/* HEADER */}
      <header className="list-header">
        <div>
          <h1 className="list-title">
            {title}
          </h1>

          {subtitle && (
            <p className="text-sm text-purple-500 mt-1">
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

      {/* TOOLBAR */}
      {toolbar && (
        <div className="bg-white/80 border border-purple-200 rounded-xl p-3 flex flex-wrap gap-3 items-center">
          {toolbar}
        </div>
      )}

      {/* CONTENT */}
      <div className="table-wrapper-floral">

        {/* LOADING */}
        {loading && (
          <div className="p-12 text-center text-purple-500 animate-pulse font-medium">
            Carregando dados...
          </div>
        )}

        {/* EMPTY */}
        {!loading && empty && (
          <div className="empty-state">
            <h3>{emptyMessage}</h3>
            <p className="text-sm opacity-80">
              Tente ajustar os filtros ou adicionar novos registros.
            </p>
          </div>
        )}

        {/* DATA */}
        {!loading && !empty && (
          <div className="p-4">
            {children}
          </div>
        )}

      </div>
    </div>
  )
}
