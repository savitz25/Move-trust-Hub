'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MyMoveNavLink } from '@/components/save-my-move/my-move-nav-link';
import { Button } from '@/components/ui/button';
import { MoveMegaMenu } from '@/components/nav/move-mega-menu';
import { SwitchHubMenu } from '@/components/switch-hub-menu';
import { MOVE_HEADER_CTA } from '@/lib/design/move-design-system';
import { MOVE_MEGA_NAV } from '@/lib/nav/move-mega-menu-config';

/**
 * Move product header — mega menus + My Move + Calculator CTA + Switch Hub.
 */
export function MoveDesktopNav() {
  const pathname = usePathname() || '/';

  return (
    <div className="hidden shrink-0 items-center gap-2 text-sm lg:flex xl:gap-3">
      <nav aria-label="Move product" className="flex shrink-0 items-center gap-1 xl:gap-2">
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

      <SwitchHubMenu />
    </div>
  );
}
