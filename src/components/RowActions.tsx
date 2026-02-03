import { useState, useRef, useEffect } from "react"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"

type RowActionsProps<T> = {
  row: T
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
}

export function RowActions<T>({ row, onEdit, onDelete }: RowActionsProps<T>) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative text-left">
      {/* BOTÃO */}
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center gap-2
          px-3 py-2 sm:px-2.5 sm:py-1.5
          rounded-lg border border-gray-200
          bg-white/80 backdrop-blur
          hover:bg-white hover:border-gray-300
          transition-all text-gray-700 text-sm
        "
      >
        <MoreHorizontal className="w-5 h-5 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Ações</span>
      </button>

      {/* MENU */}
      <div
        className={`
          fixed sm:absolute right-4 sm:right-0
          bottom-4 sm:bottom-auto
          sm:mt-2 w-[90vw] sm:w-48
          z-50 rounded-2xl sm:rounded-xl overflow-hidden
          border border-gray-200
          bg-white/95 backdrop-blur-xl
          transition-all origin-bottom sm:origin-top-right
          ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}
        `}
      >
        {onEdit && (
          <button
            onClick={() => {
              onEdit(row)
              setOpen(false)
            }}
            className="
              flex items-center gap-3 w-full px-5 py-4 sm:px-4 sm:py-2.5
              text-base sm:text-sm text-gray-700 hover:bg-indigo-50 transition-all
            "
          >
            <Pencil className="w-5 h-5 sm:w-4 sm:h-4 text-indigo-600" />
            Editar
          </button>
        )}

        {onDelete && (
          <button
            onClick={() => {
              onDelete(row)
              setOpen(false)
            }}
            className="
              flex items-center gap-3 w-full px-5 py-4 sm:px-4 sm:py-2.5
              text-base sm:text-sm text-red-600 hover:bg-red-50 transition-all
            "
          >
            <Trash2 className="w-5 h-5 sm:w-4 sm:h-4" />
            Excluir
          </button>
        )}
      </div>
    </div>
  )
}
