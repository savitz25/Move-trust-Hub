import { AskNetworkBar } from '@/components/network/ask-network-bar';
import { HubFooter } from '@/components/hub/hub-footer';
import { HubNavbar } from '@/components/hub/hub-navbar';
import { InsurancePwaProvider } from '@/components/insurance/pwa/insurance-pwa-provider';
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
 * Network bar (Ask Trust Hub) sits above each hub’s primary header.
 * Specialist product mega-nav stays in HubNavbar only.
 */
export async function HubChrome({
  hubId,
  children,
}: {
  hubId: HubId;
  children: React.ReactNode;
}) {
  const isMove = hubId === 'move';
  const isInsurance = hubId === 'insurance';
  const networkHubId = hubId === 'move' || hubId === 'insurance' || hubId === 'lender' ? hubId : 'move';

  return (
    <div className="flex min-h-screen flex-col pt-[env(safe-area-inset-top)]">
      <AskNetworkBar activeHub={networkHubId} />
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
      {isInsurance ? <InsurancePwaProvider /> : null}
    </div>
  );
}
