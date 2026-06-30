"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NavLink } from "@/components/ui/NavLink";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV_ITEMS = [
  { href: "/now", label: "Now" },
  { href: "/log", label: "Log" },
  { href: "/garden", label: "Garden" },
  { href: "/posts", label: "Posts" },
  { href: "/thoughts", label: "Vault" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/bookmarks", label: "Bookmarks" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setMobileOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, closeMenu]);

  useEffect(() => {
    if (!mobileOpen || !menuRef.current) return;
    const links = menuRef.current.querySelectorAll<HTMLElement>("a, button");
    if (links.length > 0) links[0].focus();
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-lg tracking-tight text-heading hover:text-accent transition-colors duration-300"
        >
          Minddump
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            ref={toggleRef}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-body hover:text-accent transition-colors p-2"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-nav"
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-border/50 bg-bg/95 backdrop-blur-md overflow-hidden"
            aria-label="Mobile"
          >
            <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col gap-5">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="text-lg text-body hover:text-accent transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
