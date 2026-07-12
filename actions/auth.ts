'use server';

import { sanitizePostLoginPath } from '@/lib/save-my-move/redirect';

/** Server-validated post-login redirect (open-redirect safe, preserves ?query). */
export async function resolvePostLoginRedirectAction(next?: string | null) {
  return sanitizePostLoginPath(next);
}