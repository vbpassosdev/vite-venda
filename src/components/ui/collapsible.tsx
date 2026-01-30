import React, { useState } from 'react'
import { clsx } from 'clsx'

interface CollapsibleContextProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const CollapsibleContext = React.createContext<CollapsibleContextProps | null>(null)

interface CollapsibleProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Collapsible = ({ children, open: controlledOpen, onOpenChange }: CollapsibleProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(controlledOpen ?? false)
  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen
  const setOpen = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  return (
    <CollapsibleContext.Provider value={{ open: isOpen, setOpen }}>
      <div>{children}</div>
    </CollapsibleContext.Provider>
  )
}

interface CollapsibleTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ children, onClick, ...props }, ref) => {
    const context = React.useContext(CollapsibleContext)

    return (
      <button
        ref={ref}
        onClick={(e) => {
          context?.setOpen(!context.open)
          onClick?.(e)
        }}
        {...props}
      >
        {children}
      </button>
    )
  }
)

CollapsibleTrigger.displayName = 'CollapsibleTrigger'

interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ children, className, ...props }, ref) => {
    const context = React.useContext(CollapsibleContext)

    return (
      <div
        ref={ref}
        className={clsx(
          'overflow-hidden transition-all duration-300',
          context?.open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CollapsibleContent.displayName = 'CollapsibleContent'

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
