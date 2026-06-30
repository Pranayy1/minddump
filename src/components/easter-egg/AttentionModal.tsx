"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const SECRET_WORD = "attention";

const LINES = [
  { text: "Information is free.", delay: 0 },
  { text: "Knowledge costs attention.", delay: 0.25 },
  { text: "Wisdom costs experience.", delay: 0.5 },
];

export function AttentionModal() {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const bufferRef = useRef("");
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(() => {
    setOpen(false);
    setRevealed(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "Escape" && open) {
        handleClose();
        return;
      }

      if (open) return;

      const char = e.key.toLowerCase();
      if (char.length === 1 && /[a-z]/.test(char)) {
        bufferRef.current = (bufferRef.current + char).slice(
          -SECRET_WORD.length
        );

        if (bufferRef.current === SECRET_WORD) {
          setOpen(true);
          setRevealed(false);
          requestAnimationFrame(() => {
            setTimeout(() => setRevealed(true), 400);
          });
          bufferRef.current = "";
        }
      }
    },
    [open, handleClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!open || !modalRef.current) return;
    const node = modalRef.current;
    const focusables = node.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length > 0) focusables[0].focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = node.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    node.addEventListener("keydown", handleTab);
    return () => node.removeEventListener("keydown", handleTab);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="attention-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={handleClose}
          aria-hidden="true"
        >
          <motion.div
            ref={modalRef}
            key="attention-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="attention-modal-title"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full mx-6 border border-border/40 rounded-2xl bg-surface/80 backdrop-blur-md px-8 py-10 md:px-10 md:py-12"
          >
            <h2 id="attention-modal-title" className="sr-only">
              Easter egg revealed
            </h2>
            <button
              ref={closeRef}
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 text-muted/40 hover:text-body transition-colors duration-200"
              aria-label="Close"
            >
              <X size={16} strokeWidth={1.5} aria-hidden="true" />
            </button>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: revealed ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="w-12 h-px bg-accent mb-8 origin-left"
              aria-hidden="true"
            />

            <div className="space-y-5">
              {LINES.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={
                    revealed
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 12 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: line.delay,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                  className="font-serif text-xl md:text-2xl text-heading/90 leading-relaxed tracking-wide"
                >
                  {line.text}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: revealed ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
              className="w-12 h-px bg-accent/40 mt-8 origin-left"
              aria-hidden="true"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={revealed ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 1.2 }}
              className="text-[11px] text-muted/30 mt-6 tracking-wider"
            >
              you paid attention
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
