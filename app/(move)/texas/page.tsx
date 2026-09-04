import type { Metadata } from 'next';
import { TexasMoveIntelligence } from '@/components/intelligence/TexasMoveIntelligence';
import { getTexasMoveIntelligenceSnapshot } from '@/lib/texas-intelligence/load';
import { TEXAS_INTELLIGENCE_GATE } from '@/lib/texas-intelligence/publication';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: 'Texas Movers, TxDMV Authority & Household-Goods Intelligence',
    description: TEXAS_INTELLIGENCE_GATE.description,
    path: TEXAS_INTELLIGENCE_GATE.path,
  });
}

export default async function TexasMoveIntelligencePage() {
  const payload = await getTexasMoveIntelligenceSnapshot();
  return <TexasMoveIntelligence payload={payload} />;
}
