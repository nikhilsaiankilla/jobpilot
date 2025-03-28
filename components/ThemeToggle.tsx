"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));

    console.log(theme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-6 flex items-center bg-secondary rounded-full p-1 transition-all duration-300 shadow-lg cursor-pointer"
      aria-label="Toggle theme"
    >
      <motion.div
        className="w-5 h-5 bg-background rounded-full flex items-center justify-center shadow-md"
        animate={{ x: theme === "light" ? 0 : 12 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {theme === "light" ? (
          <Sun size={16} className="text-amber-500" />
        ) : (
          <Moon size={16} className="text-blue-300" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;