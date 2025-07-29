import { useState, useEffect } from "react";
import { Mode } from "../components/ui/mode";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { useAuthStore } from "../store/auth-store";
import { Link, useNavigate } from "react-router-dom";
import { ProviderSidebar } from "../components/provider-sidebar";
import { SidebarTrigger } from "../components/ui/sidebar";

interface ProviderLayoutProps {
  children: React.ReactNode;
}

export const ProviderLayout: React.FC<ProviderLayoutProps> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Logout failed");

      logout();
      toast.success("Logged out successfully");
      navigate("/auth/patient/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

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

          <div className="">
            <h1 className="text-lg font-semibold">AdminDashboard</h1>
          </div>

          <div className="flex gap-4 items-center">
            <Mode theme={theme} toggleTheme={toggleTheme} />
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </header>

      <ProviderSidebar>
        <main className="min-h-screen mt-24 container px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
          <SidebarTrigger className="md:hidden" />
          {children}
        </main>
      </ProviderSidebar>
    </div>
  );
};
