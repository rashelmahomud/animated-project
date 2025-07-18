import React, { useEffect, useState } from "react";

const ThemToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setDark(true);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return <button onClick={() => setDark(!dark)} className="p-3 bg-gray-600 text-white rounded">

    {dark ? "dark" : "light"}



  </button>;
};

export default ThemToggle;
