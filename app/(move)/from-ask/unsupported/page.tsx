import type { Metadata } from 'next';
import Link from 'next/link';
import { parseAskSearchHandoff } from '@/lib/search-handoff/parse';
import { resolveAskSearchHandoff } from '@/lib/search-handoff/resolve';
import { EmptyCoveragePanel } from '@/components/research/empty-coverage-panel';

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = {
  title: 'Search not available | MoveTrustHub',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.movetrusthub.com/from-ask/unsupported' },
};

export default async function FromAskUnsupportedPage({ searchParams }: Props) {
  const params = await searchParams;
  const ctx = parseAskSearchHandoff(params);
  const dest = ctx ? resolveAskSearchHandoff(ctx) : null;
  const isBroker = ctx?.entityType === 'moving_broker';
  const floridaMoversHref = '/local-movers/florida';

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <EmptyCoveragePanel
        variant="filtered"
        title={dest?.bannerTitle || 'No matching listings for this search'}
        description={
          dest?.bannerBody ||
          'MoveTrustHub did not substitute a different directory for an unsupported search type.'
        }
        primarySources={[]}
        widenLinks={
          isBroker
            ? [
                {
                  href: floridaMoversHref,
                  label: 'Browse Florida local movers (optional)',
                },
                { href: '/resources/carrier-vs-broker', label: 'Carrier vs broker research' },
                { href: '/companies', label: 'Interstate mover directory' },
              ]
            : [
                { href: '/local-movers', label: 'Local movers by state' },
                { href: '/companies', label: 'Interstate mover directory' },
              ]
        }
      />
      {isBroker ? (
        <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
          Moving brokers are not movers. This page does not auto-widen to Florida movers or
          carrier-brokers. A broader mover search is optional and requires an explicit click.
        </p>
      ) : null}
      <p className="mt-4 text-sm">
        <Link href="/local-movers" className="text-primary underline underline-offset-2">
          Browse local movers
        </Link>
      </p>
    </div>
  );
}
