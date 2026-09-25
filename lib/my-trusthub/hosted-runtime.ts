import 'server-only';
import { createHash } from 'node:crypto';
import { PostgresAssertionNonceStore } from './assertion-nonce-store';
import { createIsolatedMoveRuntime, type IsolatedMovePorts } from './isolated-runtime';
import { requestCurrentGrantChallenge, resolveCurrentGrantProof } from './parent-grant';
import { signedParentChannel, type AssertionContext } from './parent-facade';
import { publicationSourceApproved, resolveExactMovePublication, CERTIFIED_NATIVE_ID, CERTIFIED_SLUG, CERTIFIED_CLASS, type PublicationRow } from './publication-resolver';
import { PostgresTransferStore, type SourcePool } from './postgres-transfer-store';
import type { BrowserBinding, CurrentGrant, TrustedMoveRecord } from './profile-save-adapter';
import { ASK_PREVIEW, GRANT_API_PATH, MOVE_PREVIEW } from './reviewed-origins';
import { askVerifyKey, moveSigningKey } from './service-keys';
import { ASSERTION_HEADER, signAssertion, verifyAskSourceCaller, type AssertionKey } from './service-assertion';
import { createIsolatedSourcePool, SOURCE_LOGIN, type IsolatedPoolConfig } from './source-pool';

const hash = (value: string) => createHash('sha256').update(value).digest('hex');
const opaque = (value: unknown): value is string => typeof value === 'string' && /^[A-Za-z0-9_-]{43}$/.test(value);
const boundedId = (value: unknown): value is string => typeof value === 'string' && /^[A-Za-z0-9_-]{1,200}$/.test(value);

/** Reviewed isolated metadata. The host is supplied, not derived from a region. */
export const REVIEWED_SOURCE_METADATA = {
  sourceBackend: 'isolated-move-reader',
  databaseHost: 'aws-0-us-west-2.pooler.supabase.com',
  databaseName: 'postgres',
  databaseUser: SOURCE_LOGIN,
  sessionAffinity: 'dedicated' as const,
};

/** Design only. This module does not create the object. */
export const CERTIFIED_PUBLICATION_CONTRACT = {
  schema: 'mth_profile_transfer',
  table: 'certified_publication',
  columns: ['hub', 'native_id', 'canonical_slug', 'publication_state', 'reviewed_class'],
  primaryKey: 'native_id',
  unique: 'canonical_slug',
  checks: [
    "hub = 'move'",
    "native_id = 'usdot-1002530'",
    "canonical_slug = 'hindman-isaacs-moving-storage-inc'",
    "publication_state = 'PUBLISHABLE'",
    "reviewed_class = 'mover'",
  ],
  rowLimit: 'one row',
  capabilityRole: 'mth_move_profile_transfer',
  grants: 'SELECT only. No INSERT, UPDATE, DELETE, and no direct grant to the login.',
  rls: 'ENABLE and FORCE ROW LEVEL SECURITY. SELECT policy admits only the certified native id for the capability role.',
} as const;

const PUBLICATION_SQL = `select native_id, canonical_slug, publication_state, reviewed_class
  from mth_profile_transfer.certified_publication
  where hub = 'move' and native_id = $1 and reviewed_class = $2`;

export type PreviewDeps = {
  send?: typeof fetch;
  createPool?: (config: IsolatedPoolConfig) => { connect(): Promise<{ query(sql: string, values?: unknown[]): Promise<{ rows: Record<string, unknown>[] }>; release(destroy?: boolean): void }>; end(): Promise<void> };
};

function askFetch(env: Record<string, string | undefined>, send: typeof fetch): typeof fetch {
  const bypass = env.MTH_MOVE_PARENT_SAVE_PARENT_PROTECTION_BYPASS;
  return async (input, init) => {
    const url = String(input);
    if (!url.startsWith(ASK_PREVIEW + '/')) throw Error('unauthorized');
    const headers = new Headers(init?.headers);
    if (bypass) headers.set('x-vercel-protection-bypass', bypass);
    return send(url, { ...init, headers });
  };
}

function object(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/** Parent binding lookup. Not one of the six profile-save operations. */
export async function fetchAcceptedBinding(input: {
  browser: BrowserBinding; key: AssertionKey; send: typeof fetch; now?: number;
}): Promise<TrustedMoveRecord['binding'] | null> {
  if (input.browser.csrfVerified !== true || input.browser.environment !== 'isolated' || input.browser.origin !== MOVE_PREVIEW || !opaque(input.browser.binding)) return null;
  const body = { action: 'binding' };
  const bytes = Buffer.from(JSON.stringify(body));
  const target = ASK_PREVIEW + GRANT_API_PATH;
  const response = await input.send(target, {
    method: 'POST', body: bytes, cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(5000),
    headers: { 'Content-Type': 'application/json', [ASSERTION_HEADER]: signAssertion(input.key, 'move', target, 'transfer:stage', bytes, input.browser.binding, null, null, input.now) },
  });
  if (!response.ok) return null;
  const parsed: unknown = await response.json();
  if (!object(parsed) || parsed.ok !== true || !object(parsed.result)) return null;
  const result = parsed.result;
  if (Object.keys(result).sort().join() !== 'binding,profile' || !object(result.profile) || !object(result.binding)) return null;
  const profile = result.profile;
  const binding = result.binding;
  if (Object.keys(profile).sort().join() !== 'hub,nativeId,profileClass') return null;
  if (profile.hub !== 'move' || profile.nativeId !== CERTIFIED_NATIVE_ID || profile.profileClass !== CERTIFIED_CLASS) return null;
  if (Object.keys(binding).sort().join() !== 'id,networkEntityId,status' || binding.status !== 'accepted') return null;
  if (!boundedId(binding.id) || !boundedId(binding.networkEntityId)) return null;
  return { id: binding.id, networkEntityId: binding.networkEntityId, status: 'accepted' };
}

async function readCertified(pool: SourcePool, profile: { hub: 'move'; nativeId: string; profileClass: string }): Promise<PublicationRow | null> {
  if (profile.nativeId !== CERTIFIED_NATIVE_ID || profile.profileClass !== CERTIFIED_CLASS) return null;
  let db: Awaited<ReturnType<SourcePool['connect']>> | null = null;
  try {
    db = await pool.connect();
    const result = await db.query<Record<string, unknown>>(PUBLICATION_SQL, [CERTIFIED_NATIVE_ID, CERTIFIED_CLASS]);
    const row = result.rows[0];
    if (!row) return null;
    return {
      nativeId: String(row.native_id), canonicalSlug: String(row.canonical_slug),
      publicationState: row.publication_state == null ? null : String(row.publication_state),
      reviewedClass: row.reviewed_class == null ? null : String(row.reviewed_class),
    };
  } catch { return null; } finally { db?.release(); }
}

async function storedGrant(store: PostgresTransferStore, browser: BrowserBinding, ticket: string) {
  if (!opaque(ticket) || !opaque(browser.binding)) return null;
  let found: { browserHash: string; continuationRef: string; accountContextRef?: string } | null = null;
  await store.withRecord(hash(ticket), async record => {
    if (!record || record.browserHash !== hash(browser.binding)) return;
    found = { browserHash: record.browserHash, continuationRef: record.continuationRef, accountContextRef: record.accountContextRef };
  });
  return found;
}

/** Preview-only ports. Returns null unless every reviewed check is present.
 * A feature flag by itself does not open this runtime. */
export function createPreviewMoveRuntime(env: Record<string, string | undefined>, deps: PreviewDeps = {}) {
  if (env.VERCEL_ENV === 'production') return null;
  const signing = moveSigningKey(env);
  const askKey = askVerifyKey(env);
  if (!signing || !askKey || !publicationSourceApproved(env)) return null;
  if (env.MTH_MOVE_PARENT_SAVE_MOVE_ORIGIN !== MOVE_PREVIEW || env.MTH_MOVE_PARENT_SAVE_PARENT_ORIGIN !== ASK_PREVIEW) return null;
  if (env.MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND !== REVIEWED_SOURCE_METADATA.sourceBackend) return null;
  const send = askFetch(env, deps.send ?? fetch);
  const pool = createIsolatedSourcePool(env, REVIEWED_SOURCE_METADATA, deps.createPool);
  if (!pool) return null;
  const store = new PostgresTransferStore(pool, 'dedicated');
  const nonces = new PostgresAssertionNonceStore(pool);
  const channel = signedParentChannel({
    enabled: true, environment: 'isolated', verifiedIsolatedPair: true,
    moveOrigin: MOVE_PREVIEW, parentOrigin: ASK_PREVIEW, parentFormPath: '/my/profile-save',
  }, signing, send);
  const guarded = { async post(url: string, envelope: unknown, browser: BrowserBinding, signal: AbortSignal, context: AssertionContext) {
    const operation = object(envelope) && typeof envelope.operation === 'string' ? envelope.operation : '';
    if (operation === 'commitProfileSave' || operation === 'consumeProfileSaveContinuation') throw Error('unauthorized');
    const stage = operation.startsWith('prepare');
    if (stage && (context.session !== null || context.grant !== null)) throw Error('unauthorized');
    if (!stage && (typeof context.session !== 'string' || context.grant === null)) throw Error('unauthorized');
    return channel.post(url, envelope, browser, signal, context);
  } };
  const ports: IsolatedMovePorts = {
    verifiedPair: { moveOrigin: MOVE_PREVIEW, parentOrigin: ASK_PREVIEW, sourceBackend: REVIEWED_SOURCE_METADATA.sourceBackend, isolated: true },
    sessionAffinity: 'dedicated',
    pool,
    channel: guarded,
    async resolveExactPublished(slug, browser) {
      if (slug !== CERTIFIED_SLUG) return null;
      const binding = await fetchAcceptedBinding({ browser, key: signing, send });
      if (!binding) return null;
      const publication = await resolveExactMovePublication(env, identity => readCertified(pool, identity),
        { hub: 'move', nativeId: CERTIFIED_NATIVE_ID, profileClass: CERTIFIED_CLASS });
      if (!publication) return null;
      return { id: publication.identity.nativeId, slug: publication.canonicalSlug, publicationState: publication.publicationState, reviewedClass: publication.reviewedClass, binding };
    },
    async currentGrant(browser, ticketHash) {
      let grant: CurrentGrant | null = null;
      await store.withRecord(ticketHash, async record => {
        if (!record || record.browserHash !== hash(browser.binding) || !opaque(record.accountContextRef)) return;
        grant = { accountContextRef: record.accountContextRef, selectionConfirmed: true, ...(record.projectRef ? { projectRef: record.projectRef } : {}) };
      });
      return grant;
    },
    verifySourceCaller: (proof, scope) => verifyAskSourceCaller(proof, scope, askKey, nonces),
    readCertifiedPublication: identity => readCertified(pool, identity),
  };
  const runtime = createIsolatedMoveRuntime(env, ports);
  if (!runtime) { void pool.end(); return null; }
  runtime.http.grantChallenge = async (browser, ticket) => requestCurrentGrantChallenge({
    record: await storedGrant(store, browser, ticket), browser, key: signing,
    parentOrigin: ASK_PREVIEW, moveOrigin: MOVE_PREVIEW, send,
  });
  runtime.http.resolveGrant = async (browser, ticket, proofRef) => resolveCurrentGrantProof({
    record: await storedGrant(store, browser, ticket), browser, proofRef, key: signing,
    parentOrigin: ASK_PREVIEW, moveOrigin: MOVE_PREVIEW, send,
  });
  return runtime;
}
