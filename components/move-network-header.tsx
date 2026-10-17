'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { Menu, ShieldCheck, X } from 'lucide-react';
import { MoveBrandLockup } from '@/components/move-brand-lockup';
import { MoveMegaMenu } from '@/components/nav/move-mega-menu';
import { useMyTrustHubHref } from '@/components/my-trusthub/my-trusthub-origin';
import { MyMoveNavLink } from '@/components/save-my-move/my-move-nav-link';
import { SwitchHubMenu } from '@/components/switch-hub-menu';
import { MOVE_HEADER_CTA } from '@/lib/design/move-design-system';
import { MOVE_MEGA_NAV } from '@/lib/nav/move-mega-menu-config';

/**
 * Always-on consumer account entry. My Move stays the local workspace.
 * This control is the only header account link, including when the
 * one-account presentation flag is already on, so the flag cannot add a
 * second account destination.
 */
function MoveCanonicalAccountEntry({
  variant,
  onNavigate,
}: {
  variant: 'desktop' | 'mobile-header' | 'drawer';
  onNavigate?: () => void;
}) {
  const href = useMyTrustHubHref('/my/sign-in');
  const title = 'My TrustHub — sign in to your account';

  if (variant === 'mobile-header') {
    return (
      <a href={href} className="th-btn-icon" aria-label="My TrustHub" title={title} data-mth-account-entry="sign-in">
        <ShieldCheck className="h-5 w-5" aria-hidden="true" />
      </a>
    );
  }

  if (variant === 'drawer') {
    return (
      <a href={href} className="th-drawer-link" title={title} data-mth-account-entry="sign-in" onClick={onNavigate}>
        <ShieldCheck className="mr-2 h-4 w-4" aria-hidden="true" />
        My TrustHub
      </a>
    );
  }

  return (
    <a href={href} className="th-btn-secondary !h-11 !text-sm" title={title} data-mth-account-entry="sign-in">
      <ShieldCheck className="h-4 w-4" aria-hidden="true" />
      My TrustHub
    </a>
  );
}

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
          <MoveCanonicalAccountEntry variant="desktop" />
          <MyMoveNavLink variant="desktop" className="th-btn-secondary !h-11 !text-sm" />
          <SwitchHubMenu currentHubId="move" />
        </div>

        <div className="th-header-mobile-actions">
          <MoveCanonicalAccountEntry variant="mobile-header" />
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
              <MoveCanonicalAccountEntry variant="drawer" onNavigate={() => setOpen(false)} />
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
