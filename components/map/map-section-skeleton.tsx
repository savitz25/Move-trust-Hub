import { MapSkeleton } from '@/components/map/MapSkeleton';

export function MapSectionSkeleton() {
  return (
    <section
      className="border-y border-border/60 bg-gradient-to-b from-background via-orange-50/20 to-muted/15 py-14 md:py-16"
      aria-hidden="true"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-6 w-48 animate-pulse rounded-full bg-primary/10" />
          <div className="mx-auto mb-3 h-9 w-3/4 max-w-xl animate-pulse rounded-lg bg-muted/40" />
          <div className="mx-auto h-5 w-2/3 max-w-lg animate-pulse rounded bg-muted/30" />
        </div>
        <MapSkeleton />
      </div>
    </section>
  );
}
