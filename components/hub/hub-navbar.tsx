'use client';

import Link from 'next/link';
import { useState } from 'react';
import { HubLogo } from '@/components/hub/hub-logo';
import { usePathname } from 'next/navigation';
import { Menu, X, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HubSelector } from '@/components/hub/hub-selector';
import { getHubConfig, HUBS } from '@/lib/hub/config';
import { getHubFromPathname, hubPath } from '@/lib/hub/paths';
import { DestinationsMegaMenuLazy } from '@/components/navbar/destinations-mega-menu-lazy';
import { DestinationsMobileNav } from '@/components/navbar/destinations-mobile-nav';

export function HubNavbar() {
  const pathname = usePathname() ?? '/';
  const hubId = getHubFromPathname(pathname);
  const hub = getHubConfig(hubId);
  const [isOpen, setIsOpen] = useState(false);

  const homeHref = hubPath(hubId, '/');
  const showMoveExtras = hubId === 'move';

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="border-b bg-muted/30">
        <div className="container mx-auto flex h-10 items-center justify-between px-4">
          <p className="hidden sm:block text-[11px] text-muted-foreground">
            Trust Hub family — independent directories for moves, lenders, and insurance
          </p>
          <HubSelector className="ml-auto" />
        </div>
      </div>

      <div className="container mx-auto flex h-20 items-center justify-between px-4">
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
          {hub.navLinks
            .filter((link) => !(showMoveExtras && link.href === '/companies'))
            .slice(showMoveExtras ? 1 : 0)
            .map((link) => (
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

        <div className="flex lg:hidden items-center gap-2">
          {showMoveExtras && hub.ctaHref ? (
            <Button size="sm" className="gap-1.5 min-h-[44px] px-3" asChild>
              <Link prefetch={false} href={hub.ctaHref}>
                <Calculator className="h-4 w-4" aria-hidden="true" />
                Calculator
              </Link>
            </Button>
          ) : hub.ctaHref ? (
            <Button size="sm" asChild className="min-h-[44px]">
              <Link href={hub.ctaHref}>{hub.shortName}</Link>
            </Button>
          ) : null}
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isOpen ? (
        <div className="lg:hidden border-t bg-background px-4 py-4">
          <div className="flex flex-col gap-3 text-sm">
            {showMoveExtras ? (
              <>
                <Link
                  prefetch={false}
                  href="/companies"
                  className="py-3 min-h-[44px] flex items-center font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Movers Directory
                </Link>
                <DestinationsMobileNav onClose={() => setIsOpen(false)} />
              </>
            ) : null}
            {hub.navLinks.map((link) => (
              <Link
                key={link.href}
                prefetch={false}
                href={link.href}
                className="py-3 min-h-[44px] flex items-center font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {showMoveExtras && hub.ctaHref ? (
              <>
                <Button className="w-full mt-2 min-h-[48px]" asChild>
                  <Link prefetch={false} href={hub.ctaHref} onClick={() => setIsOpen(false)}>
                    Use Free Moving Calculator
                  </Link>
                </Button>
                <Link
                  prefetch={false}
                  href="/companies"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-2 text-primary"
                >
                  Compare Trusted Movers →
                </Link>
              </>
            ) : null}
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground mb-2">Switch hub</p>
              <div className="flex flex-wrap gap-2">
                {(['move', 'lender', 'insurance'] as const).map((id) => (
                  <Link
                    key={id}
                    href={hubPath(id, '/')}
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-medium text-primary"
                  >
                    {HUBS[id].shortName}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}