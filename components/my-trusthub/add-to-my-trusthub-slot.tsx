import { AddToMyTrustHubButton } from '@/components/my-trusthub/add-to-my-trusthub';
import { addToMyTrustHubActive } from '@/lib/my-trusthub/b2-session-reconcile';
import type { ToolSessionDeviceKey } from '@/lib/my-trusthub/tool-session-schemas';

/**
 * Page mount for Add to My TrustHub. Returns null while the flag is off,
 * so the button is not in the tree and no device key is read.
 */
export function AddToMyTrustHubSlot({ deviceKey }: { deviceKey: ToolSessionDeviceKey }) {
  if (!addToMyTrustHubActive()) return null;
  return (
    <AddToMyTrustHubButton
      deviceKey={deviceKey}
      env={{
        flag: '1',
        projectId: process.env.VERCEL_PROJECT_ID,
        projectName: process.env.VERCEL_PROJECT_NAME,
      }}
    />
  );
}
