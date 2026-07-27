import { HubSelector } from '@/components/hub/hub-selector';
import type { HubId } from '@/lib/hub/types';

/**
 * Secondary switcher for /lender and /insurance subpaths only.
 * Never mounted on MoveTrustHub primary (move) chrome — see HubChrome.
 */
export function HubFamilyBar({ activeHub }: { activeHub: HubId }) {
  if (activeHub === 'move') {
    return null;
  }

  return (
    <div className="hub-family-bar border-b bg-muted/20">
      <div className="container mx-auto flex items-center justify-end gap-3 px-4 py-1">
        <span className="hidden sm:inline text-[10px] uppercase tracking-wider text-muted-foreground/70">
          Also on this domain
        </span>
        <HubSelector activeHub={activeHub} />
      </div>
    </div>
  );
}
