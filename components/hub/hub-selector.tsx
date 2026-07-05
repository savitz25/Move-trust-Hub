import Link from 'next/link';
import { cn } from '@/lib/utils';
import { HUB_ORDER, HUBS } from '@/lib/hub/config';
import { hubPath } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';

export function HubSelector({
  activeHub,
  className,
}: {
  activeHub: HubId;
  className?: string;
}) {
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
        const isActive = activeHub === hubId;
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