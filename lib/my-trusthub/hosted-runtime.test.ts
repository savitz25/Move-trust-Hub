import assert from 'node:assert/strict';
import { createHash, generateKeyPairSync } from 'node:crypto';
import test from 'node:test';
import { ASSERTION_HEADER, signAssertion, type AssertionClaims } from './service-assertion';
import { CERTIFIED_PUBLICATION_CONTRACT, REVIEWED_SOURCE_METADATA, createPreviewMoveRuntime, fetchAcceptedBinding } from './hosted-runtime';
import { getMoveProfileSaveBindings, getMoveProfileSaveRuntime } from './profile-save-server';
import { MOVE_SERVICE_OPERATIONS } from './parent-facade';
import { ASK_PREVIEW, GRANT_API_PATH, MOVE_PREVIEW, SOURCE_PATH } from './reviewed-origins';
import { SOURCE_CAPABILITY, SOURCE_LOGIN, SOURCE_POOLER_USER, SOURCE_SEARCH_PATH } from './source-pool';
import { PARENT_FORM_PATH } from './isolated-runtime';
import { projection } from './selection';
import { manifestDigest, type GuestStageInput, type ItemReceipt } from './vendor/v2-3-profile-transfer';
import type { BrowserBinding } from './profile-save-adapter';
import type { TransferRecord } from './profile-save-adapter';

const hash = (value: string) => createHash('sha256').update(value).digest('hex');
const browser: BrowserBinding = { binding: 'b'.repeat(43), csrfVerified: true, origin: MOVE_PREVIEW, environment: 'isolated' };
const slug = 'hindman-isaacs-moving-storage-inc';

function keys() {
  const generated = generateKeyPairSync('ed25519');
  return {
    privatePem: generated.privateKey.export({ type: 'pkcs8', format: 'pem' }).toString(),
    publicPem: generated.publicKey.export({ type: 'spki', format: 'pem' }).toString(),
  };
}

function claimsOf(token: string): AssertionClaims {
  return JSON.parse(Buffer.from(token.split('.')[1]!, 'base64url').toString('utf8')) as AssertionClaims;
}

function baseEnv(material = keys()) {
  return {
    VERCEL_ENV: 'preview', NODE_ENV: 'production', NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED: '1',
    MTH_MOVE_PARENT_SAVE_MODE: 'isolated', MTH_MOVE_PARENT_SAVE_ISOLATED_APPROVED: 'true',
    MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND: REVIEWED_SOURCE_METADATA.sourceBackend,
    MTH_MOVE_PARENT_SAVE_MOVE_ORIGIN: MOVE_PREVIEW, MTH_MOVE_PARENT_SAVE_PARENT_ORIGIN: ASK_PREVIEW,
    MTH_MOVE_PARENT_SAVE_FORM_PATH: PARENT_FORM_PATH,
    MTH_MOVE_PARENT_SAVE_DATABASE_URL: `postgresql://${SOURCE_POOLER_USER}@${REVIEWED_SOURCE_METADATA.databaseHost}:5432/${REVIEWED_SOURCE_METADATA.databaseName}`,
    MTH_MOVE_PARENT_SAVE_DATABASE_CA: 'FIXTURE NOT A CERTIFICATE',
    MTH_V23_MOVE_ISOLATED_SOURCE_APPROVED: 'true', MTH_V23_MOVE_ISOLATED_SOURCE: 'isolated-move-reader',
    MY_TRUSTHUB_V23_MOVE_KEY_ID: 'move-test', MY_TRUSTHUB_V23_MOVE_SIGNING_PRIVATE_KEY_PEM: material.privatePem,
    MY_TRUSTHUB_V23_ASK_KEY_ID: 'ask-test', MY_TRUSTHUB_V23_ASK_VERIFY_PUBLIC_KEY_PEM: material.publicPem,
  };
}

function database() {
  const records = new Map<string, TransferRecord>();
  const nonces = new Set<string>();
  const queries: string[] = [];
  const pool = { async connect() { return { async query(sql: string, args: unknown[] = []) {
    queries.push(sql);
    if (sql.includes('mth_profile_transfer.certified_publication')) {
      assert.equal(sql.includes('public.'), false);
      return { rows: [{ native_id: 'usdot-1002530', canonical_slug: slug, publication_state: 'PUBLISHABLE', reviewed_class: 'mover' }] };
    }
    if (sql.includes('claim_assertion_nonce')) {
      const key = String(args[0]);
      if (nonces.has(key)) return { rows: [{ claimed: false }] };
      nonces.add(key); return { rows: [{ claimed: true }] };
    }
    if (sql.includes('pg_try_advisory_lock')) return { rows: [{ locked: true }] };
    if (sql.includes('pg_advisory_unlock')) return { rows: [] };
    if (sql.startsWith('insert into mth_profile_transfer.stages')) {
      records.set(String(args[0]), JSON.parse(String(args[3]))); return { rows: [] };
    }
    if (sql.includes('select record from')) {
      const record = records.get(String(args[0])); return { rows: record ? [{ record }] : [] };
    }
    if (sql.startsWith('update mth_profile_transfer.stages')) {
      records.set(String(args[0]), JSON.parse(String(args[1]))); return { rows: [{ ticket_hash: args[0] }] };
    }
    if (sql.includes('quota')) return { rows: [{ count: 1 }] };
    if (sql.includes('session_user')) return { rows: [{ login: SOURCE_LOGIN, active_role: SOURCE_CAPABILITY, search_path: SOURCE_SEARCH_PATH }] };
    return { rows: [] };
  }, release() {} }; }, async end() {} };
  return { pool, queries, records };
}

test('preview assembly fails closed without reviewed inputs and ignores a flag by itself', () => {
  const env = baseEnv();
  assert.equal(createPreviewMoveRuntime({ ...env, VERCEL_ENV: 'production' }), null);
  assert.equal(createPreviewMoveRuntime({ ...env, MTH_MOVE_PARENT_SAVE_DATABASE_URL: undefined }), null);
  assert.equal(createPreviewMoveRuntime({ ...env, MTH_MOVE_PARENT_SAVE_DATABASE_CA: undefined }), null);
  assert.equal(createPreviewMoveRuntime({ ...env, MY_TRUSTHUB_V23_MOVE_SIGNING_PRIVATE_KEY_PEM: undefined }), null);
  assert.equal(createPreviewMoveRuntime({ ...env, MY_TRUSTHUB_V23_ASK_VERIFY_PUBLIC_KEY_PEM: undefined }), null);
  assert.equal(createPreviewMoveRuntime({ ...env, MTH_MOVE_PARENT_SAVE_DATABASE_URL: env.MTH_MOVE_PARENT_SAVE_DATABASE_URL!.replace(':5432', ':6543') }), null);
  assert.equal(createPreviewMoveRuntime({ ...env, MTH_MOVE_PARENT_SAVE_DATABASE_URL: env.MTH_MOVE_PARENT_SAVE_DATABASE_URL!.replace(REVIEWED_SOURCE_METADATA.databaseHost, 'other.invalid') }), null);
  assert.equal(createPreviewMoveRuntime({ NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED: '1', MTH_MOVE_PARENT_SAVE_MODE: 'isolated' }), null);
  const previous = process.env.VERCEL_ENV;
  process.env.VERCEL_ENV = 'production';
  assert.equal(getMoveProfileSaveBindings(), null);
  assert.equal(getMoveProfileSaveRuntime(), null);
  process.env.VERCEL_ENV = previous;
  assert.equal(CERTIFIED_PUBLICATION_CONTRACT.schema, 'mth_profile_transfer');
  assert.equal(CERTIFIED_PUBLICATION_CONTRACT.table, 'certified_publication');
  assert.equal(CERTIFIED_PUBLICATION_CONTRACT.grants.includes('SELECT only'), true);
  assert.equal(MOVE_SERVICE_OPERATIONS.includes('commitProfileSave' as never), false);
});

test('accepted binding uses transfer:stage with a null session and the verified browser', async () => {
  const material = keys();
  const env = baseEnv(material);
  const captured: { body: Record<string, unknown> | null; claims: AssertionClaims | null } = { body: null, claims: null };
  const send = (async (url: string, init?: RequestInit) => {
    assert.equal(url, ASK_PREVIEW + GRANT_API_PATH);
    captured.body = JSON.parse(String(init?.body)) as Record<string, unknown>;
    captured.claims = claimsOf(new Headers(init?.headers).get(ASSERTION_HEADER)!);
    const profile = captured.body.profile ?? { hub: 'move', nativeId: 'usdot-1002530', profileClass: 'mover' };
    const status = url.endsWith('rejected') ? 'review_required' : 'accepted';
    return Response.json({ ok: true, result: { profile, binding: { id: 'binding-1', networkEntityId: 'network-1', status } } });
  }) as typeof fetch;
  const accepted = await fetchAcceptedBinding({ browser, key: { kid: 'move-test', pem: material.privatePem }, send });
  assert.deepEqual(accepted, { id: 'binding-1', networkEntityId: 'network-1', status: 'accepted' });
  assert.equal(captured.body?.action, 'binding');
  assert.equal(captured.claims?.scope, 'transfer:stage');
  assert.equal(captured.claims?.session, null);
  assert.equal(captured.claims?.grant, null);
  assert.equal(captured.claims?.browser, browser.binding);
  const wrong = await fetchAcceptedBinding({ browser, key: { kid: 'move-test', pem: material.privatePem }, send: (async (_url, init) => {
    const parsed = JSON.parse(String(init?.body)) as { action?: string };
    return Response.json({ ok: true, result: { profile: { hub: 'move', nativeId: 'usdot-9', profileClass: 'mover' }, binding: { id: 'binding-1', networkEntityId: 'network-1', status: 'accepted' }, extra: parsed.action } });
  }) as typeof fetch });
  assert.equal(wrong, null);
  const unaccepted = await fetchAcceptedBinding({ browser, key: { kid: 'move-test', pem: material.privatePem }, send: (async () => Response.json({ ok: true, result: { profile: { hub: 'move', nativeId: 'usdot-1002530', profileClass: 'mover' }, binding: { id: 'binding-1', networkEntityId: 'network-1', status: 'review_required' } } })) as typeof fetch });
  assert.equal(unaccepted, null);
  void env;
});

test('hosted preview threads browser, durable nonce, source continuation, and request-specific receipt proof', async () => {
  const material = keys();
  const env = baseEnv(material);
  const db = database();
  const assertions: AssertionClaims[] = [];
  const operations: string[] = [];
  const savedAt = '2026-09-19T00:00:00.000Z';
  const digest = hash(projection(slug, savedAt));
  const selected = [{ companySlug: slug, savedAt, revision: digest, digest }];
  let stageRecord: TransferRecord | null = null;
  const deadline = Date.now() + 60_000;
  const send = (async (url: string, init?: RequestInit) => {
    const parsed = JSON.parse(String(init?.body)) as { action?: string; operation?: string; continuationRef?: string; input?: GuestStageInput };
    assertions.push(claimsOf(new Headers(init?.headers).get(ASSERTION_HEADER)!));
    if (String(url).endsWith(GRANT_API_PATH)) {
      if (parsed.action === 'binding') return Response.json({ ok: true, result: { profile: { hub: 'move', nativeId: 'usdot-1002530', profileClass: 'mover' }, binding: { id: 'binding-1', networkEntityId: 'network-1', status: 'accepted' } } });
      if (parsed.action === 'challenge') {
        assert.equal(parsed.continuationRef, stageRecord?.continuationRef);
        return Response.json({ ok: true, result: { target: ASK_PREVIEW + '/my/profile-save/current-grant', fields: { challengeRef: 'd'.repeat(43) } } });
      }
      return Response.json({ ok: true, result: { accountContextRef: 'a'.repeat(43), selectionConfirmed: true, sessionBinding: hash('session-a'), proofRef: 'e'.repeat(43), expiresAt: Date.now() + 30_000 } });
    }
    operations.push(String(parsed.operation));
    assert.notEqual(parsed.operation, 'commitProfileSave');
    if (parsed.operation === 'prepareGuestProfileTransfer') {
      return Response.json({ ok: true, operation: parsed.operation, result: { transferRef: 't'.repeat(43), manifestDigest: manifestDigest(parsed.input!), expiresAt: deadline } });
    }
    if (parsed.operation === 'prepareProfileSaveContinuation') {
      return Response.json({ ok: true, operation: parsed.operation, result: { continuationRef: 'c'.repeat(43), expiresAt: deadline } });
    }
    const record = [...db.records.values()][0];
    const receipt: ItemReceipt = { receiptRef: 'r'.repeat(43), requestKey: record.requestPrefix + ':0', accountContextRef: 'a'.repeat(43),
      manifestDigest: record.parentStage.manifestDigest, item: record.manifest.selected[0]!, parent: { outcome: 'saved', savedRef: 's'.repeat(8) }, project: { outcome: 'not_requested' }, localCopy: 'keep' };
    return Response.json({ ok: true, operation: parsed.operation, result: parsed.operation === 'getProfileSaveReceipt' ? receipt : receipt });
  }) as typeof fetch;
  const runtime = createPreviewMoveRuntime(env, { send, createPool: () => db.pool })!;
  assert.ok(runtime);
  assert.equal(db.queries.some(sql => sql.includes('from mth_profile_transfer.certified_publication')), false);
  const prepared = await runtime.http.adapter.prepare(selected, browser);
  assert.equal(prepared.state, 'continue');
  if (prepared.state !== 'continue') return;
  stageRecord = [...db.records.values()][0] ?? null;
  assert.equal(assertions[0]?.scope, 'transfer:stage');
  assert.equal(assertions[0]?.session, null);
  assert.equal(assertions[0]?.grant, null);
  assert.equal(assertions[0]?.browser, browser.binding);
  assert.equal(assertions[1]?.session, null);
  assert.equal(assertions[1]?.grant, null);
  const challenge = await runtime.http.grantChallenge!(browser, prepared.ticket);
  assert.equal(challenge?.challengeRef, 'd'.repeat(43));
  const other: BrowserBinding = { ...browser, binding: 'z'.repeat(43) };
  assert.equal(await runtime.http.grantChallenge!(other, prepared.ticket), null);
  const first = await runtime.http.resolveGrant!(browser, prepared.ticket, 'e'.repeat(43));
  assert.equal(first && first !== 'account_changed' && first.sessionBinding, hash('session-a'));
  assert.equal(first && first !== 'account_changed' && first.proofRef, 'e'.repeat(43));
  const before = assertions.length;
  assert.equal((await runtime.http.adapter.finish(prepared.ticket, selected, browser, first === 'account_changed' ? undefined : first!)).state, 'parent_saved');
  const receiptClaims = assertions.slice(before).filter(claim => claim.scope === 'receipt:verify');
  assert.ok(receiptClaims.length >= 2);
  assert.equal(receiptClaims.every(claim => claim.session === hash('session-a') && claim.grant === 'e'.repeat(43)), true);
  const secondSession = hash('session-b');
  const second = { accountContextRef: 'a'.repeat(43), selectionConfirmed: true as const, sessionBinding: secondSession, proofRef: 'f'.repeat(43) };
  const mark = assertions.length;
  assert.equal((await runtime.http.adapter.finish(prepared.ticket, selected, browser, second)).state, 'parent_saved');
  const later = assertions.slice(mark).filter(claim => claim.scope === 'receipt:verify');
  assert.equal(later.every(claim => claim.session === secondSession && claim.grant === 'f'.repeat(43)), true);
  assert.equal(later.some(claim => claim.session === hash('session-a')), false);
  assert.equal(operations.includes('commitProfileSave'), false);
  assert.equal(db.queries.some(sql => sql.includes('mth_profile_transfer.certified_publication')), true);
  const proofBody = JSON.stringify({ action: 'source', continuationRef: 'c'.repeat(43) });
  const proofToken = signAssertion({ kid: 'ask-test', pem: material.privatePem }, 'ask', MOVE_PREVIEW + SOURCE_PATH, 'source:read', Buffer.from(proofBody), browser.binding, null, null);
  const proof = new Request(MOVE_PREVIEW + SOURCE_PATH, { method: 'POST', headers: { 'content-type': 'application/json', [ASSERTION_HEADER]: proofToken }, body: proofBody });
  assert.equal((await runtime.authorize(proof, 'source:read'))?.browserProof, browser.binding);
  assert.equal(db.queries.some(sql => sql.includes('claim_assertion_nonce')), true);
  const replay = new Request(MOVE_PREVIEW + SOURCE_PATH, { method: 'POST', headers: { 'content-type': 'application/json', [ASSERTION_HEADER]: proofToken }, body: proofBody });
  assert.equal(await runtime.authorize(replay, 'source:read'), null);
});
