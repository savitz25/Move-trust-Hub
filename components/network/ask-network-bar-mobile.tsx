'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
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

const HUB_BLURB: Record<HubLinkId, string> = {
  move: 'Moving directory · FMCSA research',
  insurance: 'Insurance research · plans & agents',
  lender: 'Lending research · NMLS lenders',
};

/**
 * Mobile hub switcher only — desktop network pills are SSR in AskNetworkBarStatic.
 */
export function AskNetworkBarMobile({ activeHub }: { activeHub: NetworkHubId }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  const activeLabel =
    NETWORK_HUBS.find((h) => h.id === activeHub)?.shortLabel ?? 'Hub';

  const links = [
    ...NETWORK_HUBS.map((h) => {
      const id = h.id as HubLinkId;
      const active = h.id === activeHub;
      return {
        id: h.id as string,
        proseName: h.proseName,
        blurb: HUB_BLURB[id],
        href: active ? h.url : networkHubHref(id, true, HUB_HOME[id]),
        toHub: id as HubLinkId,
        nextPath: HUB_HOME[id],
        active,
        sameOriginHandoff: !active,
        external: active,
      };
    }),
    {
      id: 'standards',
      proseName: 'Ask Trust Hub Standards',
      blurb: 'Shared research standard · no paid placements',
      href: ASK_TRUST_HUB.standardsUrl,
      toHub: null as HubLinkId | null,
      nextPath: undefined as string | undefined,
      active: false,
      sameOriginHandoff: false,
      external: true,
    },
  ];

  return (
    <>
      <button
        type="button"
        className="inline-flex min-h-11 min-w-[7.5rem] items-center justify-center gap-1.5 rounded-md border border-border/80 bg-background px-3 py-2 text-sm font-semibold text-[#0A2540] shadow-sm"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
      >
        Switch hub
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {open ? (
        <div className="sm:hidden">
          <button
            type="button"
            className="fixed inset-0 z-[100] bg-black/40"
            aria-label="Close hub switcher"
            onClick={close}
          />
          <div
            ref={panelRef}
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Switch Trust Hub site"
            className="fixed inset-x-0 bottom-0 z-[110] max-h-[min(85vh,32rem)] overflow-y-auto rounded-t-2xl border border-border bg-background pb-[env(safe-area-inset-bottom)] shadow-2xl"
          >
            <div className="sticky top-0 flex items-start justify-between gap-3 border-b bg-background px-4 py-3">
              <div className="min-w-0">
                <p className="text-base font-semibold text-[#0A2540]">All Trust Hub sites</p>
                <p className="mt-0.5 text-xs leading-snug text-[#3d4f63]">
                  Same Ask Trust Hub account across Move, Insurance, and Lending. You are on{' '}
                  {activeLabel}.
                </p>
              </div>
              <button
                type="button"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-[#0A2540]"
                aria-label="Close"
                onClick={close}
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <ul className="p-2" role="list">
              {links.map((link) => {
                const rowClass = cn(
                  'flex min-h-[52px] w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors',
                  link.active
                    ? 'bg-primary/10 ring-1 ring-primary/25'
                    : 'hover:bg-muted active:bg-muted'
                );
                const body = (
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[15px] font-semibold text-[#0A2540]">
                        {link.proseName}
                      </span>
                      {link.active ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-semibold text-primary">
                          <Check className="h-3 w-3" aria-hidden />
                          You are here
                        </span>
                      ) : null}
                    </div>
                    {link.blurb ? (
                      <p className="mt-0.5 text-xs leading-snug text-[#3d4f63]">{link.blurb}</p>
                    ) : null}
                  </div>
                );

                if (link.active) {
                  return (
                    <li key={link.id}>
                      <div className={rowClass}>{body}</div>
                    </li>
                  );
                }
                if (link.sameOriginHandoff && link.toHub) {
                  return (
                    <li key={link.id}>
                      <NetworkHandoffLink
                        href={link.href}
                        toHub={link.toHub}
                        nextPath={link.nextPath}
                        className={rowClass}
                        onClick={close}
                      >
                        {body}
                      </NetworkHandoffLink>
                    </li>
                  );
                }
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className={rowClass}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      onClick={close}
                    >
                      {body}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
