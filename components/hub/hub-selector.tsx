'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { HUB_ORDER, HUBS } from '@/lib/hub/config';
import { getHubFromPathname, hubPath } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';

export function HubSelector({ className }: { className?: string }) {
  const pathname = usePathname() ?? '/';
  const active = getHubFromPathname(pathname);

  return (
    <div
      role="tablist"
      aria-label="Trust Hub family"
      className={cn(
        'inline-flex items-center rounded-full border bg-muted/50 p-0.5 text-xs font-semibold',
        className
      )}
    >
      {HUB_ORDER.map((hubId) => {
        const hub = HUBS[hubId];
        const isActive = active === hubId;
        return (
          <Link
            key={hubId}
            role="tab"
            aria-selected={isActive}
            href={hubPath(hubId, '/')}
            className={cn(
              'rounded-full px-3 py-1.5 transition-colors min-h-[32px] flex items-center',
              isActive
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {hub.shortName}
          </Link>
        );
      })}
    </div>
  );
}