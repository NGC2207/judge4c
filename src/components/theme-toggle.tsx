"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MonitorCog, Moon, Sun } from "lucide-react";

type Theme = "light" | "dark" | "system";

const nextTheme: Record<Theme, Theme> = {
  light: "dark",
  dark: "system",
  system: "light",
};

const icons: Record<Theme, JSX.Element> = {
  light: <Sun className="h-5 w-5" />,
  dark: <Moon className="h-5 w-5" />,
  system: <MonitorCog className="h-5 w-5" />,
};

export function ThemeToggle() {
  const { theme = "system", setTheme } = useTheme();

  const toggleTheme = () => setTheme(nextTheme[theme as Theme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="flex h-6 w-6 items-center justify-center rounded-md transition"
      onClick={toggleTheme}
    >
      {icons[theme as Theme]}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
