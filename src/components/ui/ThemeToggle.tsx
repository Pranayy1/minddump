"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

type Theme = "dark" | "light" | "system";

const STORAGE_KEY = "theme";

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  return stored ?? "dark";
}

function getSystemDark(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyThemeToDOM(theme: Theme) {
  const root = document.documentElement;
  const dark =
    theme === "dark" || (theme === "system" && getSystemDark());
  root.classList.toggle("dark", dark);
  root.classList.toggle("light", !dark);
  root.style.colorScheme = dark ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
    applyThemeToDOM(theme);

    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyThemeToDOM("system");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const cycle = useCallback(() => {
    setTheme((prev) =>
      prev === "dark" ? "light" : prev === "light" ? "system" : "dark"
    );
  }, []);

  const icons = {
    dark: <Moon size={18} aria-hidden="true" />,
    light: <Sun size={18} aria-hidden="true" />,
    system: <Monitor size={18} aria-hidden="true" />,
  };

  const labels = {
    dark: "Switch to light mode",
    light: "Switch to system preference",
    system: "Switch to dark mode",
  };

  return (
    <button
      onClick={cycle}
      className="p-2 text-body hover:text-accent transition-colors"
      aria-label={labels[theme]}
      title={labels[theme]}
    >
      {icons[theme]}
    </button>
  );
}
