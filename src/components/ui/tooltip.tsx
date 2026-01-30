import React, { useState } from 'react'
import { clsx } from 'clsx'

interface TooltipProviderProps {
  children: React.ReactNode
}

interface TooltipProps {
  children: React.ReactNode
}

interface TooltipTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const TooltipContext = React.createContext<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
} | null>(null)

const TooltipProvider = ({ children }: TooltipProviderProps) => {
  return <>{children}</>
}

const Tooltip = ({ children }: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <TooltipContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block">{children}</div>
    </TooltipContext.Provider>
  )
}

const TooltipTrigger = React.forwardRef<HTMLDivElement, TooltipTriggerProps>(
  ({ children, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const context = React.useContext(TooltipContext)

    return (
      <div
        ref={ref}
        onMouseEnter={(e) => {
          context?.setIsOpen(true)
          onMouseEnter?.(e)
        }}
        onMouseLeave={(e) => {
          context?.setIsOpen(false)
          onMouseLeave?.(e)
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)

TooltipTrigger.displayName = 'TooltipTrigger'

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ children, className, ...props }, ref) => {
    const context = React.useContext(TooltipContext)

    if (!context?.isOpen) return null

    return (
      <div
        ref={ref}
        className={clsx(
          'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded-md whitespace-nowrap z-50 dark:bg-gray-700',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

TooltipContent.displayName = 'TooltipContent'

export { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent }
