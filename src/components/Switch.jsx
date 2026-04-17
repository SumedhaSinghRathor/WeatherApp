import { useEffect, useState } from "react";
import sun from "/sun.png";
import moon from "/moon.png";

function Switch() {
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    return saved || "system";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  const applyTheme = (mode) => {
    const root = document.documentElement;

    if (mode === "dark") {
      root.classList.add("dark");
    } else if (mode === "light") {
      root.classList.remove("dark");
    } else if (mode === "system") {
      const prefersDark = globalThis.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      root.classList.toggle("dark", prefersDark);
    }
  };

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const media = globalThis.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [theme]);

  return (
    <div className="fixed top-5 right-5">
      <div className="flex p-1 rounded-full shadow outline-2 outline-offset-2">
        <button
          onClick={() => setTheme("light")}
          className={`px-3 py-1 rounded-full transition ${
            theme === "light" ? "bg-white shadow" : ""
          }`}
        >
          <img src={sun} alt="Light" className="size-6" />
        </button>

        <button
          onClick={() => setTheme("dark")}
          className={`px-3 py-1 rounded-full transition ${
            theme === "dark" ? "bg-gray-900 shadow" : ""
          }`}
        >
          <img src={moon} alt="Dark" className="size-6" />
        </button>
      </div>
    </div>
  );
}

export default Switch;
