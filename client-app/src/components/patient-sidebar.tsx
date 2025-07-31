import type React from "react";
import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";

export function PatientSidebar({ children }: { children: React.ReactNode }) {
  // const pathname = window.location.pathname;

  // Don't show sidebar for landing pages or patient dashboard
  // if (
  //   pathname?.startsWith("/landing") ||
  //   pathname?.startsWith("/patient-dashboard")
  // ) {
  //   return <>{children}</>;
  // }

  // Show sidebar for clinic management pages
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </SidebarProvider>
  );
}
