import type { Metadata } from 'next';
import { OhioMoveIntelligence } from '@/components/intelligence/OhioMoveIntelligence';
import { getOhioMoveIntelligence } from '@/lib/ohio-intelligence/load';
import { OHIO_INTELLIGENCE_GATE } from '@/lib/ohio-intelligence/publication';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: OHIO_INTELLIGENCE_GATE.title,
    description: OHIO_INTELLIGENCE_GATE.description,
    path: OHIO_INTELLIGENCE_GATE.path,
  });
}

export default async function OhioMoveIntelligencePage() {
  const payload = await getOhioMoveIntelligence();
  return <OhioMoveIntelligence payload={payload} />;
}
