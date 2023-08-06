import React from "react";
import DataConvert from "./components/DataConvert";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <>
      <main className="min-h-screen m-0 p-6 text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-900">
        <DataConvert />
        <ThemeToggle />
      </main>
    </>
  );
}

export default App;
