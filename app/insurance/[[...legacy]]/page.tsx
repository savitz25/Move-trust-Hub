import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import { LegacyFallbackPage } from '@/components/hub/templates/legacy-fallback-page';
import { buildHubMetadata } from '@/lib/hub/metadata';
import { resolveHubLegacyPathCached } from '@/lib/migration/hub-legacy-resolver-cached';

type PageProps = {
  params: Promise<{ legacy?: string[] }>;
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { legacy } = await params;
  const resolution = resolveHubLegacyPathCached('insurance', legacy);

  if (resolution.type === 'redirect') {
    return { title: 'Redirecting…' };
  }

  return buildHubMetadata('insurance', {
    title: resolution.title,
    description: resolution.message,
    path: `/${(legacy ?? []).join('/')}`,
    noIndex: true,
  });
}

/**
 * Optional catch-all for unmatched /insurance/* paths.
 * More specific routes (resources/[slug], hubs/[state]/[slug], etc.) take precedence.
 */
export default async function InsuranceLegacyCatchAll({ params }: PageProps) {
  const { legacy } = await params;
  const resolution = resolveHubLegacyPathCached('insurance', legacy);

  if (resolution.type === 'redirect') {
    permanentRedirect(resolution.destination);
  }

  return <LegacyFallbackPage hub="insurance" resolution={resolution} />;
}