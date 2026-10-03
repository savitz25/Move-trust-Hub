/**
 * One-click Save / Unsave to My TrustHub from the mover profile.
 *
 * The device shortlist is always written or cleared by the caller before any of
 * this runs. Parent sync is additive: it stages the existing exact-entity
 * continuation through the same-origin BFF and hands the browser to the one
 * reviewed Ask form, which commits (or removes) under the verified My TrustHub
 * session and returns to this profile. Nothing here is authority: the ticket is
 * an opaque retry reference and the markers only choose a message or whether an
 * Unsave is worth offering to the parent.
 *
 * The hand-off is a chain of browser navigations and can be abandoned part-way
 * (the user clicks a link while it is in flight). So neither a Save nor an
 * Unsave is ever reported as reaching the account unless the parent's signed
 * acknowledgement for that exact ticket is held by the BFF, and an Unsave that
 * is not acknowledged leaves the device believing the profile is still in My
 * TrustHub so it can be retried.
 */
import { projection, type LocalSelection } from './selection';

export type DirectIntent = 'save' | 'save_signin' | 'unsave';
export type ParentSync = 'synced' | 'unknown';
/** `confirmed`: the parent acknowledged this ticket (Save is in the account /
 * Unsave removed it). `not_confirmed`: the parent did not act on it. `unknown`:
 * the outcome could not be read. */
export type DirectOutcome = { intent: DirectIntent; outcome: 'confirmed' | 'not_confirmed' | 'unknown' };
type KeyValue = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
export type DirectPorts = {
  /** Same-origin BFF call. Rejects on any non-2xx response. */
  post(body: unknown, csrf?: string): Promise<unknown>;
  /** Lowercase hex SHA-256. */
  digest(text: string): Promise<string>;
  /** Top-level form POST to the validated parent target. */
  submit(target: string, fields: Record<string, string>): void;
  /** Device storage. The pending marker lives here, not in tab storage, so an
   * abandoned hand-off is still reported when the profile is next opened. */
  local: KeyValue;
};

const opaque = (value: unknown): value is string => typeof value === 'string' && /^[A-Za-z0-9_-]{43}$/.test(value);
const record = (value: unknown): Record<string, unknown> => (value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {});
const pendingKey = (slug: string) => 'mth-direct:' + slug;
const syncKey = (slug: string) => 'mth-parent-sync:' + slug;
const read = (store: KeyValue, key: string) => { try { return store.getItem(key); } catch { return null; } };
const write = (store: KeyValue, key: string, value: string | null) => {
  try { if (value === null) store.removeItem(key); else store.setItem(key, value); } catch { /* storage unavailable */ }
};

/** Exactly the production Ask form, or a reviewed preview/test host. No query,
 * fragment or credentials; no other production host or path is ever posted to. */
export function handoffTargetAllowed(target: unknown): target is string {
  if (typeof target !== 'string') return false;
  try {
    const url = new URL(target);
    if (url.search || url.hash || url.username || url.password) return false;
    if (url.origin === 'https://www.asktrusthub.com') return url.pathname === '/my/profile-save';
    return ['http:', 'https:'].includes(url.protocol) &&
      (url.hostname.endsWith('.vercel.app') || url.hostname.endsWith('.test') || ['localhost', '127.0.0.1'].includes(url.hostname));
  } catch { return false; }
}

export async function directSelection(slug: string, savedAt: string, digest: DirectPorts['digest']): Promise<LocalSelection[]> {
  const value = await digest(projection(slug, savedAt));
  return [{ companySlug: slug, savedAt, revision: value, digest: value }];
}

/** Whether this device believes the profile is in My TrustHub. */
export function parentSync(local: KeyValue, slug: string): ParentSync | null {
  const value = read(local, syncKey(slug));
  return value === 'synced' || value === 'unknown' ? value : null;
}

/** Stage and hand off. `navigating` means the browser is leaving for the parent
 * form; `unavailable` means nothing left this page and the device state stands.
 * `proceed` is asked right before the hand-off: when the user has already left
 * the profile, nothing navigates. */
export async function startDirect(ports: DirectPorts, slug: string, intent: DirectIntent, savedAt: string, proceed: () => boolean = () => true): Promise<'navigating' | 'unavailable'> {
  try {
    const selected = await directSelection(slug, savedAt, ports.digest);
    const csrf = record(await ports.post({ action: 'bootstrap' })).csrf;
    if (typeof csrf !== 'string') return 'unavailable';
    const result = record(await ports.post({ action: 'prepare', selected }, csrf));
    const continuationRef = record(result.fields).continuationRef;
    if (result.state !== 'continue' || !opaque(result.ticket) || !opaque(continuationRef) || !handoffTargetAllowed(result.target)) return 'unavailable';
    if (!proceed()) return 'unavailable';
    // Opaque retry reference and the intent only; never research or account data.
    write(ports.local, pendingKey(slug), JSON.stringify({ intent, ticket: result.ticket }));
    ports.submit(result.target, { continuationRef, intent });
    return 'navigating';
  } catch { return 'unavailable'; }
}

/** When the profile is next shown (normally the parent's return): consume the
 * pending marker once and report what the parent acknowledged. Both a Save and
 * an Unsave are `confirmed` only when the BFF holds the parent's signed
 * acknowledgement for this browser's ticket. */
export async function resumeDirect(ports: DirectPorts, slug: string): Promise<DirectOutcome | null> {
  const raw = read(ports.local, pendingKey(slug));
  if (!raw) return null;
  write(ports.local, pendingKey(slug), null);
  let pending: Record<string, unknown>;
  try { pending = record(JSON.parse(raw)); } catch { return null; }
  const intent = pending.intent;
  if (intent !== 'save' && intent !== 'save_signin' && intent !== 'unsave') return null;
  if (!opaque(pending.ticket)) return null;
  try {
    const csrf = record(await ports.post({ action: 'bootstrap' })).csrf;
    if (typeof csrf !== 'string') throw Error('unavailable');
    const state = record(await ports.post({ action: 'status', ticket: pending.ticket }, csrf)).state;
    if (state !== 'parent_acknowledged' && state !== 'pending') throw Error('unavailable');
    const confirmed = state === 'parent_acknowledged';
    if (intent === 'unsave') {
      // Acknowledged: the account no longer holds it. Otherwise the removal did
      // not happen (signed out, refused, or the hand-off was abandoned): keep
      // believing it is in My TrustHub so Unsave can be offered again.
      if (confirmed) write(ports.local, syncKey(slug), null);
      return { intent, outcome: confirmed ? 'confirmed' : 'not_confirmed' };
    }
    write(ports.local, syncKey(slug), confirmed ? 'synced' : null);
    return { intent, outcome: confirmed ? 'confirmed' : 'not_confirmed' };
  } catch {
    // The parent may or may not have acted. Never claim success. After a Save,
    // let a later Unsave still offer the removal; after an Unsave, keep the
    // existing belief untouched.
    if (intent !== 'unsave') write(ports.local, syncKey(slug), 'unknown');
    return { intent, outcome: 'unknown' };
  }
}

const ENDPOINT = '/api/my-trusthub/profile-save';
/** Browser ports. Same-origin fetch, Web Crypto, a native form POST. */
export function browserDirectPorts(): DirectPorts {
  return {
    async post(body, csrf) {
      const response = await fetch(ENDPOINT, { method: 'POST', credentials: 'same-origin', redirect: 'error', cache: 'no-store',
        headers: { 'Content-Type': 'application/json', ...(csrf ? { 'X-MTH-CSRF': csrf } : {}) }, body: JSON.stringify(body), signal: AbortSignal.timeout(15_000) });
      if (!response.ok) throw Error('unavailable');
      return response.json();
    },
    async digest(text) {
      return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)))).map(b => b.toString(16).padStart(2, '0')).join('');
    },
    submit(target, fields) {
      const form = document.createElement('form'); form.method = 'POST'; form.action = target;
      for (const [name, value] of Object.entries(fields)) {
        const input = document.createElement('input'); input.type = 'hidden'; input.name = name; input.value = value; form.append(input);
      }
      document.body.append(form); form.submit();
    },
    local: localStorage,
  };
}
