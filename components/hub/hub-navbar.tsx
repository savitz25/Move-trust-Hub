import Link from 'next/link';
import { Calculator } from 'lucide-react';
import { HubLogo } from '@/components/hub/hub-logo';
import { HubMobileNavLoader } from '@/components/hub/hub-mobile-nav-loader';
import { HubSelector } from '@/components/hub/hub-selector';
import { Button } from '@/components/ui/button';
import { DestinationsMegaMenuLazy } from '@/components/navbar/destinations-mega-menu-lazy';
import { getHubConfig } from '@/lib/hub/config';
import { hubPath } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';

export function HubNavbar({ hubId }: { hubId: HubId }) {
  const hub = getHubConfig(hubId);
  const homeHref = hubPath(hubId, '/');
  const showMoveExtras = hubId === 'move';

  const navLinks = hub.navLinks
    .filter((link) => !(showMoveExtras && link.href === '/companies'))
    .slice(showMoveExtras ? 1 : 0);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="border-b bg-muted/30">
        <div className="container mx-auto flex h-10 items-center justify-between px-4">
          <p className="hidden sm:block text-[11px] text-muted-foreground">
            Trust Hub family — independent directories for moves, lenders, and insurance
          </p>
          <HubSelector activeHub={hubId} className="ml-auto" />
        </div>
      </div>

      <div className="relative container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link prefetch={false} href={homeHref} className="group">
            <HubLogo hubId={hubId} priority />
          </Link>
          <div className="hidden md:flex items-center rounded-full bg-muted/70 px-1.5 py-px text-[8px] font-medium tracking-[1px] text-muted-foreground border border-border/50">
            {hub.trustBadge}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-sm">
          {showMoveExtras ? (
            <>
              <Link
                prefetch={false}
                href="/companies"
                className="font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Movers Directory
              </Link>
              <DestinationsMegaMenuLazy />
            </>
          ) : null}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              prefetch={false}
              href={link.href}
              className="font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {hub.ctaLabel && hub.ctaHref ? (
            <Button
              size="sm"
              asChild
              className="gap-2 bg-primary hover:bg-primary/90 shadow-sm"
            >
              <Link prefetch={false} href={hub.ctaHref}>
                {showMoveExtras ? (
                  <Calculator className="h-4 w-4" aria-hidden="true" />
                ) : null}
                {hub.ctaLabel}
              </Link>
            </Button>
          ) : null}
        </div>

        <HubMobileNavLoader
          hubId={hubId}
          showMoveExtras={showMoveExtras}
          ctaHref={hub.ctaHref}
          ctaLabel={hub.ctaLabel}
          shortName={hub.shortName}
          navLinks={navLinks}
        />
      </div>
    </nav>
  );
}