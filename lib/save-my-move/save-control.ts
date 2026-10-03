/**
 * Device-first Save contract for the mover Save control.
 *
 * Local (device) Save and Unsave never wait for auth initialization. The legacy
 * cloud shortlist is an optional, soft sync that is attempted only once auth has
 * actually resolved to a signed-in user. The control is disabled only while an
 * operation of its own is in flight, never because the auth provider is loading.
 */
export type SaveBusy = 'save' | 'unsave' | null;
export type SaveAuth = { loading: boolean; user: boolean };

export type SavePlan =
  | { kind: 'skip' }
  /** Device write only; auth is still resolving, so no cloud call. */
  | { kind: 'local_only'; reason: 'auth_pending' }
  /** Device write; signed out, show the guest / My TrustHub guidance. */
  | { kind: 'local_guest' }
  /** Device write first, then the optional legacy cloud upsert. */
  | { kind: 'local_then_cloud' };

export type UnsavePlan =
  | { kind: 'skip' }
  /** Device removal only; auth pending or signed out, so no cloud call. */
  | { kind: 'local_only' }
  /** Device removal first, then the optional legacy cloud delete. */
  | { kind: 'local_then_cloud' };

export function saveControlDisabled(busy: SaveBusy): boolean {
  return busy !== null;
}

export function planSave(input: { saved: boolean; busy: SaveBusy; auth: SaveAuth }): SavePlan {
  if (input.saved || input.busy !== null) return { kind: 'skip' };
  if (input.auth.loading) return { kind: 'local_only', reason: 'auth_pending' };
  if (!input.auth.user) return { kind: 'local_guest' };
  return { kind: 'local_then_cloud' };
}

export function planUnsave(input: { saved: boolean; busy: SaveBusy; auth: SaveAuth }): UnsavePlan {
  if (!input.saved || input.busy !== null) return { kind: 'skip' };
  if (input.auth.loading || !input.auth.user) return { kind: 'local_only' };
  return { kind: 'local_then_cloud' };
}

/** Canary list parsing for NEXT_PUBLIC_MOVE_PARENT_SAVE_CANARY_SLUGS. */
export function canarySlugs(raw: string | undefined): string[] {
  return (raw ?? '').split(',').map((slug) => slug.trim()).filter(Boolean);
}

/** Keep is admitted for a slug when parent Save is enabled and either no canary
 * list is set or the slug is on it. Auth state plays no part. */
export function keepAllowed(slug: string, env: { parentSaveEnabled: boolean; canarySlugs: readonly string[] }): boolean {
  return env.parentSaveEnabled && (env.canarySlugs.length === 0 || env.canarySlugs.includes(slug));
}

/** Keep in My TrustHub follows the device row and the canary list only. */
export function keepControlVisible(input: { localSaved: boolean; keepAllowed: boolean }): boolean {
  return input.localSaved && input.keepAllowed;
}
