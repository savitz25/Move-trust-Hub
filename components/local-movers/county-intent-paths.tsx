import Link from 'next/link';

type Props = {
  countyLabel: string;
  /** Optional state hub path e.g. /local-movers/california */
  stateHubHref?: string;
};

/**
 * Secondary intent chips — tools and related guides.
 * Primary “jump to listings” is CountyJumpToMovers only (no duplicate #movers CTAs).
 */
export function CountyIntentPaths({ countyLabel, stateHubHref }: Props) {
  const items = [
    { href: '/moving-calculator', label: `Moving from ${countyLabel} / out of state` },
    { href: '/compare', label: 'Compare carriers' },
    { href: '/verify-dot', label: 'Verify USDOT' },
    ...(stateHubHref
      ? [{ href: stateHubHref, label: 'All county guides in this state' }]
      : [{ href: '/local-movers', label: 'All local mover guides' }]),
  ];

  return (
    <div
      className="mt-4 flex flex-wrap gap-2"
      role="navigation"
      aria-label="Move tools and related guides"
    >
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="rounded-full border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
