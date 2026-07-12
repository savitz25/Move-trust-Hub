'use client';

import dynamic from 'next/dynamic';

const MoveMobileNav = dynamic(
  () => import('@/components/nav/move-mobile-nav').then((m) => m.MoveMobileNav),
  {
    ssr: false,
    loading: () => (
      <div className="flex lg:hidden items-center gap-2" aria-hidden="true">
        <div className="h-11 w-20 rounded-md bg-muted/30 animate-pulse" />
        <div className="h-11 w-11 rounded-md bg-muted/30 animate-pulse" />
      </div>
    ),
  }
);

export function MoveMobileNavLoader() {
  return <MoveMobileNav />;
}