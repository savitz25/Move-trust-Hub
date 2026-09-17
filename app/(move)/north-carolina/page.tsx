import type { Metadata } from 'next';
import { NorthCarolinaMoveIntelligence } from '@/components/intelligence/NorthCarolinaMoveIntelligence';
import { getNorthCarolinaMoveIntelligence } from '@/lib/north-carolina-intelligence/load';
import { NORTH_CAROLINA_INTELLIGENCE_GATE } from '@/lib/north-carolina-intelligence/publication';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: NORTH_CAROLINA_INTELLIGENCE_GATE.title,
    description: NORTH_CAROLINA_INTELLIGENCE_GATE.description,
    path: NORTH_CAROLINA_INTELLIGENCE_GATE.path,
  });
}

export default async function NorthCarolinaMoveIntelligencePage() {
  const payload = await getNorthCarolinaMoveIntelligence();
  return <NorthCarolinaMoveIntelligence payload={payload} />;
}
