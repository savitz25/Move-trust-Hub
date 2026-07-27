'use client';

import Link from 'next/link';
import { hubPath } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';

type RelatedLink = {
  href: string;
  label: string;
};

/**
 * Sister-directory links for finance subpaths only.
 * MoveTrustHub never shows a mid-footer finance CTA module — network note is footer-bottom only.
 */
const RELATED_BY_HUB: Record<Exclude<HubId, 'move'>, { intro: string; links: RelatedLink[] }> = {
  lender: {
    intro:
      'Related independent research when a home purchase overlaps with a move — same no paid placements approach.',
    links: [
      { href: hubPath('move', '/companies'), label: 'Find interstate movers' },
      { href: hubPath('move', '/moving-calculator'), label: 'Move calculator' },
    ],
  },
  insurance: {
    intro:
      'Related independent research when coverage changes with a move — same no paid placements approach.',
    links: [
      { href: 'https://www.movetrusthub.com/companies', label: 'Find movers on MoveTrustHub' },
      { href: 'https://www.movetrusthub.com/resources', label: 'Moving guides' },
    ],
  },
};

/**
 * Footer discovery module — never primary nav.
 * Move hub: no module (quiet network line lives at footer bottom only).
 */
export function AfterYourMoveModule({ hubId }: { hubId: HubId }) {
  if (hubId === 'move') {
    return null;
  }

  const { intro, links } = RELATED_BY_HUB[hubId];

  return (
    <aside
      className="mb-8 rounded-lg border border-border/50 bg-muted/15 px-4 py-4 sm:px-5"
      aria-label="Related independent directories"
    >
      <h2 className="text-sm font-semibold text-foreground">Related independent directories</h2>
      <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed max-w-2xl">{intro}</p>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            {link.href.startsWith('http') ? (
              <a
                href={link.href}
                className="text-primary hover:underline underline-offset-2 font-medium"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
