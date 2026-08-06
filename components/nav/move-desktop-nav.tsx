'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MyMoveNavLink } from '@/components/save-my-move/my-move-nav-link';
import { Button } from '@/components/ui/button';
import { MoveMegaMenu } from '@/components/nav/move-mega-menu';
import { MOVE_HEADER_CTA } from '@/lib/design/move-design-system';
import { MOVE_MEGA_NAV } from '@/lib/nav/move-mega-menu-config';
import { ASK_TRUST_HUB } from '@/lib/network/ask-trust-hub';

/**
 * Move product header — mega menus for primary items + My Move + Calculator CTA.
 * Switch Hub lives in AskNetworkBar above this bar.
 */
export function MoveDesktopNav() {
  const pathname = usePathname() || '/';

  return (
    <div className="hidden lg:flex items-center gap-2 xl:gap-3 text-sm">
      <nav aria-label="Move product" className="flex items-center gap-1 xl:gap-2">
        {MOVE_MEGA_NAV.map((item) => {
          const active =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`) ||
            (item.id === 'by-state' && pathname.startsWith('/local-movers')) ||
            (item.id === 'find-movers' &&
              (pathname.startsWith('/companies') ||
                pathname.startsWith('/auto-transport')));
          return <MoveMegaMenu key={item.id} item={item} active={active} />;
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
        className="hidden xl:inline max-w-[5.5rem] text-right text-[10px] font-medium leading-tight tracking-wide text-slate-500 hover:text-slate-700"
        rel="noopener noreferrer"
        title="Part of the Ask Trust Hub network — Switch hub above"
      >
        Ask network
      </a>
    </div>
  );
}
