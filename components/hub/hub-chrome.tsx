import { Suspense } from 'react';
import { MoveTipsOptIn } from '@/components/conversion/move-tips-opt-in';
import { HubCrossLinkBar } from '@/components/hub/hub-cross-link-bar';
import { HubFooter } from '@/components/hub/hub-footer';
import { HubNavbar } from '@/components/hub/hub-navbar';
import { LegacyWelcomeBanner } from '@/components/hub/legacy-welcome-banner';
import { TrustBadgeRow } from '@/components/hub/trust-badge-row';
import { HubRecommendationStrip } from '@/components/ux/hub-recommendation-strip';
import { JourneyTracker } from '@/components/ux/journey-tracker';
import { MoveCoachTip } from '@/components/ux/move-coach-tip';
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
      <Suspense fallback={null}>
        <LegacyWelcomeBanner hubId={hubId} />
      </Suspense>
      <Suspense fallback={null}>
        <MoveCoachTip hub={hubId} />
      </Suspense>
      <Suspense fallback={null}>
        <JourneyTracker hub={hubId} />
      </Suspense>
      <TrustBadgeRow hub={hubId} />
      <main className="flex-1">{children}</main>
      <HubRecommendationStrip hub={hubId} />
      {showCrossLinks ? <HubCrossLinkBar hub={hubId} /> : null}
      <HubFooter hubId={hubId} />
      {hubId === 'move' ? (
        <Suspense fallback={null}>
          <MoveTipsOptIn />
        </Suspense>
      ) : null}
    </div>
  );
}