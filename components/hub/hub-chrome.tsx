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
 *
 * MoveTrustHub primary chrome is moving-only: no peer Move/Lender/Insurance switcher
 * in the header. Sister directories stay on /lender and /insurance with their own chrome.
 */
export async function HubChrome({
  hubId,
  children,
}: {
  hubId: HubId;
  children: React.ReactNode;
}) {
  const isMove = hubId === 'move';
  // Lender still lives as a temporary Move subpath — show discreet sister switcher.
  // Insurance is a standalone specialist destination: no peer hub switcher in the header.
  const showSecondaryHubSwitcher = hubId === 'lender';

  return (
    <div className="min-h-screen flex flex-col">
      {showSecondaryHubSwitcher ? <HubFamilyBar activeHub={hubId} /> : null}
      <HubNavbar hubId={hubId} />
      <DeferredLegacyWelcomeBanner hubId={hubId} />
      {isMove ? (
        <>
          <DeferredMoveCoachTip hub={hubId} />
          <DeferredJourneyTracker hub={hubId} />
        </>
      ) : null}
      <main className="flex-1 pb-[env(safe-area-inset-bottom)] sm:pb-0">{children}</main>
      <HubFooter hubId={hubId} />
      {isMove ? <DeferredMoveTipsOptIn /> : null}
    </div>
  );
}
