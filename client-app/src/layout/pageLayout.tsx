import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Sidebar, FloatingMenu } from "../components/ui/menu";
import { Mode } from "../components/ui/mode";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { useAuthStore } from "../store/auth-store";
import { useNavigate } from "react-router-dom";

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleMenu = () => setIsOpen((prev) => !prev);

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
      <header className="w-full border-b border-muted-foreground/20 fixed z-99 backdrop-blur">
        <div className="flex justify-between max-w-7xl mx-auto items-center h-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
          <aside className="">
            <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(false)} />
          </aside>

          <h2 className="text-2xl font-semibold">
            C<span className="text-pink-400">H</span>C
          </h2>

          <button
            onClick={toggleMenu}
            className="absolute hidden md:block lg:top-12 xl:left-36 2xl:left-72 2xl:top-24 left-8"
          >
            <Menu size={20} />
          </button>

          <div className="ml-auto pr-12 md:mt-3 flex gap-4 items-center">
            <Mode theme={theme} toggleTheme={toggleTheme} />
          </div>

          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </header>

      <main className="min-h-screen mt-24 container mx-auto max-w-7xl px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
        <div>
          {children}
          <div className="block lg:hidden fixed bottom-12 left-1/2 transform -translate-x-1/2 h-20 m-2 w-7/12 z-10">
            <FloatingMenu />
          </div>
        </div>
      </main>
    </div>
  );
};
