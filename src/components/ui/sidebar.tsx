"use client"

import React, { useState, useCallback } from 'react'
import { PanelLeftIcon } from 'lucide-react'
import { clsx } from 'clsx'
import { Button } from '@/components/ui/button'

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

interface SidebarProviderProps extends React.ComponentProps<"div"> {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  children,
  ...props
}: SidebarProviderProps) {
  const [openMobile, setOpenMobile] = useState(false)
  const [_open, _setOpen] = useState(defaultOpen)
  
  const open = openProp ?? _open
  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }
      document.cookie = `sidebar_state=${openState}; path=/; max-age=${60 * 60 * 24 * 7}`
    },
    [setOpenProp, open]
  )

  const toggleSidebar = useCallback(() => {
    setOpen((open) => !open)
  }, [setOpen])

  const state = open ? "expanded" : "collapsed"

  const contextValue: SidebarContextProps = {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  }

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        className={clsx(
          "group/sidebar-wrapper flex min-h-screen w-full",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

interface SidebarProps extends React.ComponentProps<"div"> {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}

export function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: SidebarProps) {
  const { state } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        className={clsx(
          "flex flex-col w-64 bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      className={clsx(
        "group peer hidden md:flex text-gray-900 dark:text-gray-100",
        className
      )}
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
    >
      <div
        className={clsx(
          "relative w-64 bg-transparent transition-all duration-200",
          state === "collapsed" && collapsible === "offcanvas" ? "w-0" : ""
        )}
      />
      <div
        className={clsx(
          "fixed inset-y-0 z-10 hidden h-screen w-64 transition-all duration-200 md:flex",
          side === "left"
            ? `left-0 ${state === "collapsed" && collapsible === "offcanvas" ? "-translate-x-full" : ""}`
            : `right-0 ${state === "collapsed" && collapsible === "offcanvas" ? "translate-x-full" : ""}`
        )}
        {...props}
      >
        <div
          className={clsx(
            "flex h-full w-full flex-col bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700",
            variant === "floating" && "rounded-lg border m-2"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

interface SidebarTriggerProps extends React.ComponentProps<typeof Button> {}

export function SidebarTrigger({
  className,
  onClick,
  ...props
}: SidebarTriggerProps) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      className={clsx("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon className="h-4 w-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

interface SidebarContentProps extends React.ComponentProps<"div"> {}

export function SidebarContent({
  className,
  ...props
}: SidebarContentProps) {
  return (
    <div
      className={clsx("flex-1 overflow-auto px-4 py-4", className)}
      {...props}
    />
  )
}

interface SidebarGroupProps extends React.ComponentProps<"div"> {}

export function SidebarGroup({
  className,
  ...props
}: SidebarGroupProps) {
  return (
    <div
      className={clsx("space-y-2", className)}
      {...props}
    />
  )
}

interface SidebarGroupLabelProps extends React.ComponentProps<"h3"> {}

export function SidebarGroupLabel({
  className,
  ...props
}: SidebarGroupLabelProps) {
  return (
    <h3
      className={clsx("text-xs font-semibold text-gray-600 dark:text-gray-400 px-2 py-1.5 uppercase tracking-wider", className)}
      {...props}
    />
  )
}

interface SidebarMenuProps extends React.ComponentProps<"ul"> {}

export function SidebarMenu({
  className,
  ...props
}: SidebarMenuProps) {
  return (
    <ul
      className={clsx("space-y-1", className)}
      {...props}
    />
  )
}

interface SidebarMenuItemProps extends React.ComponentProps<"li"> {}

export function SidebarMenuItem({
  className,
  ...props
}: SidebarMenuItemProps) {
  return (
    <li
      className={clsx("", className)}
      {...props}
    />
  )
}

interface SidebarMenuButtonProps extends React.ComponentProps<"button"> {}

export function SidebarMenuButton({
  className,
  ...props
}: SidebarMenuButtonProps) {
  return (
    <button
      className={clsx(
        "flex items-center w-full px-2 py-1.5 text-sm rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
        className
      )}
      {...props}
    />
  )
}

interface SidebarInsetProps extends React.ComponentProps<"main"> {}

export function SidebarInset({
  className,
  ...props
}: SidebarInsetProps) {
  return (
    <main
      className={clsx("flex-1 flex flex-col", className)}
      {...props}
    />
  )
}
