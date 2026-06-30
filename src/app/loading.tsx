export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-xs text-muted tracking-widest uppercase">
          Loading
        </span>
      </div>
    </div>
  );
}
