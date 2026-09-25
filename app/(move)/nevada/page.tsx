import type { Metadata } from 'next';
import { NevadaMoveIntelligence } from '@/components/intelligence/NevadaMoveIntelligence';
import { getNevadaMoveIntelligence } from '@/lib/nevada-intelligence/load';
import { NEVADA_INTELLIGENCE_GATE } from '@/lib/nevada-intelligence/publication';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: NEVADA_INTELLIGENCE_GATE.title,
    description: NEVADA_INTELLIGENCE_GATE.description,
    path: NEVADA_INTELLIGENCE_GATE.path,
  });
}

export default async function NevadaMoveIntelligencePage() {
  const payload = await getNevadaMoveIntelligence();
  return <NevadaMoveIntelligence payload={payload} />;
}
