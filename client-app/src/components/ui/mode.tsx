import { Sun, Moon } from "lucide-react";

interface ModeProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const Mode: React.FC<ModeProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2 transition-transform duration-300 ease-in-out rotate-0 hover:rotate-45"
    >
      <span
        className={`inline-block transition-transform duration-300 ${
          theme === "dark" ? "rotate-0" : "rotate-180"
        }`}
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </span>
    </button>
  );
};
