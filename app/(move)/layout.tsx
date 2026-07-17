import { HubSegmentShell } from '@/components/hub/hub-segment-shell';
import { DeferredSaveMyMove } from '@/components/performance/deferred-save-my-move';

export default function MoveHubLayout({ children }: { children: React.ReactNode }) {
  return (
    <DeferredSaveMyMove>
      <HubSegmentShell hubId="move">{children}</HubSegmentShell>
    </DeferredSaveMyMove>
  );
}