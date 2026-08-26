import type { Metadata } from 'next';
import { Suspense } from 'react';
import { FloridaMoveIntelligence } from '@/components/intelligence/FloridaMoveIntelligence';
import { getFloridaMoveIntelligenceSnapshot } from '@/lib/intelligence/florida-snapshot';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: 'Research Florida Movers — Registration, Authority & Headquarters',
    description:
      'Research Florida mover registrations, interstate directory headquarters, and public authority identifiers. Independent MoveTrustHub research — not a marketplace or ranking.',
    path: '/florida',
  });
}

async function Body() {
  const payload = await getFloridaMoveIntelligenceSnapshot();
  return <FloridaMoveIntelligence payload={payload} />;
}

export default function FloridaMoveIntelligencePage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Florida · mover research
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Research Florida movers</h1>
          <p className="mt-8 text-sm text-muted-foreground" role="status">
            Loading Florida research snapshot…
          </p>
        </main>
      }
    >
      <Body />
    </Suspense>
  );
}
