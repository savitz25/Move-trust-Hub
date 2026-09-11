import type { Metadata } from 'next';
import { NewYorkMoveIntelligence } from '@/components/intelligence/NewYorkMoveIntelligence';
import { getNewYorkMoveIntelligence } from '@/lib/new-york-intelligence/load';
import { NEW_YORK_INTELLIGENCE_GATE } from '@/lib/new-york-intelligence/publication';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: NEW_YORK_INTELLIGENCE_GATE.title,
    description: NEW_YORK_INTELLIGENCE_GATE.description,
    path: NEW_YORK_INTELLIGENCE_GATE.path,
  });
}

export default async function NewYorkMoveIntelligencePage() {
  const payload = await getNewYorkMoveIntelligence();
  return <NewYorkMoveIntelligence payload={payload} />;
}
