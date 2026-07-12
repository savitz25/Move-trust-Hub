import { HubFamilyBar } from '@/components/hub/hub-family-bar';
import { HubFooter } from '@/components/hub/hub-footer';
import { HubNavbar } from '@/components/hub/hub-navbar';
import { TrustBadgeRow } from '@/components/hub/trust-badge-row';
import {
  DeferredJourneyTracker,
  DeferredLegacyWelcomeBanner,
  DeferredMoveCoachTip,
  DeferredMoveTipsOptIn,
} from '@/components/performance/deferred-ux-chrome';
import type { HubId } from '@/lib/hub/types';

/** Server-rendered hub chrome — pass explicit hubId from segment layouts for correct SSG. */
export async function HubChrome({
  hubId,
  children,
}: {
  hubId: HubId;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <HubFamilyBar activeHub={hubId} />
      <HubNavbar hubId={hubId} />
      <DeferredLegacyWelcomeBanner hubId={hubId} />
      <DeferredMoveCoachTip hub={hubId} />
      <DeferredJourneyTracker hub={hubId} />
      <TrustBadgeRow hub={hubId} />
      <main className="flex-1">{children}</main>
      <HubFooter hubId={hubId} />
      {hubId === 'move' ? <DeferredMoveTipsOptIn /> : null}
    </div>
  );
}