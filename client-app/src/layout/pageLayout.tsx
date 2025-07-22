import { useState, useEffect } from "react";
import { Menu, CircleUserRound } from "lucide-react";
import { Sidebar, FloatingMenu } from "../components/ui/menu";
import { Mode } from "../components/ui/mode";

interface PageLayoutProps {
    children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    const [theme, setTheme] = useState<"light" | "dark">("dark");
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(prev => !prev);

    const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return (
        <div className="bg-background text-foreground min-h-screen overflow-y-auto">
            <header className="flex flex-row w-full h-10 items-center justify-between">

                <aside className="hidden lg:block">
                    <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(false)}/>
                </aside>

                <button 
                onClick={toggleMenu}
                className="pl-12 hidden lg:block">
                    <Menu />
                </button>

                <div className="ml-auto pr-12 md:mt-3">
                    <Mode theme={theme} toggleTheme={toggleTheme}/>
                </div>

            </header>

            <main className="min-h-screen">
                <div className="absolute m-4 top-4 md:top-0 lg:top-12 w-14 h-14 left-14 lg:left-36">
                    <CircleUserRound size={40}/>
                </div>
                <div>
                    {children}
                    <div className="block lg:hidden fixed bottom-12 left-1/2 transform -translate-x-1/2 h-20 m-2 w-7/12 z-10">
                        <FloatingMenu />
                    </div>
               </div>
            </main>
        </div>
    )
}