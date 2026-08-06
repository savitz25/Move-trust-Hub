'use client';

import dynamic from 'next/dynamic';

const InsuranceDesktopNav = dynamic(
  () =>
    import('@/components/nav/insurance-desktop-nav').then((m) => m.InsuranceDesktopNav),
  {
    ssr: true,
    loading: () => (
      <div className="hidden lg:flex items-center gap-4" aria-hidden="true">
        <div className="h-4 w-16 rounded bg-muted/40 animate-pulse" />
        <div className="h-4 w-20 rounded bg-muted/40 animate-pulse" />
        <div className="h-4 w-14 rounded bg-muted/40 animate-pulse" />
      </div>
    ),
  }
);

export function InsuranceDesktopNavLoader() {
  return <InsuranceDesktopNav />;
}
