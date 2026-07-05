'use client';

import dynamic from 'next/dynamic';
import type { HubId } from '@/lib/hub/types';

const HubMobileNav = dynamic(
  () =>
    import('@/components/hub/hub-mobile-nav-client').then((m) => m.HubMobileNav),
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

type HubMobileNavLoaderProps = {
  hubId: HubId;
  showMoveExtras: boolean;
  ctaHref?: string;
  ctaLabel?: string;
  shortName: string;
  navLinks: { href: string; label: string }[];
};

export function HubMobileNavLoader(props: HubMobileNavLoaderProps) {
  return <HubMobileNav {...props} />;
}