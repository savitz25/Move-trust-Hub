'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Menu, X, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HUBS } from '@/lib/hub/config';
import { hubPath } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';

const DestinationsMobileNav = dynamic(
  () =>
    import('@/components/navbar/destinations-mobile-nav').then(
      (m) => m.DestinationsMobileNav
    ),
  { ssr: false }
);

type HubMobileNavProps = {
  hubId: HubId;
  showMoveExtras: boolean;
  ctaHref?: string;
  ctaLabel?: string;
  shortName: string;
  navLinks: { href: string; label: string }[];
};

export function HubMobileNav({
  hubId,
  showMoveExtras,
  ctaHref,
  ctaLabel,
  shortName,
  navLinks,
}: HubMobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex lg:hidden items-center gap-2">
      {showMoveExtras && ctaHref ? (
        <Button size="sm" className="gap-1.5 min-h-[44px] px-3" asChild>
          <Link prefetch={false} href={ctaHref}>
            <Calculator className="h-4 w-4" aria-hidden="true" />
            Calculator
          </Link>
        </Button>
      ) : ctaHref ? (
        <Button size="sm" asChild className="min-h-[44px]">
          <Link href={ctaHref}>{shortName}</Link>
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

      {isOpen ? (
        <div className="absolute left-0 right-0 top-full z-50 border-t bg-background px-4 py-4 shadow-md">
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
            {navLinks.map((link) => (
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
            {showMoveExtras && ctaHref ? (
              <>
                <Button className="w-full mt-2 min-h-[48px]" asChild>
                  <Link prefetch={false} href={ctaHref} onClick={() => setIsOpen(false)}>
                    {ctaLabel ?? 'Get Started'}
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
    </div>
  );
}