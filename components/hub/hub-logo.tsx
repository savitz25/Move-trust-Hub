import { TrustHubLogoImage } from '@/components/hub/trust-hub-logo-image';
import type { HubId } from '@/lib/hub/types';

/** Header logo — hub-specific brand mark (InsuranceTrustHub vs Move Trust Hub). */
export function HubLogo({
  hubId,
  priority = false,
}: {
  hubId: HubId;
  priority?: boolean;
}) {
  return (
    <span className="hub-logo-slot relative block shrink-0">
      <TrustHubLogoImage variant="header" priority={priority} hubId={hubId} />
    </span>
  );
}
