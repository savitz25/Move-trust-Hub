import 'server-only';

import { portalPathAfterAuth } from '@/lib/portal/mfa';
import { myMovePathAfterAuth } from '@/lib/save-my-move/password';
import { sanitizePostLoginPath } from '@/lib/save-my-move/redirect';

/**
 * Post magic-link / OAuth routing for both customer (My Move) and mover (Portal) flows.
 */
export async function pathAfterAuth(nextPath: string): Promise<string> {
  const next = sanitizePostLoginPath(nextPath);
  if (next.startsWith('/portal')) {
    return portalPathAfterAuth(next);
  }
  return myMovePathAfterAuth(next);
}
