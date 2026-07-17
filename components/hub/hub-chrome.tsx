import { HubFamilyBar } from '@/components/hub/hub-family-bar';
import { HubFooter } from '@/components/hub/hub-footer';
import { HubNavbar } from '@/components/hub/hub-navbar';
import {
  DeferredJourneyTracker,
  DeferredLegacyWelcomeBanner,
  DeferredMoveCoachTip,
  DeferredMoveTipsOptIn,
} from '@/components/performance/deferred-ux-chrome';
import type { HubId } from '@/lib/hub/types';

/**
 * Server-rendered hub chrome — pass explicit hubId from segment layouts for correct SSG.
 * Trust badge row lives on hub home pages only (not every deep page) for HTML/LCP budget.
 */
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
      {hubId === 'move' ? (
        <>
          <DeferredMoveCoachTip hub={hubId} />
          <DeferredJourneyTracker hub={hubId} />
        </>
      ) : null}
      <main className="flex-1 pb-[env(safe-area-inset-bottom)] sm:pb-0">{children}</main>
      <HubFooter hubId={hubId} />
      {hubId === 'move' ? <DeferredMoveTipsOptIn /> : null}
    </div>
  );
}