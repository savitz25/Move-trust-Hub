export function CalculatorSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl" aria-hidden="true">
      <div className="h-10 w-2/3 max-w-lg rounded-lg bg-muted/40 animate-pulse mb-4" />
      <div className="h-5 w-full max-w-2xl rounded bg-muted/30 animate-pulse mb-8" />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[480px] rounded-xl border bg-muted/20 animate-pulse" />
        <div className="h-[480px] rounded-xl border bg-muted/20 animate-pulse" />
      </div>
    </div>
  );
}