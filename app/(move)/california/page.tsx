import type { Metadata } from 'next';
import { CaliforniaMoveIntelligence } from '@/components/intelligence/CaliforniaMoveIntelligence';
import { getCaliforniaMoveIntelligenceSnapshot } from '@/lib/california-intelligence/load';
import { CALIFORNIA_INTELLIGENCE_GATE } from '@/lib/california-intelligence/publication';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: 'California Movers, CAL-T Authority & Household-Goods Intelligence',
    description: CALIFORNIA_INTELLIGENCE_GATE.description,
    path: CALIFORNIA_INTELLIGENCE_GATE.path,
  });
}

export default async function CaliforniaMoveIntelligencePage() {
  const payload = await getCaliforniaMoveIntelligenceSnapshot();
  return <CaliforniaMoveIntelligence payload={payload} />;
}
