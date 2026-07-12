import { HubChrome } from '@/components/hub/hub-chrome';
import { DeferredSaveMyMove } from '@/components/performance/deferred-save-my-move';

export default function MoveHubLayout({ children }: { children: React.ReactNode }) {
  return (
    <DeferredSaveMyMove>
      <HubChrome hubId="move">{children}</HubChrome>
    </DeferredSaveMyMove>
  );
}