import React, { createContext, useContext, useEffect } from "react";

export type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "sowjith_portfolio_theme_v2";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme: Theme = "dark";
  const isDark = true;
  const toggleTheme = () => {};
  const setTheme = () => {};

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", "dark");
    root.classList.add("dark");
    root.classList.remove("light");
    root.style.colorScheme = "dark";
    try {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } catch {
      // Ignore write errors
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isDark: true }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
