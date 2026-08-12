import type { ReactNode } from 'react';
import {
  ASK_TRUST_HUB,
  NETWORK_HUBS,
  type NetworkHubId,
} from '@/lib/network/ask-trust-hub';
import { networkHubHref, type HubLinkId } from '@/lib/network/handoff-href';
import { cn } from '@/lib/utils';

const HUB_HOME: Record<HubLinkId, string> = {
  move: '/my-move',
  insurance: '/my-insurance',
  lender: '/my-lending',
  contractor: '/',
};

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

        <nav
          aria-label="Ask Trust Hub network"
          className="hidden items-center gap-1 sm:flex"
        >
          {NETWORK_HUBS.map((h) => {
            const id = h.id as HubLinkId;
            const active = h.id === activeHub;
            if (active) {
              return (
                <span
                  key={h.id}
                  className="rounded-md bg-background px-2.5 py-1.5 font-semibold text-[#0A2540] shadow-sm ring-1 ring-border/60"
                  aria-current="page"
                >
                  {h.shortLabel}
                </span>
              );
            }
            const href = networkHubHref(id, true, HUB_HOME[id]);
            return (
              <a
                key={h.id}
                href={href}
                className="rounded-md px-2.5 py-1.5 font-medium text-[#3d4f63] hover:bg-background/80 hover:text-[#0A2540]"
              >
                {h.shortLabel}
              </a>
            );
          })}
          <a
            href={ASK_TRUST_HUB.standardsUrl}
            className="rounded-md px-2.5 py-1.5 font-medium text-[#3d4f63] hover:bg-background/80 hover:text-[#0A2540]"
            rel="noopener noreferrer"
          >
            Standards
          </a>
        </nav>

        <div className="sm:hidden">{mobileSlot}</div>
      </div>
    </div>
  );
}
