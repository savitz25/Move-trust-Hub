import type { Metadata } from 'next';
import { TennesseeMoveIntelligence } from '@/components/intelligence/TennesseeMoveIntelligence';
import { getTennesseeMoveIntelligence } from '@/lib/tennessee-intelligence/load';
import { TENNESSEE_INTELLIGENCE_GATE } from '@/lib/tennessee-intelligence/publication';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: TENNESSEE_INTELLIGENCE_GATE.title,
    description: TENNESSEE_INTELLIGENCE_GATE.description,
    path: TENNESSEE_INTELLIGENCE_GATE.path,
  });
}

export default async function TennesseeMoveIntelligencePage() {
  const payload = await getTennesseeMoveIntelligence();
  return <TennesseeMoveIntelligence payload={payload} />;
}
