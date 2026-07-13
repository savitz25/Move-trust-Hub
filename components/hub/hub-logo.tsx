import { TrustHubLogoImage } from '@/components/hub/trust-hub-logo-image';
import type { HubId } from '@/lib/hub/types';

/** Header logo — native transparent PNG (no optimizer matte). */
export function HubLogo({
  hubId: _hubId,
  priority = false,
}: {
  hubId: HubId;
  priority?: boolean;
}) {
  return (
    <span className="hub-logo-slot relative block shrink-0">
      <TrustHubLogoImage variant="header" priority={priority} />
    </span>
  );
}