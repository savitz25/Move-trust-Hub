export function CalculatorSkeleton() {
  return (
    <div className="w-full" aria-hidden="true">
      <div className="h-8 w-64 rounded-full bg-muted/40 animate-pulse mb-6" />
      <div className="h-32 rounded-xl border bg-muted/20 animate-pulse mb-6" />
      <div className="grid lg:grid-cols-[minmax(0,1.85fr)_minmax(0,1fr)] gap-6">
        <div className="h-[520px] rounded-xl border bg-muted/20 animate-pulse" />
        <div className="hidden lg:block h-[520px] rounded-xl border bg-muted/20 animate-pulse" />
      </div>
    </div>
  );
}