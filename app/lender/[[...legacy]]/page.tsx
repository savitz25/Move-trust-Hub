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
  const resolution = resolveHubLegacyPathCached('lender', legacy);

  if (resolution.type === 'redirect') {
    return { title: 'Redirecting…' };
  }

  return buildHubMetadata('lender', {
    title: resolution.title,
    description: resolution.message,
    path: `/${(legacy ?? []).join('/')}`,
    noIndex: true,
  });
}

/**
 * Optional catch-all for unmatched /lender/* paths.
 * Static cluster folders and dynamic state routes take precedence when present.
 */
export default async function LenderLegacyCatchAll({ params }: PageProps) {
  const { legacy } = await params;
  const resolution = resolveHubLegacyPathCached('lender', legacy);

  if (resolution.type === 'redirect') {
    permanentRedirect(resolution.destination);
  }

  return <LegacyFallbackPage hub="lender" resolution={resolution} />;
}