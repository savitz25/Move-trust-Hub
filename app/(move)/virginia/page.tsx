import type { Metadata } from 'next';
import { VirginiaMoveIntelligence } from '@/components/intelligence/VirginiaMoveIntelligence';
import { getVirginiaMoveIntelligence } from '@/lib/virginia-intelligence/load';
import { VIRGINIA_INTELLIGENCE_GATE } from '@/lib/virginia-intelligence/publication';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: VIRGINIA_INTELLIGENCE_GATE.title,
    description: VIRGINIA_INTELLIGENCE_GATE.description,
    path: VIRGINIA_INTELLIGENCE_GATE.path,
  });
}

export default async function VirginiaMoveIntelligencePage({
  searchParams,
}: {
  searchParams: Promise<{ authority?: string }>;
}) {
  const sp = await searchParams;
  const payload = await getVirginiaMoveIntelligence(sp.authority);
  return <VirginiaMoveIntelligence payload={payload} />;
}
