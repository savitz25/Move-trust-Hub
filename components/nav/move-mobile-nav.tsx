'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOVE_HEADER_CTA } from '@/lib/design/move-design-system';
import { MOVE_MEGA_NAV } from '@/lib/nav/move-mega-menu-config';
import { MyMoveNavLink } from '@/components/save-my-move/my-move-nav-link';
import { ASK_TRUST_HUB } from '@/lib/network/ask-trust-hub';
import { cn } from '@/lib/utils';

const tapTarget =
  'min-h-[48px] flex items-center rounded-md px-2 -mx-2 transition-colors hover:bg-primary/[0.04] active:bg-primary/[0.06]';

function MobileAccordionSection({
  title,
  open,
  onToggle,
  children,
  href,
  onNavigate,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
  href?: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="mb-1 border-b border-border/60 pb-2">
      <div className="flex items-stretch gap-1">
        {href ? (
          <Link
            prefetch={false}
            href={href}
            onClick={onNavigate}
            className={cn(
              'flex-1 font-semibold !text-[#1E293B] hover:!text-[#FF5A1F]',
              tapTarget
            )}
          >
            {title}
          </Link>
        ) : (
          <span className={cn('flex-1 font-semibold !text-[#1E293B]', tapTarget)}>
            {title}
          </span>
        )}
        <button
          type="button"
          className={cn(
            'flex min-h-11 min-w-11 items-center justify-center rounded-md !text-[#1E293B] hover:!text-[#FF5A1F]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30'
          )}
          aria-expanded={open}
          aria-label={open ? `Collapse ${title}` : `Expand ${title}`}
          onClick={onToggle}
        >
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              open && 'rotate-180'
            )}
            aria-hidden
          />
        </button>
      </div>
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-1 pb-2 pl-1 pt-1">{children}</div>
        </div>
      </div>
    </div>
  );
}

/** Mobile: accordion mega content under each primary nav item. */
export function MoveMobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const close = () => {
    setIsOpen(false);
    setOpenSection(null);
  };

  const toggle = (id: string) => {
    setOpenSection((current) => (current === id ? null : id));
  };

  return (
    <div className="flex items-center gap-2 lg:hidden">
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
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen ? (
        <div className="absolute left-0 right-0 top-full z-50 max-h-[min(80vh,640px)] overflow-y-auto overscroll-contain border-t border-border/80 bg-white px-4 py-4 shadow-[0_12px_32px_-8px_rgb(10_37_64_/_0.15)]">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1 text-sm">
            <MyMoveNavLink variant="mobile-menu" onNavigate={close} />

            {MOVE_MEGA_NAV.map((item) => (
              <MobileAccordionSection
                key={item.id}
                title={item.label}
                href={item.href}
                open={openSection === item.id}
                onToggle={() => toggle(item.id)}
                onNavigate={close}
              >
                {item.columns.flatMap((col) =>
                  col.links.map((link) => (
                    <Link
                      key={link.href}
                      prefetch={false}
                      href={link.href}
                      className={cn(
                        'rounded-lg px-2 py-2 font-medium text-slate-700 hover:bg-primary/[0.04] hover:text-primary',
                        tapTarget
                      )}
                      onClick={close}
                    >
                      <span className="block">{link.label}</span>
                      {link.description ? (
                        <span className="mt-0.5 block text-xs font-normal text-slate-600">
                          {link.description}
                        </span>
                      ) : null}
                    </Link>
                  ))
                )}
                {item.cta ? (
                  <Link
                    prefetch={false}
                    href={item.cta.href}
                    onClick={close}
                    className="move-cta mt-2 inline-flex min-h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold text-white"
                    style={{ backgroundColor: '#FF5A1F', color: '#FFFFFF' }}
                  >
                    {item.cta.label}
                  </Link>
                ) : null}
              </MobileAccordionSection>
            ))}

            <a
              href={ASK_TRUST_HUB.url}
              className={cn(
                'font-medium text-slate-700 hover:text-primary',
                tapTarget
              )}
              rel="noopener noreferrer"
              onClick={close}
            >
              Ask Trust Hub network
            </a>

            <Button className="move-cta mt-3 min-h-[48px] w-full" asChild>
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
