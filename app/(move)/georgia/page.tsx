import type { Metadata } from 'next';
import { GeorgiaMoveIntelligence } from '@/components/intelligence/GeorgiaMoveIntelligence';
import { getGeorgiaMoveIntelligence } from '@/lib/georgia-intelligence/load';
import { GEORGIA_INTELLIGENCE_GATE } from '@/lib/georgia-intelligence/publication';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: GEORGIA_INTELLIGENCE_GATE.title,
    description: GEORGIA_INTELLIGENCE_GATE.description,
    path: GEORGIA_INTELLIGENCE_GATE.path,
  });
}

export default async function GeorgiaMoveIntelligencePage() {
  const payload = await getGeorgiaMoveIntelligence();
  return <GeorgiaMoveIntelligence payload={payload} />;
}
