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
            <p className="text-sm text-sky-700 mt-1">
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
        <div className="bg-white/80 border border-sky-200 rounded-xl p-3 flex flex-wrap gap-3 items-center">
          {toolbar}
        </div>
      )}

      <div className="table-wrapper-floral">
        {loading && (
          <div className="p-12 text-center text-sky-700 animate-pulse font-medium">
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
