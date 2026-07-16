import { HubSelector } from '@/components/hub/hub-selector';
import type { HubId } from '@/lib/hub/types';

/**
 * Persistent top-of-site family switcher — Move / Lender / Insurance.
 * Single cross-vertical touchpoint; detailed cross-links live in footer After Your Move.
 */
export function HubFamilyBar({ activeHub }: { activeHub: HubId }) {
  return (
    <div className="hub-family-bar border-b bg-muted/30">
      <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-1.5">
        <p className="hidden text-[11px] text-muted-foreground sm:block">
          Trust Hub family — independent directories, no paid placements
        </p>
        <HubSelector activeHub={activeHub} className="ml-auto" />
      </div>
    </div>
  );
}