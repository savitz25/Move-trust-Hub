import Link from 'next/link';
import { ArrowRightLeft, MapPinned } from 'lucide-react';
import type { CountyPopularRoute } from '@/lib/local-movers/county-popular-routes';

export function CountyPopularRoutesSection({
  countyLabel,
  routes,
}: {
  countyLabel: string;
  routes: CountyPopularRoute[];
}) {
  if (routes.length === 0) return null;

  return (
    <section
      id="popular-routes"
      className="mb-10 scroll-mt-28 rounded-2xl border bg-card p-5 sm:p-6"
      aria-labelledby="popular-routes-heading"
    >
      <div className="mb-4 flex items-start gap-3">
        <ArrowRightLeft className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="popular-routes-heading" className="text-lg font-semibold tracking-tight">
            Popular move routes for {countyLabel}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            Realistic local and long-distance patterns people plan around this county — not generic
            state boilerplate.
          </p>
        </div>
      </div>
      <ul className="space-y-3">
        {routes.map((route) => (
          <li
            key={`${route.direction}-${route.label}`}
            className="rounded-xl border bg-muted/20 px-4 py-3"
          >
            <div className="flex flex-wrap items-center gap-2">
              <MapPinned className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
              <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                {route.direction}
              </span>
              {route.href ? (
                <Link
                  href={route.href}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  {route.label}
                </Link>
              ) : (
                <span className="text-sm font-semibold text-foreground">{route.label}</span>
              )}
            </div>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{route.context}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
