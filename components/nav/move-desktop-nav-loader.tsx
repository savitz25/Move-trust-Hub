'use client';

import dynamic from 'next/dynamic';

const MoveDesktopNav = dynamic(
  () => import('@/components/nav/move-desktop-nav').then((m) => m.MoveDesktopNav),
  {
    ssr: false,
    loading: () => (
      <div
        className="hidden lg:block h-10 w-[28rem] max-w-[50vw] rounded-md bg-muted/20"
        aria-hidden="true"
      />
    ),
  }
);

export function MoveDesktopNavLoader() {
  return <MoveDesktopNav />;
}