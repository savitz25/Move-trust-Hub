'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DestinationsMobileNav } from '@/components/navbar/destinations-mobile-nav';
import {
  FIND_MOVERS_NAV,
  GUIDES_NAV,
  MOVE_DIRECT_NAV,
} from '@/lib/nav/move-nav-config';
import { cn } from '@/lib/utils';

const tapTarget =
  'min-h-[48px] flex items-center rounded-md px-2 -mx-2 transition-colors hover:bg-muted/40 active:bg-muted/60';

function MobileAccordionSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-border/50 pb-2 mb-1">
      <button
        type="button"
        className={cn('w-full justify-between font-medium text-muted-foreground hover:text-foreground', tapTarget)}
        aria-expanded={open}
        onClick={onToggle}
      >
        <span>{title}</span>
        <ChevronDown
          className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <div className="pl-1 pb-2 pt-1 space-y-1">{children}</div>
        </div>
      </div>
    </div>
  );
}

/** Mobile accordion nav — mirrors five-item desktop structure. */
export function MoveMobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState<'movers' | 'guides' | null>(null);

  const close = () => setIsOpen(false);

  const toggle = (section: 'movers' | 'guides') => {
    setOpenSection((current) => (current === section ? null : section));
  };

  return (
    <div className="flex lg:hidden items-center gap-2">
      <Button size="sm" asChild className="min-h-[44px] px-3">
        <Link prefetch={false} href="/moving-calculator" onClick={close}>
          Calculator
        </Link>
      </Button>
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
        <div className="absolute left-0 right-0 top-full z-50 border-t bg-background px-4 py-4 shadow-md max-h-[min(80vh,640px)] overflow-y-auto overscroll-contain">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1 text-sm">
            <MobileAccordionSection
              title="Find Movers"
              open={openSection === 'movers'}
              onToggle={() => toggle('movers')}
            >
              {FIND_MOVERS_NAV.flatMap((col) =>
                col.links.map((link) => (
                  <Link
                    key={link.href}
                    prefetch={false}
                    href={link.href}
                    className={cn('text-muted-foreground hover:text-primary', tapTarget)}
                    onClick={close}
                  >
                    {link.label}
                  </Link>
                ))
              )}
            </MobileAccordionSection>

            <DestinationsMobileNav onClose={close} />

            <Link
              prefetch={false}
              href="/verify-dot"
              className={cn(
                'font-medium text-muted-foreground hover:text-foreground border-b border-border/50 pb-3 mb-1',
                tapTarget
              )}
              onClick={close}
            >
              Verify DOT
            </Link>

            <MobileAccordionSection
              title="Guides"
              open={openSection === 'guides'}
              onToggle={() => toggle('guides')}
            >
              {GUIDES_NAV.flatMap((col) =>
                col.links.map((link) => (
                  <Link
                    key={link.href}
                    prefetch={false}
                    href={link.href}
                    className={cn('text-muted-foreground hover:text-primary', tapTarget)}
                    onClick={close}
                  >
                    {link.label}
                  </Link>
                ))
              )}
            </MobileAccordionSection>
          </nav>
        </div>
      ) : null}
    </div>
  );
}