import type { Metadata } from 'next';
import { PennsylvaniaMoveIntelligence } from '@/components/intelligence/PennsylvaniaMoveIntelligence';
import { getPennsylvaniaMoveIntelligence } from '@/lib/pennsylvania-intelligence/load';
import { PENNSYLVANIA_INTELLIGENCE_GATE } from '@/lib/pennsylvania-intelligence/publication';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: PENNSYLVANIA_INTELLIGENCE_GATE.title,
    description: PENNSYLVANIA_INTELLIGENCE_GATE.description,
    path: PENNSYLVANIA_INTELLIGENCE_GATE.path,
  });
}

export default async function PennsylvaniaMoveIntelligencePage() {
  const payload = await getPennsylvaniaMoveIntelligence();
  return <PennsylvaniaMoveIntelligence payload={payload} />;
}
