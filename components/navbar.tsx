'use client';

import Link from 'next/link';
import { TrustHubLogoImage } from '@/components/hub/trust-hub-logo-image';
import { MoveDesktopNav } from '@/components/nav/move-desktop-nav';
import { MoveMobileNavLoader } from '@/components/nav/move-mobile-nav-loader';
import { HeaderTrustBadge } from '@/components/trust/header-trust-badge';

/** Legacy move navbar — same product nav as HubNavbar move hub (redesign 2026). */
export function Navbar() {
  return (
    <nav
      data-hub="move"
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative"
      aria-label="Primary"
    >
      <div className="container mx-auto flex h-16 sm:h-[4.5rem] items-center justify-between px-4 relative overflow-visible">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link prefetch={false} href="/" className="group">
            <span className="hub-logo-slot relative block shrink-0 max-w-[300px] move-hub-pulse">
              <TrustHubLogoImage variant="header" priority />
            </span>
          </Link>
          <HeaderTrustBadge moving className="hidden xl:flex" />
        </div>

        <MoveDesktopNav />
        <MoveMobileNavLoader />
      </div>
    </nav>
  );
}