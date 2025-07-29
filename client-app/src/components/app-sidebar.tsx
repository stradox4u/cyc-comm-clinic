import {
  Calendar,
  Users,
  FileText,
  BarChart3,
  Smartphone,
  Home,
  Settings,
  Bell,
  CreditCard,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Link } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Patient Intake",
    url: "/intake",
    icon: FileText,
  },
  {
    title: "Appointments",
    url: "/appointments",
    icon: Calendar,
  },
  {
    title: "Patients",
    url: "/patients",
    icon: Users,
  },
  {
    title: "Provider Dashboard",
    url: "/providers",
    icon: BarChart3,
  },
  {
    title: "Mobile Outreach",
    url: "/outreach",
    icon: Smartphone,
  },
  {
    title: "Insurance Check",
    url: "/insurance",
    icon: CreditCard,
  },
  {
    title: "Reminders",
    url: "/reminders",
    icon: Bell,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-blue-950 border-muted-foreground/20">
      <SidebarHeader>
        <div className="px-2 py-4">
          <h2 className="text-lg font-semibold">Community Health Clinic</h2>
          <p className="text-sm text-muted-foreground">Healthcare Management</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={`/provider${item.url}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
