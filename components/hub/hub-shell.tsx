'use client';

import { usePathname } from 'next/navigation';
import { HubNavbar } from '@/components/hub/hub-navbar';
import { HubFooter } from '@/components/hub/hub-footer';
import { getHubFromPathname } from '@/lib/hub/paths';

export function HubShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '/';
  const hubId = getHubFromPathname(pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <HubNavbar />
      <main className="flex-1">{children}</main>
      <HubFooter hubId={hubId} />
    </div>
  );
}