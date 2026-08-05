'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  ASK_TRUST_HUB,
  NETWORK_HUBS,
  type NetworkHubId,
} from '@/lib/network/ask-trust-hub';
import { networkHubHref, type HubLinkId } from '@/lib/network/handoff-href';
import { NetworkHandoffLink } from '@/components/network/network-handoff-link';
import { cn } from '@/lib/utils';

const HUB_HOME: Record<HubLinkId, string> = {
  move: '/my-move',
  insurance: '/my-insurance',
  lender: '/my-lending',
};

type AskNetworkBarProps = {
  activeHub: NetworkHubId;
  className?: string;
};

/**
 * Slim network bar. Other specialist hubs always use same-origin SSO /start
 * (POST with access_token when signed in; guest GET → plain 307 without code).
 */
export function AskNetworkBar({ activeHub, className }: AskNetworkBarProps) {
  const [open, setOpen] = useState(false);

  const links = [
    ...NETWORK_HUBS.map((h) => {
      const id = h.id as HubLinkId;
      const active = h.id === activeHub;
      const nextPath = HUB_HOME[id];
      return {
        id: h.id as string,
        label: h.shortLabel,
        href: active ? h.url : networkHubHref(id, true, nextPath),
        toHub: id,
        nextPath,
        external: active,
        active,
        sameOriginHandoff: !active,
      };
    }),
    {
      id: 'standards',
      label: 'Standards',
      href: ASK_TRUST_HUB.standardsUrl,
      toHub: null as HubLinkId | null,
      nextPath: undefined as string | undefined,
      external: true,
      active: false,
      sameOriginHandoff: false,
    },
  ];

  return (
    <div
      className={cn(
        'border-b border-border/70 bg-muted/30 text-[12px] text-muted-foreground',
        className
      )}
    >
      <div className="container mx-auto flex min-h-9 items-center justify-between gap-3 px-4 py-1.5 sm:min-h-10">
        <a
          href={ASK_TRUST_HUB.url}
          className="shrink-0 font-semibold tracking-tight text-foreground/80 hover:text-foreground"
          rel="noopener noreferrer"
        >
          <span className="hidden sm:inline">Ask Trust Hub Network</span>
          <span className="sm:hidden">Network</span>
        </a>

        <nav
          aria-label="Ask Trust Hub network"
          className="hidden items-center gap-1 sm:flex"
        >
          {links.map((link) =>
            link.active ? (
              <span
                key={link.id}
                className="rounded-md bg-background px-2.5 py-1 font-semibold text-foreground shadow-sm ring-1 ring-border/60"
                aria-current="page"
              >
                {link.label}
              </span>
            ) : link.sameOriginHandoff && link.toHub ? (
              <NetworkHandoffLink
                key={link.id}
                href={link.href}
                toHub={link.toHub}
                nextPath={link.nextPath}
                className="rounded-md px-2.5 py-1 font-medium hover:bg-background/80 hover:text-foreground"
              >
                {link.label}
              </NetworkHandoffLink>
            ) : (
              <a
                key={link.id}
                href={link.href}
                className="rounded-md px-2.5 py-1 font-medium hover:bg-background/80 hover:text-foreground"
                rel={link.external ? 'noopener noreferrer' : undefined}
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        <div className="relative sm:hidden">
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-medium text-foreground"
            aria-expanded={open}
            aria-controls="ask-network-bar-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {NETWORK_HUBS.find((h) => h.id === activeHub)?.shortLabel ?? 'Hub'}
            <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} />
          </button>
          {open ? (
            <div
              id="ask-network-bar-menu"
              className="absolute right-0 top-full z-50 mt-1 min-w-[10rem] rounded-md border bg-background py-1 shadow-md"
            >
              {links.map((link) =>
                link.active ? (
                  <div
                    key={link.id}
                    className="px-3 py-2 font-semibold text-foreground"
                    aria-current="page"
                  >
                    {link.label}
                  </div>
                ) : link.sameOriginHandoff && link.toHub ? (
                  <NetworkHandoffLink
                    key={link.id}
                    href={link.href}
                    toHub={link.toHub}
                    nextPath={link.nextPath}
                    className="block px-3 py-2 hover:bg-muted"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </NetworkHandoffLink>
                ) : (
                  <a
                    key={link.id}
                    href={link.href}
                    className="block px-3 py-2 hover:bg-muted"
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
