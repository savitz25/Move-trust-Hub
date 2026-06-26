import { MapSkeleton } from '@/components/map/MapSkeleton';

export function MapSectionSkeleton() {
  return (
    <section className="border-y bg-muted/20 py-14 md:py-16" aria-hidden="true">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <div className="h-6 w-48 mx-auto rounded-full bg-muted/40 animate-pulse mb-4" />
          <div className="h-9 w-3/4 max-w-xl mx-auto rounded-lg bg-muted/30 animate-pulse mb-3" />
          <div className="h-5 w-2/3 max-w-lg mx-auto rounded bg-muted/20 animate-pulse" />
        </div>
        <MapSkeleton />
      </div>
    </section>
  );
}