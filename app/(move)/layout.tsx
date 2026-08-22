import { Suspense } from 'react';
import { HubSegmentShell } from '@/components/hub/hub-segment-shell';
import { HubLastLocationBridge } from '@/components/network/hub-last-location-bridge';
import { DeferredSaveMyMove } from '@/components/performance/deferred-save-my-move';
import { AskSearchContextBanner } from '@/components/search-handoff/ask-search-context-banner';

export default function MoveHubLayout({ children }: { children: React.ReactNode }) {
  return (
    <DeferredSaveMyMove>
      <HubLastLocationBridge hubId="move" />
      <HubSegmentShell hubId="move">
        <Suspense fallback={null}>
          <AskSearchContextBanner />
        </Suspense>
        {children}
      </HubSegmentShell>
    </DeferredSaveMyMove>
  );
}