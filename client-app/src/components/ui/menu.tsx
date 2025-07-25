import React from "react";
import {
  House,
  CalendarDays,
  Receipt,
  FileArchive,
  Settings,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const navLinks = [
  { href: "/dashboard", icon: <House />, label: "Home" },
  { href: "/dashboard", icon: <CalendarDays />, label: "Appointment" },
  { href: "/dashboard", icon: <Receipt />, label: "Billings" },
  { href: "/dashboard", icon: <FileArchive />, label: "Files" },
  { href: "/dashboard", icon: <Settings />, label: "Settings" },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed left-0 top-0 min-h-screen w-[370px] z-50`}
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
        <ul className="space-y-16 px-12 flex flex-col pt-24">
          {navLinks.map(({ href, icon, label }) => (
            <li
              key={label}
              className="group hover:bg-blue-50/20 rounded-md p-2"
            >
              <a href={href} className="flex items-center space-x-8">
                {icon}
                <span className="">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export const FloatingMenu: React.FC = () => {
  return (
    <div className="max-h-fit min-w-fit p-3 rounded-lg border border-border/20 shadow-lg">
      <nav
        className="bg-background mt-2 relative h-[30px]"
        style={{ zIndex: 100 }}
      >
        <ul className="flex items-center justify-center space-x-8">
          {navLinks.map(({ href, icon, label }) => (
            <li key={label} className="relative group text-border/50">
              <a href={href} className="relative flex flex-col items-center">
                {icon}
                <span className="absolute bottom-full mb-2 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 z-10">
                  {label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
