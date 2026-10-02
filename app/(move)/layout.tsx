import { HubSegmentShell } from '@/components/hub/hub-segment-shell';
import { HubLastLocationBridge } from '@/components/network/hub-last-location-bridge';
import { DeferredSaveMyMove } from '@/components/performance/deferred-save-my-move';
import { MyTrustHubOriginProvider } from '@/components/my-trusthub/my-trusthub-origin';
import { myTrustHubParentOrigin } from '@/lib/my-trusthub/parent-origin';

export default function MoveHubLayout({ children }: { children: React.ReactNode }) {
  return (
    <MyTrustHubOriginProvider origin={myTrustHubParentOrigin()}>
      <DeferredSaveMyMove>
        <HubLastLocationBridge hubId="move" />
        <HubSegmentShell hubId="move">{children}</HubSegmentShell>
      </DeferredSaveMyMove>
    </MyTrustHubOriginProvider>
  );
}