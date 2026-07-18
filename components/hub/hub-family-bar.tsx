import { HubSelector } from '@/components/hub/hub-selector';
import type { HubId } from '@/lib/hub/types';

/**
 * Minimal top switcher for hub navigation (not a mid-funnel cross-sell).
 * Sister-directory discovery for content lives in AfterYourMoveModule (footer, path-gated).
 */
export function HubFamilyBar({ activeHub }: { activeHub: HubId }) {
  return (
    <div className="hub-family-bar border-b bg-muted/30">
      <div className="container mx-auto flex items-center justify-end gap-3 px-4 py-1.5">
        <HubSelector activeHub={activeHub} />
      </div>
    </div>
  );
}