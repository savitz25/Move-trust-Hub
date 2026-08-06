'use client';

import dynamic from 'next/dynamic';

const InsuranceMobileNav = dynamic(
  () =>
    import('@/components/nav/insurance-mobile-nav').then((m) => m.InsuranceMobileNav),
  {
    ssr: false,
    loading: () => (
      <div className="flex lg:hidden items-center gap-2" aria-hidden="true">
        <div className="h-11 w-11 rounded-md bg-muted/30 animate-pulse" />
      </div>
    ),
  }
);

export function InsuranceMobileNavLoader() {
  return <InsuranceMobileNav />;
}
