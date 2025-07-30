import { useState, useEffect } from "react";
import { Mode } from "../components/ui/mode";

import { Link } from "react-router-dom";
import { PatientSidebar } from "../components/patient-sidebar";
import { SidebarTrigger } from "../components/ui/sidebar";

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="bg-background text-foreground min-h-screen overflow-y-auto ">
      <header className="w-full border-b bg-background/95 border-muted-foreground/20 fixed backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex justify-between h-20 px-4 sm:px-8 md:px-16 lg:px-24 items-center max-w-7xl mx-auto">
          <Link to={"/dashboard"}>
            <h2 className="text-2xl font-semibold">
              C<span className="text-pink-400">H</span>C
            </h2>
          </Link>

          <div className="flex gap-4 items-center">
            <Mode theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
      </header>

      <PatientSidebar>
        <main className="min-h-screen mt-24 2xl:mt-36 container px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
          <SidebarTrigger className="md:hidden" />
          {children}
        </main>
      </PatientSidebar>
    </div>
  );
};
