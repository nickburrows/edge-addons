import React, { createContext, useState, useEffect } from "react";

const defaultState = {
  theme: "dark",
  toggleDark: () => {},
};

export const ThemeContext = createContext(defaultState);

// eslint-disable-next-line react/prop-types
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const isDark = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(isDark);
    root.classList.add(theme);
    localStorage.setItem("color-theme", theme);
  }, [theme, isDark]);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};
