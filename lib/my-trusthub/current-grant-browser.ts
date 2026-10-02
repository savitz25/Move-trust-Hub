export const GRANT_BROWSER_PATH = '/my/profile-save/current-grant';
export const CURRENT_GRANT_MESSAGE = 'v23-current-grant';
const opaque = (value: unknown): value is string => typeof value === 'string' && /^[A-Za-z0-9_-]{43}$/.test(value);

/** Accept only the exact Ask origin, message shape, and opaque proofRef.
 * A blocked or closed popup is not a proof. */
export function acceptCurrentGrantMessage(origin: string, data: unknown, askOrigin: string, popupOpen: boolean): string | null {
  if (!popupOpen || origin !== askOrigin) return null;
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
  const record = data as Record<string, unknown>;
  if (Object.keys(record).sort().join() !== 'proofRef,type') return null;
  if (record.type !== CURRENT_GRANT_MESSAGE || !opaque(record.proofRef)) return null;
  return record.proofRef;
}

/** parent_saved is allowed only after an accepted proof and a verified receipt. */
export function parentSavedAllowed(popup: 'blocked' | 'closed' | 'timeout' | 'message', proofAccepted: boolean, receiptState?: string): boolean {
  return popup === 'message' && proofAccepted && receiptState === 'parent_saved';
}

export function exactGrantTarget(target: string, askOrigin: string): boolean {
  try {
    const url = new URL(target);
    return url.origin === askOrigin && url.pathname === GRANT_BROWSER_PATH && !url.search && !url.hash && !url.username && !url.password;
  } catch { return false; }
}
