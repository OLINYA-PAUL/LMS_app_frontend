"use client";

import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center mx-2 ">
      {theme === "light" ? (
        <MdDarkMode
          onClick={() => setTheme("dark")}
          width={400}
          color="black"
          className="toggle_mode cursor-pointer"
        />
      ) : (
        <MdLightMode
          width={400}
          color="white"
          onClick={() => setTheme("light")}
          className="toggle_mode font-extrabold cursor-pointer"
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
