import type { Metadata } from 'next';
import { IllinoisMoveIntelligence } from '@/components/intelligence/IllinoisMoveIntelligence';
import { getIllinoisMoveIntelligence } from '@/lib/illinois-intelligence/load';
import { ILLINOIS_INTELLIGENCE_GATE } from '@/lib/illinois-intelligence/publication';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: ILLINOIS_INTELLIGENCE_GATE.title,
    description: ILLINOIS_INTELLIGENCE_GATE.description,
    path: ILLINOIS_INTELLIGENCE_GATE.path,
  });
}

export default async function IllinoisMoveIntelligencePage() {
  const payload = await getIllinoisMoveIntelligence();
  return <IllinoisMoveIntelligence payload={payload} />;
}
