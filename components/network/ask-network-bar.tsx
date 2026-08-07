import type { NetworkHubId } from '@/lib/network/ask-trust-hub';
import { AskNetworkBarStatic } from '@/components/network/ask-network-bar-static';
import { AskNetworkBarMobile } from '@/components/network/ask-network-bar-mobile';

/**
 * Network bar: SSR desktop pills + client mobile switcher only.
 * Avoids hydrating the full bar (reduces TBT / mismatch surface).
 */
export function AskNetworkBar({
  activeHub,
  className,
}: {
  activeHub: NetworkHubId;
  className?: string;
}) {
  return (
    <AskNetworkBarStatic
      activeHub={activeHub}
      className={className}
      mobileSlot={<AskNetworkBarMobile activeHub={activeHub} />}
    />
  );
}
