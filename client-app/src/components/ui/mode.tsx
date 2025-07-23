import {
    Sun,
    Moon,
} from "lucide-react";

interface ModeProps {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

export const Mode: React.FC<ModeProps> = ({theme, toggleTheme}) => {
    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2"
        >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    )
}