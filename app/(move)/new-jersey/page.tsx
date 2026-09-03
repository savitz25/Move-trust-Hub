import type { Metadata } from 'next';
import { NewJerseyMoveIntelligence } from '@/components/intelligence/NewJerseyMoveIntelligence';
import { getNjMoveIntelligenceSnapshot } from '@/lib/intelligence/nj-snapshot';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: 'New Jersey Movers, Moving Authority & Enforcement Intelligence | MoveTrustHub',
    description:
      'Research official New Jersey mover and warehouse authority, federal interstate carrier evidence, and Operation Safe Move enforcement. Independent MoveTrustHub research — not a ranking.',
    path: '/new-jersey',
  });
}

export default async function NewJerseyMoveIntelligencePage() {
  const payload = await getNjMoveIntelligenceSnapshot();
  return <NewJerseyMoveIntelligence payload={payload} />;
}
