'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MoveDesktopNav } from '@/components/nav/move-desktop-nav';
import { MoveMobileNavLoader } from '@/components/nav/move-mobile-nav-loader';
import { HeaderTrustBadge } from '@/components/trust/header-trust-badge';

/** Legacy move navbar — uses mega-dropdown nav (same as HubNavbar move hub). */
export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative">
      <div className="container mx-auto flex h-16 sm:h-[4.5rem] items-center justify-between px-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link prefetch={false} href="/" className="group">
            <Image
              src="/logo.png"
              alt="Move Trust Hub — independent interstate moving directory"
              width={300}
              height={75}
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 180px, 300px"
              className="h-12 w-auto transition-transform group-hover:scale-[1.02] max-w-[300px]"
            />
          </Link>
          <HeaderTrustBadge className="hidden xl:flex" />
        </div>

        <MoveDesktopNav />
        <MoveMobileNavLoader />
      </div>
    </nav>
  );
}