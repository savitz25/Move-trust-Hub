'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConsumerTrustNetworkLinks } from '@/components/hub/consumer-trust-network-links';
import { hubPath } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';
import { isAfterYourMoveAllowedPath } from '@/lib/hub/cross-sell-paths';

type RelatedLink = {
  href: string;
  label: string;
};

/** Sister hubs (lender/insurance) only — move hub uses discreet network links only. */
const RELATED_BY_HUB: Record<Exclude<HubId, 'move'>, { intro: string; links: RelatedLink[] }> = {
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
      { href: hubPath('move', '/resources'), label: 'Moving guides' },
    ],
  },
};

/**
 * Footer discovery module.
 * Phase 0: On Move, only a soft network line (not finance CTAs in primary chrome).
 * On lender/insurance: keep limited sister-directory links (still not top nav).
 */
export function AfterYourMoveModule({ hubId }: { hubId: HubId }) {
  const pathname = usePathname();

  if (hubId === 'move') {
    if (!isAfterYourMoveAllowedPath(pathname)) {
      return null;
    }
    return (
      <aside
        className="mb-8 border-t border-border/40 pt-6"
        aria-label="ConsumerTrust Hub network"
      >
        <ConsumerTrustNetworkLinks />
      </aside>
    );
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
      <div className="mt-4 pt-3 border-t border-border/50">
        <ConsumerTrustNetworkLinks />
      </div>
    </aside>
  );
}
