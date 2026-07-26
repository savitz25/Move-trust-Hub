import Link from 'next/link';
import { HubLogo } from '@/components/hub/hub-logo';
import { HubMobileNavLoader } from '@/components/hub/hub-mobile-nav-loader';
import { MoveDesktopNavLoader } from '@/components/nav/move-desktop-nav-loader';
import { MoveMobileNavLoader } from '@/components/nav/move-mobile-nav-loader';
import { Button } from '@/components/ui/button';
import { getHubConfig } from '@/lib/hub/config';
import { hubPath } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';
import { HeaderTrustBadge } from '@/components/trust/header-trust-badge';

export function HubNavbar({ hubId }: { hubId: HubId }) {
  const hub = getHubConfig(hubId);
  const homeHref = hubPath(hubId, '/');
  const navLinks = hub.navLinks;
  const isMoveHub = hubId === 'move';

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      aria-label="Primary"
    >
      <div className="container mx-auto relative flex h-16 sm:h-[4.5rem] items-center justify-between px-4 overflow-visible">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link
            prefetch={false}
            href={homeHref}
            className="group shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={`${hub.siteName} home`}
          >
            {/* eager but not fetchPriority=high — keep SSR H1 as LCP */}
            <HubLogo hubId={hubId} priority />
          </Link>
          <HeaderTrustBadge />
        </div>

        {isMoveHub ? (
          <MoveDesktopNavLoader />
        ) : (
          <div className="hidden lg:flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                prefetch={false}
                href={link.href}
                className="font-medium text-[#3d4f63] hover:text-foreground transition-colors whitespace-nowrap rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {link.label}
              </Link>
            ))}
            {hub.ctaLabel && hub.ctaHref ? (
              <Button size="sm" asChild className="bg-primary hover:bg-primary/90 shadow-sm min-h-9 min-w-[2.75rem]">
                <Link prefetch={false} href={hub.ctaHref}>
                  {hub.ctaLabel}
                </Link>
              </Button>
            ) : null}
          </div>
        )}

        {isMoveHub ? (
          <MoveMobileNavLoader />
        ) : (
          <HubMobileNavLoader
            ctaHref={hub.ctaHref}
            ctaLabel={hub.ctaLabel}
            shortName={hub.shortName}
            navLinks={navLinks}
          />
        )}
      </div>
    </nav>
  );
}