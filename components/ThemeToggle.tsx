"use client";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() =>
    typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
      ? "dark"
      : "light"
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative w-14 h-7 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {/* Animated Ball */}
      <motion.div
        className="w-6 h-6 bg-white dark:bg-black rounded-full flex items-center justify-center shadow-md"
        animate={{ x: theme === "light" ? 0 : 25 }} // Move ball smoothly
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {theme === "light" ? <Sun size={16} className="text-foreground"/> : <Moon size={16} className="text-foreground"/>}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
