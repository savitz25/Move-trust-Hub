'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FIND_MOVERS_NAV } from '@/lib/nav/move-nav-config';
import { MOVE_HEADER_CTA, MOVE_HEADER_NAV } from '@/lib/design/move-design-system';
import { MyMoveNavLink } from '@/components/save-my-move/my-move-nav-link';
import { ASK_TRUST_HUB } from '@/lib/network/ask-trust-hub';
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
        className={cn(
          'w-full justify-between font-medium text-muted-foreground hover:text-foreground',
          tapTarget
        )}
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

/** Mobile nav mirrors redesign primary items + Find Movers depth. */
export function MoveMobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [moversOpen, setMoversOpen] = useState(false);

  const close = () => setIsOpen(false);

  return (
    <div className="flex lg:hidden items-center gap-2">
      <MyMoveNavLink variant="mobile-header" onNavigate={close} />
      <Button size="sm" asChild className="move-cta min-h-[44px] px-3">
        <Link prefetch={false} href={MOVE_HEADER_CTA.href} onClick={close}>
          {MOVE_HEADER_CTA.label}
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
            <MyMoveNavLink variant="mobile-menu" onNavigate={close} />

            {MOVE_HEADER_NAV.map((link) => (
              <Link
                key={link.href}
                prefetch={false}
                href={link.href}
                className={cn(
                  'font-medium text-muted-foreground hover:text-foreground border-b border-border/50 pb-2 mb-1',
                  tapTarget
                )}
                onClick={close}
              >
                {link.label}
              </Link>
            ))}

            <MobileAccordionSection
              title="More in directory"
              open={moversOpen}
              onToggle={() => setMoversOpen((o) => !o)}
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

            <Link
              prefetch={false}
              href="/about/how-we-score-movers"
              className={cn(
                'font-medium text-muted-foreground hover:text-foreground border-b border-border/50 pb-2 mb-1',
                tapTarget
              )}
              onClick={close}
            >
              How we vet movers
            </Link>

            <a
              href={ASK_TRUST_HUB.url}
              className={cn('font-medium text-muted-foreground hover:text-foreground', tapTarget)}
              rel="noopener noreferrer"
              onClick={close}
            >
              Part of Ask Trust Hub
            </a>

            <Button className="w-full mt-3 min-h-[48px] move-cta" asChild>
              <Link prefetch={false} href={MOVE_HEADER_CTA.href} onClick={close}>
                {MOVE_HEADER_CTA.label}
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
