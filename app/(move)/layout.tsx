import { HubSegmentShell } from '@/components/hub/hub-segment-shell';
import { HubLastLocationBridge } from '@/components/network/hub-last-location-bridge';
import { DeferredSaveMyMove } from '@/components/performance/deferred-save-my-move';

export default function MoveHubLayout({ children }: { children: React.ReactNode }) {
  return (
    <DeferredSaveMyMove>
      <HubLastLocationBridge hubId="move" />
      <HubSegmentShell hubId="move">{children}</HubSegmentShell>
    </DeferredSaveMyMove>
  );
}