"use client";
import { createContext, useState } from "react";

export const ThemeContext: any = createContext(null);

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<any>("light");
  const toggleTheme = () => {
    setTheme(
      document.documentElement.classList.toString() === "dark"
        ? lightTheme()
        : darkTheme()
    );
  };

  const lightTheme = () => {
    document.documentElement.classList["remove"]("dark");
    document.documentElement.classList["add"]("light");
    return "light";
  };
  const darkTheme = () => {
    document.documentElement.classList["remove"]("light");
    document.documentElement.classList["add"]("dark");
    return "dark";
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
