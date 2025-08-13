import type React from 'react'
import { SidebarProvider } from '../components/ui/sidebar'
import { AppSidebar } from '../components/app-sidebar'

export function ProviderSidebar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </SidebarProvider>
  )
}
