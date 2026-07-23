import Link from 'next/link';

type Props = {
  countyLabel: string;
};

/** Short intent paths above the fold — jump to listings or tools. */
export function CountyIntentPaths({ countyLabel }: Props) {
  const items = [
    { href: '#movers', label: `Moving within ${countyLabel}` },
    { href: '#movers', label: `Moving to ${countyLabel}` },
    { href: '/moving-calculator', label: 'Moving out of state' },
    { href: '/compare', label: 'Compare carriers' },
    { href: '/verify-dot', label: 'Verify USDOT' },
  ];

  return (
    <div className="mt-4 flex flex-wrap gap-2" role="navigation" aria-label="Move intent paths">
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
