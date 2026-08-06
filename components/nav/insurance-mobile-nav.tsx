'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MyInsuranceNavLink } from '@/components/nav/my-insurance-nav-link';
import {
  INSURANCE_DIRECTORY_NAV,
  INSURANCE_MOBILE_NAV,
  INSURANCE_NAV_CTA,
  insuranceNavLinkActive,
  insurancePathnameBare,
} from '@/lib/nav/insurance-nav-config';
import { cn } from '@/lib/utils';

const tapTarget =
  'min-h-[48px] flex items-center rounded-md px-2 -mx-2 transition-colors hover:bg-muted/40 active:bg-muted/60';

/**
 * Insurance mobile header: My Insurance + CTA chip + hamburger drawer
 * with the same primary items as desktop (not Contact-only).
 */
export function InsuranceMobileNav() {
  const pathname = usePathname();
  const bare = insurancePathnameBare(pathname);
  const [isOpen, setIsOpen] = useState(false);
  const [directoriesOpen, setDirectoriesOpen] = useState(false);
  const panelId = useId();

  const close = () => {
    setIsOpen(false);
    setDirectoriesOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
      <MyInsuranceNavLink
        variant="mobile-header"
        onNavigate={close}
        active={insuranceNavLinkActive('/my-insurance', bare)}
      />
      <Button size="sm" asChild className="min-h-[44px] px-2.5 sm:px-3">
        <Link prefetch={false} href={INSURANCE_NAV_CTA.href} onClick={close}>
          <span className="sm:hidden">Directory</span>
          <span className="hidden sm:inline">{INSURANCE_NAV_CTA.label}</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-11 w-11"
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen ? (
        <div
          id={panelId}
          className="absolute left-0 right-0 top-full z-50 border-t bg-background px-4 py-4 shadow-md max-h-[min(80vh,640px)] overflow-y-auto overscroll-contain"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1 text-sm">
            <MyInsuranceNavLink
              variant="mobile-menu"
              onNavigate={close}
              active={insuranceNavLinkActive('/my-insurance', bare)}
            />

            <div className="border-b border-border/50 pb-2 mb-1">
              <button
                type="button"
                className={cn(
                  'w-full justify-between font-medium text-muted-foreground hover:text-foreground',
                  tapTarget
                )}
                aria-expanded={directoriesOpen}
                onClick={() => setDirectoriesOpen((o) => !o)}
              >
                <span>Directory</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    directoriesOpen && 'rotate-180'
                  )}
                  aria-hidden
                />
              </button>
              {directoriesOpen ? (
                <div className="pl-1 pb-2 pt-1 space-y-1">
                  {INSURANCE_DIRECTORY_NAV.map((link) => {
                    const active = insuranceNavLinkActive(link.href, bare);
                    return (
                      <Link
                        key={link.href}
                        prefetch={false}
                        href={link.href}
                        className={cn(
                          'text-muted-foreground hover:text-primary',
                          tapTarget,
                          active && 'text-foreground font-semibold'
                        )}
                        aria-current={active ? 'page' : undefined}
                        onClick={close}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>

            {INSURANCE_MOBILE_NAV.filter(
              (l) => l.href !== '/directory' && l.href !== '/my-insurance'
            ).map((link) => {
              const active = insuranceNavLinkActive(link.href, bare);
              return (
                <Link
                  key={link.href}
                  prefetch={false}
                  href={link.href}
                  className={cn(
                    'font-medium text-muted-foreground hover:text-foreground border-b border-border/50 pb-2 mb-1',
                    tapTarget,
                    active && 'text-foreground font-semibold'
                  )}
                  aria-current={active ? 'page' : undefined}
                  onClick={close}
                >
                  {link.label}
                </Link>
              );
            })}

            <Button className="w-full mt-3 min-h-[48px]" asChild>
              <Link prefetch={false} href={INSURANCE_NAV_CTA.href} onClick={close}>
                {INSURANCE_NAV_CTA.label}
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
