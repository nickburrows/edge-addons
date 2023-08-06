import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeToggle = () => {
  const [theme, setTheme] = useContext(ThemeContext);

  const handleOnToggle = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  console.log(theme);
  return (
    <div>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center inline-flex items-center dark:text-teal-400 dark:hover:text-teal-600 dark:border dark:bg-transparent dark:border-teal-600 dark:hover:border-teal-700 dark:focus:ring-blue-400"
        onClick={handleOnToggle}
      >
        <span className="material-symbols-outlined">
          {theme === "dark" ? "light_mode" : "dark_mode"}
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle;
