'use client';

import Link from 'next/link';
import { NavMegaDropdown } from '@/components/nav/nav-mega-dropdown';
import { DestinationsMegaMenuLazy } from '@/components/navbar/destinations-mega-menu-lazy';
import { MyMoveNavLink } from '@/components/save-my-move/my-move-nav-link';
import {
  FIND_MOVERS_NAV,
  GUIDES_NAV,
  MOVE_DIRECT_NAV,
} from '@/lib/nav/move-nav-config';

/**
 * Moving-only desktop nav (no finance hubs).
 * Find Movers · Destinations · Local Movers · Calculator · Verify DOT · Guides · My Move
 */
export function MoveDesktopNav() {
  return (
    <div className="hidden lg:flex items-center gap-4 xl:gap-5 text-sm">
      <NavMegaDropdown label="Find Movers" href="/companies" columns={FIND_MOVERS_NAV} panelWidth="sm" />
      <DestinationsMegaMenuLazy />
      {MOVE_DIRECT_NAV.map((link) => (
        <Link
          key={link.href}
          prefetch={false}
          href={link.href}
          className="font-medium text-[#3d4f63] hover:text-foreground transition-colors whitespace-nowrap rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {link.label}
        </Link>
      ))}
      <NavMegaDropdown
        label="Guides"
        href="/resources"
        columns={GUIDES_NAV}
        panelWidth="lg"
        align="end"
      />
      <MyMoveNavLink variant="desktop" />
    </div>
  );
}