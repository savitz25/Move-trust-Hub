import type { Metadata } from 'next';
import { MassachusettsMoveIntelligence } from '@/components/intelligence/MassachusettsMoveIntelligence';
import { getMassachusettsMoveIntelligence } from '@/lib/massachusetts-intelligence/load';
import { MASSACHUSETTS_INTELLIGENCE_GATE } from '@/lib/massachusetts-intelligence/publication';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: MASSACHUSETTS_INTELLIGENCE_GATE.title,
    description: MASSACHUSETTS_INTELLIGENCE_GATE.description,
    path: MASSACHUSETTS_INTELLIGENCE_GATE.path,
  });
}

export default async function MassachusettsMoveIntelligencePage() {
  const payload = await getMassachusettsMoveIntelligence();
  return <MassachusettsMoveIntelligence payload={payload} />;
}
