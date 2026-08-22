import Link from 'next/link';
import { parseAskSearchHandoff } from '@/lib/search-handoff/parse';
import { resolveAskSearchHandoff } from '@/lib/search-handoff/resolve';

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function FromAskUnsupportedPage({ searchParams }: Props) {
  const params = await searchParams;
  const ctx = parseAskSearchHandoff(params);
  const dest = ctx ? resolveAskSearchHandoff(ctx) : null;
  const isBroker = ctx?.entityType === 'moving_broker';

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">From AskTrustHub</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        {dest?.bannerTitle || 'This search type is not available here'}
      </h1>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        {dest?.bannerBody ||
          'MoveTrustHub did not substitute a different directory for an unsupported search type.'}
      </p>
      {isBroker ? (
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Moving brokers are not movers. We do not preload the local-mover county directory as if
          it were a broker result set.
        </p>
      ) : null}
      <p className="mt-6">
        <Link href="/resources/carrier-vs-broker" className="text-primary underline underline-offset-2">
          Carrier vs broker research
        </Link>
      </p>
    </div>
  );
}
