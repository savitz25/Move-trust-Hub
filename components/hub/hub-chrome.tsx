import { Suspense } from 'react';
import { HubCrossLinkBar } from '@/components/hub/hub-cross-link-bar';
import { HubFooter } from '@/components/hub/hub-footer';
import { HubNavbar } from '@/components/hub/hub-navbar';
import { LegacyWelcomeBanner } from '@/components/hub/legacy-welcome-banner';
import { TrustBadgeRow } from '@/components/hub/trust-badge-row';
import { shouldShowCrossLinks } from '@/lib/hub/cross-link-paths';
import { getRequestPathname } from '@/lib/hub/request-context';
import type { HubId } from '@/lib/hub/types';

/** Server-rendered hub chrome — pass explicit hubId from segment layouts for correct SSG. */
export async function HubChrome({
  hubId,
  children,
}: {
  hubId: HubId;
  children: React.ReactNode;
}) {
  const pathname = await getRequestPathname();
  const showCrossLinks = shouldShowCrossLinks(pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <HubNavbar hubId={hubId} />
      {(hubId === 'lender' || hubId === 'insurance') && (
        <Suspense fallback={null}>
          <LegacyWelcomeBanner hubId={hubId} />
        </Suspense>
      )}
      <TrustBadgeRow hub={hubId} />
      <main className="flex-1">{children}</main>
      {showCrossLinks ? <HubCrossLinkBar hub={hubId} /> : null}
      <HubFooter hubId={hubId} />
    </div>
  );
}