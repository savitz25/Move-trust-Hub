'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { MoveBrandLockup } from '@/components/move-brand-lockup';
import { MoveMegaMenu } from '@/components/nav/move-mega-menu';
import { MyMoveNavLink } from '@/components/save-my-move/my-move-nav-link';
import { SwitchHubMenu } from '@/components/switch-hub-menu';
import { MOVE_HEADER_CTA } from '@/lib/design/move-design-system';
import { MOVE_MEGA_NAV } from '@/lib/nav/move-mega-menu-config';

/**
 * VISUAL-006 Move global product header — 69 / 65 / 57.
 * Coach and Journey remain sibling surfaces below this header.
 */
export function MoveNetworkHeader() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const drawerId = useId();
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menuRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header data-hub="move" className="th-header sticky top-0 z-50">
      <a href="#main-content" className="th-skip">
        Skip to content
      </a>
      <div className="th-header-inner th-shell">
        <MoveBrandLockup />

        <nav aria-label="Primary" className="th-header-nav">
          {MOVE_MEGA_NAV.map((item) => {
            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`) ||
              (item.id === 'by-state' && pathname.startsWith('/local-movers')) ||
              (item.id === 'find-movers' &&
                (pathname.startsWith('/companies') || pathname.startsWith('/auto-transport')));
            return <MoveMegaMenu key={item.id} item={item} active={active} />;
          })}
        </nav>

        <div className="th-header-actions">
          <MyMoveNavLink variant="desktop" className="th-btn-secondary !h-11 !text-sm" />
          <SwitchHubMenu currentHubId="move" />
        </div>

        <div className="th-header-mobile-actions">
          <MyMoveNavLink variant="mobile-header" />
          <button
            ref={menuRef}
            type="button"
            className="th-btn-icon"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={drawerId}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <>
          <button
            type="button"
            className="th-drawer-backdrop"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            id={drawerId}
            className="th-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Move Trust Hub menu"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {MOVE_MEGA_NAV.map((item) => (
                <Link
                  key={item.href}
                  prefetch={false}
                  href={item.href}
                  className="th-drawer-link"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                prefetch={false}
                href={MOVE_HEADER_CTA.href}
                className="th-drawer-link"
                onClick={() => setOpen(false)}
              >
                {MOVE_HEADER_CTA.label}
              </Link>
              <Link prefetch={false} href="/my-move" className="th-drawer-link" onClick={() => setOpen(false)}>
                My Move
              </Link>
              <div className="mt-4 border-t border-[#E2E8F0] pt-4">
                <SwitchHubMenu variant="embedded" currentHubId="move" />
              </div>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
