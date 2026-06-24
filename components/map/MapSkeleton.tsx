export function MapSkeleton() {
  return (
    <div
      className="relative w-full aspect-[16/9] max-h-[520px] rounded-2xl border bg-muted/30 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted/50 via-muted/20 to-muted/50" />
      <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 space-y-3">
        <div className="h-3 w-2/5 rounded-full bg-muted-foreground/10" />
        <div className="h-3 w-3/5 rounded-full bg-muted-foreground/10" />
        <div className="h-3 w-1/2 rounded-full bg-muted-foreground/10" />
      </div>
    </div>
  );
}