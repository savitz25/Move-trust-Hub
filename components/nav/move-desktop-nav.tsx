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

/** Five-item desktop nav: Find Movers · Destinations · Calculator · Verify DOT · Guides */
export function MoveDesktopNav() {
  return (
    <div className="hidden lg:flex items-center gap-5 text-sm">
      <NavMegaDropdown label="Find Movers" href="/companies" columns={FIND_MOVERS_NAV} panelWidth="sm" />
      <DestinationsMegaMenuLazy />
      {MOVE_DIRECT_NAV.map((link) => (
        <Link
          key={link.href}
          prefetch={false}
          href={link.href}
          className="font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
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