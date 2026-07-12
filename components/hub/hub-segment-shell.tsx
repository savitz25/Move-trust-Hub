import { HubChrome } from '@/components/hub/hub-chrome';
import { HubLogoPreload } from '@/components/hub/hub-logo-preload';
import type { HubId } from '@/lib/hub/types';

/**
 * Shared hub segment layout shell — RSC chrome + LCP logo preload.
 * Use in app/(move)/layout, app/lender/layout, app/insurance/layout.
 */
export function HubSegmentShell({
  hubId,
  children,
}: {
  hubId: HubId;
  children: React.ReactNode;
}) {
  return (
    <>
      <HubLogoPreload hubId={hubId} />
      <HubChrome hubId={hubId}>{children}</HubChrome>
    </>
  );
}