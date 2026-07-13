'use client';

import Link from 'next/link';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { IMAGE_SIZES } from '@/lib/images/constants';
import { TRUST_HUB_LOGO } from '@/lib/hub/config';
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
            <span className="hub-logo-slot relative block shrink-0 max-w-[300px]">
              <OptimizedImage
                src={TRUST_HUB_LOGO.src}
                alt={TRUST_HUB_LOGO.alt}
                width={TRUST_HUB_LOGO.width}
                height={TRUST_HUB_LOGO.height}
                priority
                fetchPriority="high"
                sizes={IMAGE_SIZES.headerLogo}
                className="h-full w-full object-contain object-left transition-transform group-hover:scale-[1.02]"
              />
            </span>
          </Link>
          <HeaderTrustBadge className="hidden xl:flex" />
        </div>

        <MoveDesktopNav />
        <MoveMobileNavLoader />
      </div>
    </nav>
  );
}