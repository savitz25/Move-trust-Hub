'use client';

import Link from 'next/link';
import { memo } from 'react';
import { Route, ArrowRight, TrendingUp } from 'lucide-react';
import type { RouteNavLink } from '@/lib/nav/destinations-menu-data';

type Props = {
  routes: RouteNavLink[];
  onNavigate?: () => void;
  limit?: number;
};

const linkHover =
  'rounded-lg px-2.5 py-2 -mx-1 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30';

export const DestinationsMegaMenuRoutes = memo(function DestinationsMegaMenuRoutes({
  routes,
  onNavigate,
  limit,
}: Props) {
  const visibleRoutes = limit ? routes.slice(0, limit) : routes;

  return (
    <nav aria-label="Popular moving routes">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        <Route className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        Popular Routes
      </div>
      <ul className="space-y-1 text-sm max-h-[min(48vh,380px)] overflow-y-auto overscroll-contain pr-1 -mr-1">
        {visibleRoutes.map((route) => (
          <li key={route.href}>
            <Link
              prefetch={false}
              href={route.href}
              className={`block font-medium hover:text-primary ${linkHover} ${
                route.featured
                  ? 'border border-primary/20 bg-primary/5 hover:border-primary/30'
                  : ''
              }`}
              onClick={onNavigate}
              aria-label={
                route.featured
                  ? `${route.label}, high-demand corridor, ${route.distance}`
                  : `${route.label}, ${route.distance}`
              }
            >
              <span className="flex items-center gap-1.5">
                {route.label}
                {route.featured ? (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-primary/10 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-primary">
                    <TrendingUp className="h-2.5 w-2.5" aria-hidden="true" />
                    Top
                  </span>
                ) : null}
              </span>
              <span className="block text-[11px] text-muted-foreground font-normal mt-0.5">
                {route.distance}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        prefetch={false}
        href="/resources/routes"
        className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-4 hover:underline rounded-md px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        onClick={onNavigate}
      >
        All route guides
        <ArrowRight className="h-3 w-3" aria-hidden="true" />
      </Link>
    </nav>
  );
});