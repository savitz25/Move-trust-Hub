import type { Metadata } from 'next';
import { OregonMoveIntelligence } from '@/components/intelligence/OregonMoveIntelligence';
import { getOregonMoveIntelligence } from '@/lib/oregon-intelligence/load';
import { OREGON_INTELLIGENCE_GATE } from '@/lib/oregon-intelligence/publication';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: OREGON_INTELLIGENCE_GATE.title,
    description: OREGON_INTELLIGENCE_GATE.description,
    path: OREGON_INTELLIGENCE_GATE.path,
  });
}

export default async function OregonMoveIntelligencePage() {
  const payload = await getOregonMoveIntelligence();
  return <OregonMoveIntelligence payload={payload} />;
}
