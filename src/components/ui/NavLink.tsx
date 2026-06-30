"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className="relative inline-flex items-center group"
    >
      <span
        className={`text-sm tracking-wide transition-colors duration-300 ${
          isActive ? "text-heading" : "text-muted hover:text-body"
        }`}
      >
        {children}
      </span>
      <motion.span
        className="absolute -bottom-1 left-0 right-0 h-px bg-accent origin-left"
        initial={{ scaleX: isActive ? 1 : 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ scaleX: isActive ? 1 : 0 }}
        aria-hidden="true"
      />
    </Link>
  );
}
