'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MyInsuranceNavLink } from '@/components/nav/my-insurance-nav-link';
import {
  INSURANCE_DIRECTORY_NAV,
  INSURANCE_NAV_CTA,
  INSURANCE_PRIMARY_NAV,
  insuranceNavLinkActive,
  insurancePathnameBare,
} from '@/lib/nav/insurance-nav-config';
import { cn } from '@/lib/utils';

const linkClass =
  'font-medium text-[#3d4f63] hover:text-foreground transition-colors whitespace-nowrap rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';

/**
 * Insurance desktop primary nav (lg+).
 * Directory · Calculators · Guides · Methodology · Trust & Transparency · My Insurance · Contact · CTA
 */
export function InsuranceDesktopNav() {
  const pathname = usePathname();
  const bare = insurancePathnameBare(pathname);
  const [directoriesOpen, setDirectoriesOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!directoriesOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setDirectoriesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDirectoriesOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [directoriesOpen]);

  const directoryActive = INSURANCE_DIRECTORY_NAV.some((l) =>
    insuranceNavLinkActive(l.href, bare)
  );

  return (
    <div className="hidden lg:flex items-center gap-3 xl:gap-4 text-sm">
      <div className="relative" ref={rootRef}>
        <button
          type="button"
          className={cn(
            linkClass,
            'inline-flex items-center gap-1',
            directoryActive && 'text-foreground font-semibold'
          )}
          aria-expanded={directoriesOpen}
          aria-controls={panelId}
          aria-haspopup="true"
          onClick={() => setDirectoriesOpen((o) => !o)}
        >
          Directory
          <ChevronDown
            className={cn('h-4 w-4 transition-transform', directoriesOpen && 'rotate-180')}
            aria-hidden
          />
        </button>
        {directoriesOpen ? (
          <div
            id={panelId}
            role="menu"
            className="absolute left-0 top-full z-50 mt-2 w-72 rounded-xl border bg-card py-2 shadow-lg"
          >
            {INSURANCE_DIRECTORY_NAV.map((link) => {
              const active = insuranceNavLinkActive(link.href, bare);
              return (
                <Link
                  key={link.href}
                  role="menuitem"
                  prefetch={false}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'block px-4 py-2.5 hover:bg-muted/60 focus-visible:outline-none focus-visible:bg-muted/60',
                    active && 'bg-muted/40'
                  )}
                  onClick={() => setDirectoriesOpen(false)}
                >
                  <span className="block text-sm font-medium text-foreground">{link.label}</span>
                  {link.description ? (
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {link.description}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>

      {INSURANCE_PRIMARY_NAV.filter((l) => l.href !== '/directory').map((link) => {
        const active = insuranceNavLinkActive(link.href, bare);
        return (
          <Link
            key={link.href}
            prefetch={false}
            href={link.href}
            className={cn(linkClass, active && 'text-foreground font-semibold')}
            aria-current={active ? 'page' : undefined}
          >
            {link.label}
          </Link>
        );
      })}

      <MyInsuranceNavLink
        variant="desktop"
        active={insuranceNavLinkActive('/my-insurance', bare)}
      />

      <Link
        prefetch={false}
        href="/contact"
        className={cn(linkClass, insuranceNavLinkActive('/contact', bare) && 'text-foreground font-semibold')}
        aria-current={insuranceNavLinkActive('/contact', bare) ? 'page' : undefined}
      >
        Contact
      </Link>

      <Button
        size="sm"
        asChild
        className="bg-primary hover:bg-primary/90 shadow-sm min-h-9 min-w-[2.75rem]"
      >
        <Link prefetch={false} href={INSURANCE_NAV_CTA.href}>
          {INSURANCE_NAV_CTA.label}
        </Link>
      </Button>
    </div>
  );
}
