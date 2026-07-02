import { headers } from 'next/headers';
import { getHubFromPathname, HUB_HEADER } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';

/** Server component helper — read hub from middleware header or pathname. */
export async function getActiveHub(pathname?: string): Promise<HubId> {
  const headerStore = await headers();
  const fromHeader = headerStore.get(HUB_HEADER);
  if (fromHeader === 'move' || fromHeader === 'lender' || fromHeader === 'insurance') {
    return fromHeader;
  }
  if (pathname) return getHubFromPathname(pathname);
  return 'move';
}