import Link from 'next/link';
import { cn } from '@/lib/utils';
import { HUB_ORDER } from '@/lib/hub/config';
import { hubPath } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';

/**
 * Secondary tab control for finance subpaths only (not Move primary nav).
 */
export function HubSelector({
  activeHub,
  className,
}: {
  activeHub: HubId;
  className?: string;
}) {
  return (
    <div
      role="navigation"
      aria-label="Other directories on this domain"
      className={cn(
        'inline-flex items-center rounded-full border bg-muted/40 p-0.5 text-[11px] font-medium',
        className
      )}
    >
      {HUB_ORDER.map((hubId) => {
        const isActive = activeHub === hubId;
        const label =
          hubId === 'move' ? 'Move Trust Hub' : hubId === 'lender' ? 'Lenders' : 'Insurance';
        return (
          <Link
            key={hubId}
            href={hubPath(hubId, '/')}
            className={cn(
              'rounded-full px-2.5 py-1 transition-colors min-h-9 flex items-center justify-center',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              isActive
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
