import { HubCrossLinkBar } from '@/components/hub/hub-cross-link-bar';
import { HubFooter } from '@/components/hub/hub-footer';
import { HubNavbar } from '@/components/hub/hub-navbar';
import { TrustBadgeRow } from '@/components/hub/trust-badge-row';
import {
  DeferredJourneyTracker,
  DeferredLegacyWelcomeBanner,
  DeferredMoveCoachTip,
  DeferredMoveTipsOptIn,
} from '@/components/performance/deferred-ux-chrome';
import { HubRecommendationStrip } from '@/components/ux/hub-recommendation-strip';
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
      <DeferredLegacyWelcomeBanner hubId={hubId} />
      <DeferredMoveCoachTip hub={hubId} />
      <DeferredJourneyTracker hub={hubId} />
      <TrustBadgeRow hub={hubId} />
      <main className="flex-1">{children}</main>
      <HubRecommendationStrip hub={hubId} />
      {showCrossLinks ? <HubCrossLinkBar hub={hubId} /> : null}
      <HubFooter hubId={hubId} />
      {hubId === 'move' ? <DeferredMoveTipsOptIn /> : null}
    </div>
  );
}