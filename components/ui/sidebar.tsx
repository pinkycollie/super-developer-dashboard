'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

const SidebarContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
}>({
  open: true,
  setOpen: () => {},
})

export function useSidebar() {
  return React.useContext(SidebarContext)
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true)

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex h-full w-64 flex-col border-r bg-background',
        className
      )}
      {...props}
    />
  )
})
Sidebar.displayName = 'Sidebar'

export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-2 p-4', className)}
      {...props}
    />
  )
})
SidebarHeader.displayName = 'SidebarHeader'

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex-1 overflow-auto p-4', className)}
      {...props}
    />
  )
})
SidebarContent.displayName = 'SidebarContent'

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('border-t p-4', className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = 'SidebarFooter'

export const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('space-y-2', className)}
      {...props}
    />
  )
})
SidebarGroup.displayName = 'SidebarGroup'

export const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'px-2 text-xs font-semibold text-muted-foreground',
        className
      )}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = 'SidebarGroupLabel'

export const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('space-y-1', className)} {...props} />
})
SidebarGroupContent.displayName = 'SidebarGroupContent'

export const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      className={cn('space-y-1', className)}
      {...props}
    />
  )
})
SidebarMenu.displayName = 'SidebarMenu'

export const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => {
  return <li ref={ref} className={cn('', className)} {...props} />
})
SidebarMenuItem.displayName = 'SidebarMenuItem'

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean
  }
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? 'div' : 'button'
  return (
    <Comp
      ref={ref as any}
      className={cn(
        'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
        className
      )}
      {...props}
    />
  )
})
SidebarMenuButton.displayName = 'SidebarMenuButton'

export const SidebarRail = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('absolute right-0 top-0 h-full w-px bg-border', className)}
      {...props}
    />
  )
})
SidebarRail.displayName = 'SidebarRail'

export const SidebarInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
})
SidebarInput.displayName = 'SidebarInput'
