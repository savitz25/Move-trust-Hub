'use client';

import { MoveDesktopNav } from '@/components/nav/move-desktop-nav';

/** Desktop nav is lightweight — render on the server for consistent chrome & crawlable links. */
export function MoveDesktopNavLoader() {
  return <MoveDesktopNav />;
}
