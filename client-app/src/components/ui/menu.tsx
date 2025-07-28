import React from "react";
import {
  CalendarDays,
  Receipt,
  FileArchive,
  Settings,
  X,
  Home,
  User2,
} from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const navLinks = [
  { href: "/dashboard", icon: <Home />, label: "Dashboard" },
  { href: "/appointment", icon: <CalendarDays />, label: "Appointment" },
  { href: "/profile", icon: <User2 />, label: "Profile" },
  { href: "/billings", icon: <Receipt />, label: "Billings" },
  { href: "/files", icon: <FileArchive />, label: "Files" },
  { href: "/settings", icon: <Settings />, label: "Settings" },
];

// SIDEBAR FOR DESKTOP (lg+)
export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`transition-transform hidden sm:block ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed left-0 top-[81px] h-screen w-72`}
    >
      <nav className="bg-background min-h-screen w-full border-r border-muted-foreground/20">
        <div className="flex justify-end p-4">
          <button
            onClick={toggleSidebar}
            className="text-muted-foreground hover:text-foreground focus:outline-none"
            aria-label="Close Sidebar"
          >
            <X size={24} />
          </button>
        </div>
        <div className="space-y-16 flex flex-col pt-24 ">
          {navLinks.map(({ href, icon, label }) => (
            <Link
              to={href}
              key={label}
              className="group hover:bg-blue-50/20 rounded-md px-8 py-2"
            >
              <p className="flex items-center space-x-8">
                {icon}
                <span>{label}</span>
              </p>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

// FLOATING MENU FOR MOBILE (below lg)
export const FloatingMenu: React.FC = () => {
  return (
    <div className="sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 bg-background border border-border/20 rounded-lg shadow-lg py-3 px-8 z-50">
      <nav>
        <div className="flex items-center justify-center space-x-6">
          {navLinks.map(({ href, icon, label }) => (
            <Link
              to={href}
              key={label}
              className="group text-muted-foreground relative"
            >
              <p className="flex flex-col items-center">
                {icon}
                <span className="absolute bottom-full mb-2 px-2 py-1 text-xs rounded bg-white shadow-md opacity-0 group-hover:opacity-100 z-10 whitespace-nowrap">
                  {label}
                </span>
              </p>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};
