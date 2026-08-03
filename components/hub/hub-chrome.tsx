import { HubFamilyBar } from '@/components/hub/hub-family-bar';
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
 * MoveTrustHub primary chrome is moving-only: no peer Move/Lender/Insurance switcher
 * in the header. Sister directories use standalone apex domains (lendertrusthub.com,
 * insurancetrusthub.com) — not residual monorepo path prefixes.
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
  // Lender still lives as a temporary Move subpath — show discreet sister switcher.
  // Insurance is a standalone specialist destination: no peer hub switcher in the header.
  const showSecondaryHubSwitcher = hubId === 'lender';

  return (
    <div className="flex min-h-screen flex-col pt-[env(safe-area-inset-top)]">
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
      {/* ITH-only PWA layer — no Move branding, optional install, non-blocking */}
      {isInsurance ? <InsurancePwaProvider /> : null}
    </div>
  );
}
