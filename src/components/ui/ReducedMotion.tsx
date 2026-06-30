"use client";

import { type ReactNode, useEffect, useState } from "react";

interface ReducedMotionProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ReducedMotion({
  children,
  fallback = null,
}: ReducedMotionProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (prefersReducedMotion) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
