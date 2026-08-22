import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { parseAskSearchHandoff } from '@/lib/search-handoff/parse';
import { resolveAskSearchHandoff } from '@/lib/search-handoff/resolve';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/**
 * Stable Ask view-more entry. Resolves structured context onto an existing
 * Move directory and redirects so the consumer does not search again.
 */
export default async function FromAskHandoffPage({ searchParams }: Props) {
  const params = await searchParams;
  const ctx = parseAskSearchHandoff(params);
  if (!ctx) redirect('/local-movers');
  const dest = resolveAskSearchHandoff(ctx);
  redirect(dest.href);
}
