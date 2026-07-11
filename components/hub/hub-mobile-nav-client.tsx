'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type HubMobileNavProps = {
  ctaHref?: string;
  ctaLabel?: string;
  shortName: string;
  navLinks: { href: string; label: string }[];
};

export function HubMobileNav({
  ctaHref,
  ctaLabel,
  shortName,
  navLinks,
}: HubMobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex lg:hidden items-center gap-2">
      {ctaHref && ctaLabel ? (
        <Button size="sm" asChild className="min-h-[44px] px-3">
          <Link prefetch={false} href={ctaHref}>
            {ctaLabel}
          </Link>
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
          <div className="flex flex-col gap-1 text-sm">
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
            {ctaHref && ctaLabel ? (
              <Button className="w-full mt-3 min-h-[48px]" asChild>
                <Link prefetch={false} href={ctaHref} onClick={() => setIsOpen(false)}>
                  {ctaLabel}
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}