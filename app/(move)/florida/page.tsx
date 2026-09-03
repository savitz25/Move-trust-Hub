import type { Metadata } from 'next';
import { FloridaMoveIntelligence } from '@/components/intelligence/FloridaMoveIntelligence';
import { getFloridaMoveIntelligenceSnapshot } from '@/lib/intelligence/florida-snapshot';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: 'Florida Moving Intelligence',
    description:
      'Research Florida mover registrations, interstate directory headquarters, and public authority identifiers. Independent MoveTrustHub research — not a marketplace or ranking.',
    path: '/florida',
    contextualImage: true,
    imageAlt: 'Move Trust Hub — Florida Moving Intelligence',
  });
}

/**
 * Await the bounded snapshot on the server so crawlers receive one H1 and
 * real Florida Intelligence, not a loading-shell fallback.
 */
export default async function FloridaMoveIntelligencePage() {
  const payload = await getFloridaMoveIntelligenceSnapshot();
  return <FloridaMoveIntelligence payload={payload} />;
}
