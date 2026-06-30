"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { AccentLine } from "@/components/typography/AccentLine";

export function HeroSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const { scrollY } = useScroll();
  const indicatorOpacity = useTransform(scrollY, [0, 80], [1, 0]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const fade = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.8,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
      <motion.div {...fade(0)} className="mb-8">
        <p className="text-[11px] uppercase tracking-[0.3em] text-accent font-medium">
          A digital garden
        </p>
      </motion.div>

      <motion.h1
        {...fade(0.15)}
        className="font-serif font-normal text-heading max-w-4xl leading-[1.08] mb-6"
      >
        <span className="block text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.25rem]">
          Dump your mind.
        </span>
        <span className="block text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] mt-2 md:mt-3 text-accent">
          Build your knowledge.
        </span>
      </motion.h1>

      <motion.div {...fade(0.35)}>
        <AccentLine className="mx-auto mb-8" />
      </motion.div>

      <motion.p
        {...fade(0.5)}
        className="text-muted text-base md:text-lg max-w-md leading-relaxed mb-14"
      >
        A digital garden where I document what I learn, build, fail at, and
        discover.
      </motion.p>

      <motion.div {...fade(0.7)}>
        <Link
          href="/posts"
          className="inline-flex items-center gap-2.5 text-sm text-heading border border-border rounded-full px-7 py-3 hover:border-accent/40 hover:text-accent transition-colors duration-300"
        >
          Start reading
        </Link>
      </motion.div>

      <motion.div
        style={prefersReducedMotion ? { opacity: 1 } : { opacity: indicatorOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown size={20} className="text-muted" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </section>
  );
}
