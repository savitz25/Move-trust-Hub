'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { MOVE_BRAND, MOVE_NETWORK_LINKS } from '@/lib/design/move-design-system';
import { resolveSwitchHubHref } from '@/lib/network/hub-last-location';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  compact?: boolean;
};

/**
 * Switch Hub — network sibling + parent Ask destinations (Move chrome).
 * Specialist hubs use resume entry URLs (last path restored on target).
 */
export function SwitchHubMenu({ className, compact = false }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type="button"
        className={cn(
          'inline-flex min-h-9 items-center gap-1.5 rounded-xl border bg-white px-3 py-1.5 text-sm font-semibold transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A1F] focus-visible:ring-offset-2',
          'hover:border-[#FF5A1F]/40 hover:bg-[#FFF4F0]'
        )}
        style={{
          borderColor: MOVE_BRAND.border,
          color: MOVE_BRAND.navy,
        }}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {compact ? 'Hubs' : 'Switch Hub'}
        <ChevronDown
          className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')}
          style={{ color: MOVE_BRAND.orange }}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          id={panelId}
          role="menu"
          aria-label="Switch Trust Hub"
          className="absolute right-0 z-[80] mt-2 w-[min(100vw-2rem,18rem)] overflow-hidden rounded-2xl border bg-white py-2 shadow-lg"
          style={{ borderColor: MOVE_BRAND.border }}
        >
          <p
            className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: MOVE_BRAND.orange }}
          >
            Ask network
          </p>
          <ul className="space-y-0.5 px-1.5">
            {MOVE_NETWORK_LINKS.map((hub) => (
              <li key={hub.id}>
                <a
                  role="menuitem"
                  href={resolveSwitchHubHref(hub.id, hub.href)}
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 rounded-xl px-2.5 py-2.5 transition-colors hover:bg-[#FFF4F0]"
                  onClick={() => setOpen(false)}
                >
                  <span className="min-w-0 flex-1">
                    <span
                      className="block text-sm font-semibold"
                      style={{ color: MOVE_BRAND.navy }}
                    >
                      {hub.label}
                    </span>
                    <span
                      className="mt-0.5 block text-xs leading-snug"
                      style={{ color: MOVE_BRAND.ink }}
                    >
                      {hub.blurb}
                    </span>
                  </span>
                  <ExternalLink
                    className="mt-0.5 h-3.5 w-3.5 shrink-0"
                    style={{ color: MOVE_BRAND.orange }}
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
          <p
            className="mt-1 border-t px-3 pt-2 text-[11px] leading-relaxed"
            style={{ borderColor: MOVE_BRAND.border, color: MOVE_BRAND.ink }}
          >
            You are on Move Trust Hub — independent FMCSA mover research.
          </p>
        </div>
      ) : null}
    </div>
  );
}
