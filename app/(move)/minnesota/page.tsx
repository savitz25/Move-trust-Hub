import type { Metadata } from 'next';
import { MinnesotaMoveIntelligence } from '@/components/intelligence/MinnesotaMoveIntelligence';
import { getMinnesotaMoveIntelligence } from '@/lib/minnesota-intelligence/load';
import { MINNESOTA_INTELLIGENCE_GATE } from '@/lib/minnesota-intelligence/publication';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: MINNESOTA_INTELLIGENCE_GATE.title,
    description: MINNESOTA_INTELLIGENCE_GATE.description,
    path: MINNESOTA_INTELLIGENCE_GATE.path,
  });
}

export default async function MinnesotaMoveIntelligencePage() {
  const payload = await getMinnesotaMoveIntelligence();
  return <MinnesotaMoveIntelligence payload={payload} />;
}
