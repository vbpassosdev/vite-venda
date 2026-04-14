import { MoreHorizontal } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"

const MENU_HEIGHT = 150

type RowActionsProps<T> = {
  row: T
  onEdit?: (row: T) => void
  onPrint?: (row: T) => void
  onDelete?: (row: T) => void
  printLabel?: string
}

export function RowActions<T>({ row, onEdit, onPrint, printLabel = "Visualizar" }: RowActionsProps<T>) {
  const [open, setOpen] = useState(false)
  const [openUp, setOpenUp] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom

      setOpenUp(spaceBelow < MENU_HEIGHT)
    }
  }, [open])

  return (
    <div className="relative text-left">
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="app-btn app-btn-outline app-btn-sm"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: "fixed",
              top: openUp
                ? (buttonRef.current?.getBoundingClientRect().top ?? 0) - MENU_HEIGHT
                : buttonRef.current?.getBoundingClientRect().bottom ?? 0,
              left: buttonRef.current?.getBoundingClientRect().left ?? 0,
            }}
            className="app-menu-panel z-9999 w-48"
          >
            {onEdit && (
              <button
                onClick={() => {
                  onEdit(row)
                  setOpen(false)
                }}
                className="app-menu-item app-menu-item-primary"
              >
                Abrir
              </button>
            )}

            {onPrint && (
              <button
                onClick={() => {
                  onPrint(row)
                  setOpen(false)
                }}
                className="app-menu-item app-menu-item-success"
              >
                {printLabel}
              </button>
            )}
          </div>,
          document.body
        )}
    </div>
  )
}
