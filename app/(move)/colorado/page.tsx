import type { Metadata } from 'next';
import { ColoradoMoveIntelligence } from '@/components/intelligence/ColoradoMoveIntelligence';
import { getColoradoMoveIntelligence } from '@/lib/colorado-intelligence/load';
import { COLORADO_INTELLIGENCE_GATE } from '@/lib/colorado-intelligence/publication';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: COLORADO_INTELLIGENCE_GATE.title,
    description: COLORADO_INTELLIGENCE_GATE.description,
    path: COLORADO_INTELLIGENCE_GATE.path,
  });
}

export default async function ColoradoMoveIntelligencePage({
  searchParams,
}: {
  searchParams: Promise<{ permit?: string }>;
}) {
  const sp = await searchParams;
  const payload = await getColoradoMoveIntelligence(sp.permit);
  return <ColoradoMoveIntelligence payload={payload} />;
}
