'use client';

import Link from 'next/link';
import { memo } from 'react';
import { Route, ArrowRight } from 'lucide-react';
import type { RouteNavLink } from '@/lib/nav/destinations-menu-data';

type Props = {
  routes: RouteNavLink[];
  onNavigate?: () => void;
  limit?: number;
};

export const DestinationsMegaMenuRoutes = memo(function DestinationsMegaMenuRoutes({
  routes,
  onNavigate,
  limit,
}: Props) {
  const visibleRoutes = limit ? routes.slice(0, limit) : routes;

  return (
    <div>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        <Route className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        Popular Routes
      </div>
      <ul className="space-y-2 text-sm max-h-[min(48vh,380px)] overflow-y-auto overscroll-contain pr-1 -mr-1">
        {visibleRoutes.map((route) => (
          <li key={route.href}>
            <Link
              prefetch={false}
              href={route.href}
              className="font-medium hover:text-primary transition-colors block"
              onClick={onNavigate}
            >
              {route.label}
            </Link>
            <p className="text-[11px] text-muted-foreground">{route.distance}</p>
          </li>
        ))}
      </ul>
      <Link
        prefetch={false}
        href="/resources/routes"
        className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-4 hover:underline"
        onClick={onNavigate}
      >
        All route guides
        <ArrowRight className="h-3 w-3" aria-hidden="true" />
      </Link>
    </div>
  );
});