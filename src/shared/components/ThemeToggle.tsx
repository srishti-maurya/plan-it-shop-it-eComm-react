import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";
import { useTheme } from "@/shared/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const icon =
    theme === "light" ? (
      <FaSun className="h-5 w-5" />
    ) : theme === "dark" ? (
      <FaMoon className="h-5 w-5" />
    ) : (
      <FaDesktop className="h-5 w-5" />
    );

  const label =
    theme === "light"
      ? "Switch to dark mode"
      : theme === "dark"
      ? "Switch to system mode"
      : "Switch to light mode";

  return (
    <button
      onClick={toggleTheme}
      aria-label={label}
      className="rounded-lg p-2 text-primary transition-colors hover:bg-gray-100 dark:text-primary-300 dark:hover:bg-slate-700"
    >
      {icon}
    </button>
  );
}
