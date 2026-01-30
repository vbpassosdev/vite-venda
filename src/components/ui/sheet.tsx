"use client"

import React, { useState } from 'react'
import { XIcon } from 'lucide-react'
import { clsx } from 'clsx'

interface SheetContextProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const SheetContext = React.createContext<SheetContextProps | null>(null)

interface SheetProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Sheet = ({ children, open: controlledOpen, onOpenChange }: SheetProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen
  const setOpen = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  return (
    <SheetContext.Provider value={{ open: isOpen, setOpen }}>
      {children}
    </SheetContext.Provider>
  )
}

interface SheetTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const SheetTrigger = React.forwardRef<HTMLButtonElement, SheetTriggerProps>(
  ({ children, onClick, ...props }, ref) => {
    const context = React.useContext(SheetContext)

    return (
      <button
        ref={ref}
        onClick={(e) => {
          context?.setOpen(true)
          onClick?.(e)
        }}
        {...props}
      >
        {children}
      </button>
    )
  }
)

SheetTrigger.displayName = 'SheetTrigger'

interface SheetCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

const SheetClose = React.forwardRef<HTMLButtonElement, SheetCloseProps>(
  ({ children, onClick, ...props }, ref) => {
    const context = React.useContext(SheetContext)

    return (
      <button
        ref={ref}
        onClick={(e) => {
          context?.setOpen(false)
          onClick?.(e)
        }}
        {...props}
      >
        {children}
      </button>
    )
  }
)

SheetClose.displayName = 'SheetClose'

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  showCloseButton?: boolean
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ children, className, side = 'right', showCloseButton = true, ...props }, ref) => {
    const context = React.useContext(SheetContext)

    const sideStyles = {
      right: 'right-0 top-0 h-full w-64',
      left: 'left-0 top-0 h-full w-64',
      top: 'top-0 left-0 w-full h-64',
      bottom: 'bottom-0 left-0 w-full h-64',
    }

    return (
      <>
        {context?.open && (
          <div
            className="fixed inset-0 z-40 bg-black/50 transition-opacity"
            onClick={() => context.setOpen(false)}
          />
        )}
        {context?.open && (
          <div
            ref={ref}
            className={clsx(
              'fixed z-50 bg-white shadow-lg transition-all duration-300 dark:bg-gray-900',
              sideStyles[side],
              side === 'right' ? 'translate-x-0' : '',
              side === 'left' ? 'translate-x-0' : '',
              className
            )}
            {...props}
          >
            {showCloseButton && (
              <button
                onClick={() => context?.setOpen(false)}
                className="absolute top-4 right-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                <XIcon className="w-4 h-4" />
              </button>
            )}
            {children}
          </div>
        )}
      </>
    )
  }
)

SheetContent.displayName = 'SheetContent'

interface SheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const SheetHeader = React.forwardRef<HTMLDivElement, SheetHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('border-b px-6 py-4', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

SheetHeader.displayName = 'SheetHeader'

interface SheetFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const SheetFooter = React.forwardRef<HTMLDivElement, SheetFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('border-t px-6 py-4 mt-auto', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

SheetFooter.displayName = 'SheetFooter'

interface SheetTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

const SheetTitle = React.forwardRef<HTMLHeadingElement, SheetTitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={clsx('text-lg font-semibold', className)}
        {...props}
      >
        {children}
      </h2>
    )
  }
)

SheetTitle.displayName = 'SheetTitle'

interface SheetDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

const SheetDescription = React.forwardRef<
  HTMLParagraphElement,
  SheetDescriptionProps
>(({ children, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={clsx('text-sm text-gray-500 dark:text-gray-400', className)}
      {...props}
    >
      {children}
    </p>
  )
})

SheetDescription.displayName = 'SheetDescription'

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
