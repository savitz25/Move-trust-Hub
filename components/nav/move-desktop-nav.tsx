'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MyMoveNavLink } from '@/components/save-my-move/my-move-nav-link';
import { Button } from '@/components/ui/button';
import {
  MOVE_HEADER_CTA,
  MOVE_HEADER_NAV,
} from '@/lib/design/move-design-system';
import { ASK_TRUST_HUB } from '@/lib/network/ask-trust-hub';
import { cn } from '@/lib/utils';

/**
 * Move product header nav (redesign 2026).
 * Find Movers · By State · Compare Movers · Verify DOT · My Move · Calculator CTA
 * Switch Hub lives in AskNetworkBar above this bar.
 */
export function MoveDesktopNav() {
  const pathname = usePathname() || '/';

  return (
    <div className="hidden lg:flex items-center gap-3 xl:gap-4 text-sm">
      <nav aria-label="Move product" className="flex items-center gap-3 xl:gap-4">
        {MOVE_HEADER_NAV.map((link) => {
          const active =
            pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              prefetch={false}
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'font-medium whitespace-nowrap rounded-sm transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                active
                  ? 'text-primary font-semibold'
                  : 'text-[#3d4f63] hover:text-foreground dark:text-slate-300 dark:hover:text-white'
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <MyMoveNavLink variant="desktop" />

      <Button size="sm" asChild className="move-cta min-h-9 min-w-[2.75rem] px-4">
        <Link prefetch={false} href={MOVE_HEADER_CTA.href}>
          {MOVE_HEADER_CTA.label}
        </Link>
      </Button>

      <a
        href={ASK_TRUST_HUB.url}
        className="hidden xl:inline text-[10px] font-medium tracking-wide text-muted-foreground hover:text-foreground max-w-[7.5rem] leading-tight text-right"
        rel="noopener noreferrer"
        title="Part of the Ask Trust Hub network"
      >
        Part of Ask Trust Hub
      </a>
    </div>
  );
}
