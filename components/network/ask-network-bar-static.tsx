import type { ReactNode } from 'react';
import {
  ASK_TRUST_HUB,
  NETWORK_HUBS,
  type NetworkHubId,
} from '@/lib/network/ask-trust-hub';
import { SwitchHubMenu } from '@/components/switch-hub-menu';
import { cn } from '@/lib/utils';

/**
 * Server-rendered network bar chrome (desktop pills + brand link).
 * Mobile switcher is a separate client island — keeps first paint free of menu JS.
 */
export function AskNetworkBarStatic({
  activeHub,
  className,
  mobileSlot,
}: {
  activeHub: NetworkHubId;
  className?: string;
  /** Client-only mobile switcher control */
  mobileSlot?: ReactNode;
}) {
  return (
    <div
      className={cn(
        'relative z-[60] border-b border-border/70 bg-muted/40 text-[12px] text-[#3d4f63]',
        className
      )}
    >
      <div className="container mx-auto flex min-h-10 items-center justify-between gap-2 px-4 py-1.5 sm:min-h-10">
        <a
          href={ASK_TRUST_HUB.url}
          className="inline-flex min-h-11 shrink-0 items-center font-semibold tracking-tight text-[#0A2540]/85 hover:text-[#0A2540]"
          rel="noopener noreferrer"
        >
          <span className="hidden sm:inline">Ask Trust Hub network</span>
          <span className="sm:hidden">Ask Trust Hub</span>
        </a>

        <div className="hidden items-center gap-2 sm:flex">
          <span
            className="rounded-md bg-background px-2.5 py-1.5 font-semibold text-[#0A2540] shadow-sm ring-1 ring-border/60"
            aria-current="page"
          >
            {NETWORK_HUBS.find((h) => h.id === activeHub)?.shortLabel ?? 'Move'}
          </span>
          <SwitchHubMenu compact />
          <a
            href={ASK_TRUST_HUB.standardsUrl}
            className="rounded-md px-2.5 py-1.5 font-medium text-[#3d4f63] hover:bg-background/80 hover:text-[#0A2540]"
            rel="noopener noreferrer"
          >
            Standards
          </a>
        </div>

        <div className="sm:hidden">{mobileSlot}</div>
      </div>
    </div>
  );
}
