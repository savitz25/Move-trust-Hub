'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { hubPath } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';
import { isAfterYourMoveAllowedPath } from '@/lib/hub/cross-sell-paths';

type RelatedLink = {
  href: string;
  label: string;
};

const RELATED_BY_HUB: Record<HubId, { intro: string; links: RelatedLink[] }> = {
  move: {
    intro:
      'Related independent directories for after you settle in — same research-first approach, no paid placements.',
    links: [
      { href: hubPath('lender', '/local-lenders'), label: 'Mortgage lenders by county' },
      { href: hubPath('insurance', '/hubs/browse'), label: 'Health insurance agents' },
      { href: '/local-movers', label: 'Local movers by state' },
    ],
  },
  lender: {
    intro:
      'Related independent directories when a home purchase overlaps with a move — same research-first approach.',
    links: [
      { href: hubPath('move', '/companies'), label: 'Find interstate movers' },
      { href: hubPath('insurance', '/directory'), label: 'Insurance agents' },
      { href: hubPath('move', '/moving-calculator'), label: 'Move calculator' },
    ],
  },
  insurance: {
    intro:
      'Related independent directories when coverage changes with a move — same research-first approach.',
    links: [
      { href: hubPath('move', '/companies'), label: 'Find movers' },
      { href: hubPath('lender', '/local-lenders'), label: 'Mortgage lenders' },
      { href: hubPath('move', '/resources'), label: 'Moving guides' },
    ],
  },
};

/**
 * Footer module for sister-directory discovery.
 * Hidden on high-intent Move paths (directory, profiles, compare, auto-transport)
 * so mid-funnel evaluation is not diluted by adjacent verticals.
 */
export function AfterYourMoveModule({ hubId }: { hubId: HubId }) {
  const pathname = usePathname();

  if (hubId === 'move' && !isAfterYourMoveAllowedPath(pathname)) {
    return null;
  }

  const { intro, links } = RELATED_BY_HUB[hubId];

  return (
    <aside
      className="mb-8 rounded-lg border border-border/60 bg-muted/20 px-4 py-4 sm:px-5"
      aria-label="Related independent directories"
    >
      <h2 className="text-sm font-semibold text-foreground">Related independent directories</h2>
      <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed max-w-2xl">{intro}</p>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-primary hover:underline underline-offset-2 font-medium"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}