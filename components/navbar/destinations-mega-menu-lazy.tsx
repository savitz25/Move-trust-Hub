'use client';

import dynamic from 'next/dynamic';

const DestinationsMegaMenu = dynamic(
  () =>
    import('@/components/navbar/destinations-mega-menu').then(
      (m) => m.DestinationsMegaMenu
    ),
  { ssr: false, loading: () => <span className="font-medium text-muted-foreground">Destinations</span> }
);

export function DestinationsMegaMenuLazy() {
  return <DestinationsMegaMenu />;
}