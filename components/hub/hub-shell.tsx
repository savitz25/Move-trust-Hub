'use client';

import { usePathname } from 'next/navigation';
import { HubAnalytics } from '@/components/hub/hub-analytics';
import { HubCrossLinkBar } from '@/components/hub/hub-cross-link-bar';
import { HubNavbar } from '@/components/hub/hub-navbar';
import { HubFooter } from '@/components/hub/hub-footer';
import { TrustBadgeRow } from '@/components/hub/trust-badge-row';
import { getHubFromPathname } from '@/lib/hub/paths';

export function HubShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '/';
  const hubId = getHubFromPathname(pathname);

  const showCrossLinks =
    pathname === '/' ||
    pathname === '/lender' ||
    pathname === '/insurance';

  return (
    <div className="min-h-screen flex flex-col">
      <HubAnalytics />
      <HubNavbar />
      <TrustBadgeRow hub={hubId} />
      <main className="flex-1">{children}</main>
      {showCrossLinks && <HubCrossLinkBar hub={hubId} />}
      <HubFooter hubId={hubId} />
    </div>
  );
}