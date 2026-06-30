export function AccentLine({ className = "" }: { className?: string }) {
  return (
    <div className={`w-10 h-px bg-accent ${className}`} aria-hidden="true" />
  );
}
