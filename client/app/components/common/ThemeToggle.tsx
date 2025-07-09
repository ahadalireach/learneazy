"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

const ThemeToggle = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-center mx-4">
      {theme === "light" ? (
        <div
          className="cursor-pointer text-black dark:text-white text-[25px]"
          onClick={() => setTheme("dark")}
        >
          <BiMoon />
        </div>
      ) : (
        <div
          className="cursor-pointer text-black dark:text-white text-[25px]"
          onClick={() => setTheme("light")}
        >
          <BiSun />
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
