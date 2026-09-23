import { createHash } from 'node:crypto';
import { ASK_PREVIEW, GRANT_API_PATH, GRANT_BROWSER_PATH, MOVE_PREVIEW } from './reviewed-origins';
import { ASSERTION_HEADER, signAssertion, type AssertionKey } from './service-assertion';
import type { BrowserBinding, CurrentGrant } from './profile-save-adapter';

const hash = (value: string) => createHash('sha256').update(value).digest('hex');
const opaque = (value: unknown): value is string => typeof value === 'string' && /^[A-Za-z0-9_-]{43}$/.test(value);
const object = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);

export type GrantRecord = { browserHash: string; continuationRef: string; accountContextRef?: string };
export type ResolvedCurrentGrant = CurrentGrant & { sessionBinding: string; proofRef: string; expiresAt: number };

function reviewedPair(parentOrigin: string, moveOrigin: string): boolean {
  return parentOrigin === ASK_PREVIEW && moveOrigin === MOVE_PREVIEW;
}

async function postGrant(key: AssertionKey, body: unknown, browser: string, send: typeof fetch, now?: number): Promise<unknown> {
  const bytes = Buffer.from(JSON.stringify(body));
  const target = ASK_PREVIEW + GRANT_API_PATH;
  const response = await send(target, {
    method: 'POST', body: bytes, cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(5000),
    headers: { 'Content-Type': 'application/json', [ASSERTION_HEADER]: signAssertion(key, 'move', target, 'receipt:verify', bytes, browser, null, null, now) },
  });
  if (!response.ok) return null;
  const parsed: unknown = await response.json();
  if (!object(parsed) || parsed.ok !== true || !object(parsed.result)) return null;
  return parsed.result;
}

/** Challenge is returned only when the continuation belongs to this browser. */
export async function requestCurrentGrantChallenge(input: {
  record: GrantRecord | null; browser: BrowserBinding; key: AssertionKey;
  parentOrigin: string; moveOrigin: string; send: typeof fetch; now?: number;
}): Promise<{ target: string; challengeRef: string } | null> {
  if (!reviewedPair(input.parentOrigin, input.moveOrigin) || !input.record || input.record.browserHash !== hash(input.browser.binding)) return null;
  if (!opaque(input.record.continuationRef) || !opaque(input.browser.binding)) return null;
  const result = await postGrant(input.key, { action: 'challenge', continuationRef: input.record.continuationRef }, input.browser.binding, input.send, input.now);
  if (!object(result) || typeof result.target !== 'string' || !opaque(result.challengeRef)) return null;
  const target = new URL(result.target);
  if (target.origin + target.pathname !== ASK_PREVIEW + GRANT_BROWSER_PATH || target.search || target.hash) return null;
  return { target: target.origin + target.pathname, challengeRef: result.challengeRef };
}

/** proofRef is an opaque bridge, not an account id. A different account is rejected. */
export async function resolveCurrentGrantProof(input: {
  record: GrantRecord | null; browser: BrowserBinding; proofRef: unknown; key: AssertionKey;
  parentOrigin: string; moveOrigin: string; send: typeof fetch; now?: number;
}): Promise<ResolvedCurrentGrant | 'account_changed' | null> {
  if (!reviewedPair(input.parentOrigin, input.moveOrigin) || !input.record || input.record.browserHash !== hash(input.browser.binding)) return null;
  if (!opaque(input.proofRef) || !opaque(input.record.continuationRef)) return null;
  const result = await postGrant(input.key, { action: 'resolve', continuationRef: input.record.continuationRef, proofRef: input.proofRef },
    input.browser.binding, input.send, input.now);
  if (!object(result) || result.selectionConfirmed !== true || !opaque(result.accountContextRef)) return null;
  if (result.projectRef !== undefined && !opaque(result.projectRef)) return null;
  if (typeof result.sessionBinding !== 'string' || !/^[a-f0-9]{64}$/.test(result.sessionBinding) || !Number.isFinite(result.expiresAt)) return null;
  if (input.record.accountContextRef && input.record.accountContextRef !== result.accountContextRef) return 'account_changed';
  return {
    accountContextRef: result.accountContextRef, selectionConfirmed: true, sessionBinding: result.sessionBinding,
    proofRef: input.proofRef, expiresAt: result.expiresAt as number,
    ...(result.projectRef ? { projectRef: result.projectRef } : {}),
  };
}
