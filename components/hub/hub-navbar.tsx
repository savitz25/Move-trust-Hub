import Link from 'next/link';
import { HubLogo } from '@/components/hub/hub-logo';
import { HubMobileNavLoader } from '@/components/hub/hub-mobile-nav-loader';
import { MoveDesktopNav } from '@/components/nav/move-desktop-nav';
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
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto relative flex h-16 sm:h-[4.5rem] items-center justify-between px-4 overflow-visible">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link prefetch={false} href={homeHref} className="group shrink-0">
            <HubLogo hubId={hubId} priority />
          </Link>
          <HeaderTrustBadge className="hidden xl:flex" />
        </div>

        {isMoveHub ? (
          <MoveDesktopNav />
        ) : (
          <div className="hidden lg:flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                prefetch={false}
                href={link.href}
                className="font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
            {hub.ctaLabel && hub.ctaHref ? (
              <Button size="sm" asChild className="bg-primary hover:bg-primary/90 shadow-sm">
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