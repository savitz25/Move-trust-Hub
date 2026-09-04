import type { Metadata } from 'next';
import { WashingtonMoveIntelligence } from '@/components/intelligence/WashingtonMoveIntelligence';
import { getWashingtonMoveIntelligenceSnapshot } from '@/lib/washington-intelligence/load';
import { WASHINGTON_INTELLIGENCE_GATE } from '@/lib/washington-intelligence/publication';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: 'Washington Movers, UTC Permits & Household-Goods Intelligence',
    description: WASHINGTON_INTELLIGENCE_GATE.description,
    path: WASHINGTON_INTELLIGENCE_GATE.path,
  });
}

export default async function WashingtonMoveIntelligencePage() {
  const payload = await getWashingtonMoveIntelligenceSnapshot();
  return <WashingtonMoveIntelligence payload={payload} />;
}
