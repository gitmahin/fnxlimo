"use client";
import { useTheme } from "next-themes";
import { MainMenu } from "./main-menu";

import Image from "next/image";
import { useEffect, useState } from "react";

export const Header = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [currentThemeMode, setCurrentThemeMode] = useState<string>("");

  useEffect(() => {
    setCurrentThemeMode(resolvedTheme || "");
  }, [resolvedTheme]);

  const toggleTheme = () => {
    const currentTheme = resolvedTheme;
    if (currentTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <header className="w-full fixed z-[99] bg-background top-0 left-0 flex justify-center items-center h-[64px] border-b border-accent">
      <div className="defualt_layout_width flex justify-between items-center">
        <div className="flex justify-start items-center gap-5">
          <h1 className="text-2xl font-medium">FINIXLIMO</h1>
          <nav>
            <MainMenu />
          </nav>
        </div>
        <Image
          src={"/theme_mode.png"}
          width={100}
          height={100}
          onClick={toggleTheme}
          className={`${currentThemeMode === "dark" && "invert"} w-[20px] h-[20px] active:scale-[0.9] transition-all `}
          alt="Theme mode"
        />
      </div>
    </header>
  );
};
