'use client';

import { MoveMobileNav } from '@/components/nav/move-mobile-nav';

/** Mobile nav shell is small — SSR so header links match desktop. */
export function MoveMobileNavLoader() {
  return <MoveMobileNav />;
}
