import Link from 'next/link';
import { hubPath } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';

type RelatedLink = {
  href: string;
  label: string;
};

const RELATED_BY_HUB: Record<HubId, { intro: string; links: RelatedLink[] }> = {
  move: {
    intro:
      'Settling in often means new financing and insurance — these sister directories use the same no-paid-placement approach.',
    links: [
      { href: hubPath('lender', '/local-lenders'), label: 'Mortgage lenders by county' },
      { href: hubPath('insurance', '/hubs/browse'), label: 'Health insurance agents' },
      { href: '/local-movers', label: 'Local movers by state' },
    ],
  },
  lender: {
    intro:
      'Closing on a home often overlaps with a move — these sister directories use the same no-paid-placement approach.',
    links: [
      { href: hubPath('move', '/companies'), label: 'Find interstate movers' },
      { href: hubPath('insurance', '/directory'), label: 'Insurance agents' },
      { href: hubPath('move', '/moving-calculator'), label: 'Move calculator' },
    ],
  },
  insurance: {
    intro:
      'Coverage often changes when you relocate — these sister directories use the same no-paid-placement approach.',
    links: [
      { href: hubPath('move', '/companies'), label: 'Find movers' },
      { href: hubPath('lender', '/local-lenders'), label: 'Mortgage lenders' },
      { href: hubPath('move', '/resources'), label: 'Moving guides' },
    ],
  },
};

/**
 * Quiet footer module — one place for lender/insurance/move cross-links.
 * No aggressive upsell; independent watchdog tone.
 */
export function AfterYourMoveModule({ hubId }: { hubId: HubId }) {
  const { intro, links } = RELATED_BY_HUB[hubId];

  return (
    <aside
      className="mb-8 rounded-lg border border-border/60 bg-muted/20 px-4 py-4 sm:px-5"
      aria-label="Related services after your move"
    >
      <h2 className="text-sm font-semibold text-foreground">After Your Move</h2>
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