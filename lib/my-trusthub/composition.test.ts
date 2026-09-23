import assert from 'node:assert/strict';
import test from 'node:test';
import { createHash, createPrivateKey, generateKeyPairSync, sign } from 'node:crypto';
import { ASK_PREVIEW, GRANT_BROWSER_PATH, MOVE_PREVIEW, SOURCE_PATH } from './reviewed-origins';
import { ASSERTION_HEADER, issuer, signAssertion, verifyAskSourceCaller, verifyAssertion, type AssertionClaims, type AssertionKey } from './service-assertion';
import { askVerifyKey, moveSigningKey } from './service-keys';
import { PostgresAssertionNonceStore } from './assertion-nonce-store';
import { CERTIFIED_SLUG, publicationSourceApproved, resolveExactMovePublication } from './publication-resolver';
import { acceptCurrentGrantMessage, exactGrantTarget, parentSavedAllowed } from './current-grant-browser';
import { requestCurrentGrantChallenge, resolveCurrentGrantProof } from './parent-grant';
import { MOVE_SERVICE_OPERATIONS, signedParentChannel } from './parent-facade';
import { createIsolatedMoveRuntime, PARENT_FORM_PATH, type IsolatedMovePorts } from './isolated-runtime';
import { handleSourceCallback } from './source-callback-http';
import { handleMoveProfileSave } from './profile-save-http';
import type { BrowserBinding } from './profile-save-adapter';
import { PROFILE_SAVE_ENDPOINT, PROFILE_SAVE_RUNTIME_VERSION } from './vendor/interface';

const browser = 'b'.repeat(43);
const hash = (value: string) => createHash('sha256').update(value).digest('hex');
const profile = { hub: 'move', nativeId: 'usdot-1002530', profileClass: 'mover' };
const row = { nativeId: profile.nativeId, canonicalSlug: CERTIFIED_SLUG, publicationState: 'PUBLISHABLE', reviewedClass: 'mover' };
const approved = { VERCEL_ENV: 'preview', MTH_V23_MOVE_ISOLATED_SOURCE_APPROVED: 'true', MTH_V23_MOVE_ISOLATED_SOURCE: 'isolated-move-reader' };
function pair() {
  const generated = generateKeyPairSync('ed25519');
  return {
    privateKey: { kid: 'fixture-only', pem: generated.privateKey.export({ type: 'pkcs8', format: 'pem' }).toString() },
    publicKey: { kid: 'fixture-only', pem: generated.publicKey.export({ type: 'spki', format: 'pem' }).toString() },
  };
}
function nonceStore() {
  const seen = new Set<string>(); let calls = 0;
  return { calls: () => calls, claim: async (key: string) => { calls += 1; if (seen.has(key)) return false; seen.add(key); return true; } };
}
function claimsOf(token: string): AssertionClaims {
  return JSON.parse(Buffer.from(token.split('.')[1]!, 'base64url').toString('utf8')) as AssertionClaims;
}
function resign(key: AssertionKey, claims: AssertionClaims): string {
  const header = Buffer.from(JSON.stringify({ alg: 'EdDSA', typ: 'trusthub-v23+jws', kid: key.kid })).toString('base64url');
  const payload = Buffer.from(JSON.stringify(claims)).toString('base64url');
  const unsigned = header + '.' + payload;
  return unsigned + '.' + sign(null, Buffer.from(unsigned), createPrivateKey(key.pem)).toString('base64url');
}
function requestFor(body: string, token: string, url = MOVE_PREVIEW + SOURCE_PATH) {
  return new Request(url, { method: 'POST', headers: { 'content-type': 'application/json', [ASSERTION_HEADER]: token }, body });
}

test('publication resolver requires the approved isolated source and the exact certified identity', async () => {
  let reads = 0;
  const read = async () => { reads += 1; return row; };
  assert.equal(publicationSourceApproved({}), false);
  assert.equal(await resolveExactMovePublication({}, read, profile), null);
  assert.equal(reads, 0);
  for (const name of ['arepfylnilkjmyduhwbz', 'qvvxvbcdmbjzrgvwjatw', 'tzzcogaricohtezsugjr', 'https://isolated.supabase.co']) {
    assert.equal(publicationSourceApproved({ ...approved, MTH_V23_MOVE_ISOLATED_SOURCE: name }), false);
  }
  assert.equal(publicationSourceApproved({ ...approved, VERCEL_ENV: 'production' }), false);
  const now = Date.now();
  const found = await resolveExactMovePublication(approved, read, profile, now);
  assert.deepEqual(found, { identity: profile, canonicalSlug: CERTIFIED_SLUG, publicationState: 'PUBLISHABLE', reviewedClass: 'mover', checkedAt: now });
  assert.equal(Object.hasOwn(found!, 'binding'), false);
  assert.equal(reads, 1);
  for (const bad of [{ nativeId: 'usdot-1' }, { profileClass: 'auto_carrier' }, { hub: 'insurance' }, { name: 'Hindman' }]) {
    assert.equal(await resolveExactMovePublication(approved, read, { ...profile, ...bad }, now), null);
  }
  assert.equal(reads, 1, 'fuzzy or non-certified identities never reach the reader');
  assert.equal(await resolveExactMovePublication(approved, async () => ({ ...row, canonicalSlug: 'other-slug' }), profile, now), null);
  assert.equal(await resolveExactMovePublication(approved, async () => ({ ...row, publicationState: 'INDEXABLE' }), profile, now), null);
  assert.equal(await resolveExactMovePublication(approved, async () => ({ ...row, reviewedClass: 'carrier' }), profile, now), null);
  assert.equal(await resolveExactMovePublication(approved, async () => null, profile, now), null);
});

test('service keys stay absent unless both name and an Ed25519 PEM are already supplied', () => {
  assert.equal(moveSigningKey({}), null);
  assert.equal(askVerifyKey({}), null);
  const keys = pair();
  assert.equal(moveSigningKey({ MY_TRUSTHUB_V23_MOVE_KEY_ID: 'move-test', MY_TRUSTHUB_V23_MOVE_SIGNING_PRIVATE_KEY_PEM: keys.privateKey.pem })?.kid, 'move-test');
  assert.equal(askVerifyKey({ MY_TRUSTHUB_V23_ASK_KEY_ID: 'ask-test', MY_TRUSTHUB_V23_ASK_VERIFY_PUBLIC_KEY_PEM: keys.publicKey.pem })?.kid, 'ask-test');
  assert.equal(moveSigningKey({ MY_TRUSTHUB_V23_MOVE_KEY_ID: 'move-test', MY_TRUSTHUB_V23_MOVE_SIGNING_PRIVATE_KEY_PEM: keys.publicKey.pem }), null);
});

test('Ask resolve callback accepts only an exact signed request for the certified publication', async () => {
  const keys = pair(); const now = Date.now(); const nonces = nonceStore();
  const body = JSON.stringify({ action: 'resolve', profile });
  const token = signAssertion(keys.privateKey, 'ask', MOVE_PREVIEW + SOURCE_PATH, 'source:read', Buffer.from(body), browser, null, null, now);
  let reads = 0;
  const env = { VERCEL_ENV: 'preview', NODE_ENV: 'production', NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED: '1', MTH_MOVE_PARENT_SAVE_MODE: 'isolated',
    MTH_MOVE_PARENT_SAVE_ISOLATED_APPROVED: 'true', MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND: 'isolated-move-reader',
    MTH_MOVE_PARENT_SAVE_MOVE_ORIGIN: MOVE_PREVIEW, MTH_MOVE_PARENT_SAVE_PARENT_ORIGIN: ASK_PREVIEW, MTH_MOVE_PARENT_SAVE_FORM_PATH: PARENT_FORM_PATH,
    ...approved };
  const ports: IsolatedMovePorts = {
    verifiedPair: { moveOrigin: MOVE_PREVIEW, parentOrigin: ASK_PREVIEW, sourceBackend: 'isolated-move-reader', isolated: true },
    sessionAffinity: 'dedicated', pool: { connect: async () => { throw Error('no database in this test'); } },
    channel: { post: async () => { throw Error('resolve must not call parent'); } },
    resolveExactPublished: async () => { throw Error('resolve must not use the save binding path'); },
    currentGrant: async () => null,
    verifySourceCaller: (proof, scope) => verifyAskSourceCaller(proof, scope, keys.publicKey, nonces, now),
    readCertifiedPublication: async identity => { reads += 1; assert.deepEqual(identity, profile); return row; },
  };
  const runtime = createIsolatedMoveRuntime(env, ports)!;
  const response = await handleSourceCallback(requestFor(body, token), runtime);
  assert.equal(response.status, 200);
  const payload = await response.json() as { ok: boolean; result: { checkedAt: number } };
  assert.equal(payload.ok, true);
  assert.ok(payload.result.checkedAt <= Date.now() + 2000 && payload.result.checkedAt >= Date.now() - 5000);
  assert.deepEqual({ ...payload.result, checkedAt: 0 }, { identity: profile, canonicalSlug: CERTIFIED_SLUG, publicationState: 'PUBLISHABLE', reviewedClass: 'mover', checkedAt: 0 });
  assert.equal(reads, 1);
  const wrongId = JSON.stringify({ action: 'resolve', profile: { ...profile, nativeId: 'usdot-9' } });
  const wrongToken = signAssertion(keys.privateKey, 'ask', MOVE_PREVIEW + SOURCE_PATH, 'source:read', Buffer.from(wrongId), browser, null, null, now);
  assert.equal((await handleSourceCallback(requestFor(wrongId, wrongToken), runtime)).status, 503);
  const unpublished = createIsolatedMoveRuntime(env, { ...ports, readCertifiedPublication: async () => ({ ...row, publicationState: 'INGESTED' }) })!;
  const again = signAssertion(keys.privateKey, 'ask', MOVE_PREVIEW + SOURCE_PATH, 'source:read', Buffer.from(body), browser, null, null, now);
  assert.equal((await handleSourceCallback(requestFor(body, again), unpublished)).status, 503);
  const unapprovedToken = signAssertion(keys.privateKey, 'ask', MOVE_PREVIEW + SOURCE_PATH, 'source:read', Buffer.from(body), browser, null, null, now);
  assert.equal((await handleSourceCallback(requestFor(body, unapprovedToken), createIsolatedMoveRuntime({ ...env, MTH_V23_MOVE_ISOLATED_SOURCE_APPROVED: undefined }, ports))).status, 503);
});

test('assertion verifier rejects issuer, audience, scope, tamper, expiry, replay and origin-pair mistakes', async () => {
  const keys = pair(); const now = Date.now(); const nonces = nonceStore();
  const bytes = Buffer.from(JSON.stringify({ action: 'resolve', profile }));
  const target = MOVE_PREVIEW + SOURCE_PATH;
  const token = signAssertion(keys.privateKey, 'ask', target, 'source:read', bytes, browser, null, null, now);
  const caller = (proof: Request, store = nonces, when = now) => verifyAskSourceCaller(proof, 'source:read', keys.publicKey, store, when);
  assert.equal((await caller(requestFor(bytes.toString(), token)))?.browserProof, browser);
  const wrongIssuer = resign(keys.privateKey, { ...claimsOf(token), iss: issuer('move') });
  assert.equal(await caller(requestFor(bytes.toString(), wrongIssuer)), null);
  assert.equal(await caller(requestFor(bytes.toString(), token, target + '/other')), null);
  assert.equal(await caller(requestFor(bytes.toString(), token, ASK_PREVIEW + SOURCE_PATH)), null);
  const ack = signAssertion(keys.privateKey, 'ask', target, 'source:ack', bytes, browser, hash('session'), null, now);
  assert.equal(await verifyAskSourceCaller(requestFor(bytes.toString(), ack), 'source:read', keys.publicKey, nonceStore(), now), null);
  const tampered = JSON.stringify({ action: 'resolve', profile: { ...profile, nativeId: 'usdot-9' } });
  assert.equal(await caller(requestFor(tampered, token)), null);
  const fresh = nonceStore();
  const expiring = signAssertion(keys.privateKey, 'ask', target, 'source:read', bytes, browser, null, null, now);
  assert.equal(await caller(requestFor(bytes.toString(), expiring), fresh, now + 31_000), null);
  assert.equal(fresh.calls(), 0);
  const replay = signAssertion(keys.privateKey, 'ask', target, 'source:read', bytes, browser, null, null, now);
  const once = nonceStore();
  assert.ok(await caller(requestFor(bytes.toString(), replay), once));
  assert.equal(await caller(requestFor(bytes.toString(), replay), once), null);
  const wrongPair = resign(keys.privateKey, { ...claimsOf(token), move_origin: 'https://move.test' });
  assert.equal(await caller(requestFor(bytes.toString(), wrongPair)), null);
  await assert.rejects(verifyAssertion(requestFor(bytes.toString(), signAssertion(keys.privateKey, 'ask', target, 'source:read', bytes, browser, null, null, now)), bytes, keys.publicKey, 'ask', 'source:read', { claim: async () => { throw Error('database unavailable'); } }, now));
});

test('durable nonce store claims once in Postgres and fails closed when the statement fails', async () => {
  const seen = new Set<string>();
  const pool = { async connect() { return { async query(_sql: string, args: unknown[] = []) {
    const key = String(args[0]);
    if (seen.has(key)) return { rows: [{ claimed: false }] };
    seen.add(key); return { rows: [{ claimed: true }] };
  }, release() {} }; } };
  const store = new PostgresAssertionNonceStore(pool);
  assert.equal(await store.claim('a'.repeat(64), Date.now() + 1000), true);
  assert.equal(await store.claim('a'.repeat(64), Date.now() + 1000), false);
  const failing = new PostgresAssertionNonceStore({ async connect() { return { async query() { throw Error('database unavailable'); }, release() {} }; } });
  await assert.rejects(failing.claim('b'.repeat(64), Date.now() + 1000));
});

test('current-grant challenge and resolve stay on the reviewed browser, proof and account', async () => {
  const keys = pair(); const now = Date.now();
  const binding: BrowserBinding = { binding: browser, csrfVerified: true, origin: MOVE_PREVIEW, environment: 'isolated' };
  const record = { browserHash: hash(browser), continuationRef: 'c'.repeat(43), accountContextRef: 'a'.repeat(43) };
  let sends = 0;
  const send = async (url: string, init?: RequestInit) => {
    sends += 1;
    assert.equal(url, ASK_PREVIEW + '/api/my-trusthub/profile-save/current-grant');
    assert.equal(new Headers(init?.headers).has('origin'), false);
    const claims = claimsOf(new Headers(init?.headers).get(ASSERTION_HEADER)!);
    assert.equal(claims.browser, browser); assert.equal(claims.scope, 'receipt:verify'); assert.equal(claims.grant, null);
    const body = JSON.parse(String(init?.body));
    if (body.action === 'challenge') return Response.json({ ok: true, result: { target: ASK_PREVIEW + GRANT_BROWSER_PATH, challengeRef: 'd'.repeat(43) } });
    if (body.proofRef === 'e'.repeat(43)) return Response.json({ ok: true, result: { accountContextRef: 'z'.repeat(43), selectionConfirmed: true, sessionBinding: hash('session'), expiresAt: now + 30_000 } });
    return Response.json({ ok: false }, { status: 403 });
  };
  assert.equal(await requestCurrentGrantChallenge({ record: { ...record, browserHash: hash('z'.repeat(43)) }, browser: binding, key: keys.privateKey, parentOrigin: ASK_PREVIEW, moveOrigin: MOVE_PREVIEW, send, now }), null);
  assert.equal(sends, 0);
  assert.equal(await requestCurrentGrantChallenge({ record, browser: binding, key: keys.privateKey, parentOrigin: 'https://ask.test', moveOrigin: MOVE_PREVIEW, send, now }), null);
  assert.equal(sends, 0);
  const challenge = await requestCurrentGrantChallenge({ record, browser: binding, key: keys.privateKey, parentOrigin: ASK_PREVIEW, moveOrigin: MOVE_PREVIEW, send, now });
  assert.deepEqual(challenge, { target: ASK_PREVIEW + GRANT_BROWSER_PATH, challengeRef: 'd'.repeat(43) });
  assert.equal(await resolveCurrentGrantProof({ record, browser: binding, proofRef: 'short', key: keys.privateKey, parentOrigin: ASK_PREVIEW, moveOrigin: MOVE_PREVIEW, send, now }), null);
  assert.equal(sends, 1);
  assert.equal(await resolveCurrentGrantProof({ record, browser: binding, proofRef: 'e'.repeat(43), key: keys.privateKey, parentOrigin: ASK_PREVIEW, moveOrigin: MOVE_PREVIEW, send, now }), 'account_changed');
});

test('browser proof rejects the wrong origin, a malformed proofRef, and every popup failure', () => {
  const proof = { type: 'v23-current-grant', proofRef: 'p'.repeat(43) };
  assert.equal(acceptCurrentGrantMessage(ASK_PREVIEW, proof, ASK_PREVIEW, true), 'p'.repeat(43));
  assert.equal(acceptCurrentGrantMessage('https://evil.test', proof, ASK_PREVIEW, true), null);
  assert.equal(acceptCurrentGrantMessage(ASK_PREVIEW, { ...proof, proofRef: 'short' }, ASK_PREVIEW, true), null);
  assert.equal(acceptCurrentGrantMessage(ASK_PREVIEW, { ...proof, accountId: 'hidden' }, ASK_PREVIEW, true), null);
  assert.equal(acceptCurrentGrantMessage(ASK_PREVIEW, proof, ASK_PREVIEW, false), null);
  assert.equal(exactGrantTarget(ASK_PREVIEW + GRANT_BROWSER_PATH, ASK_PREVIEW), true);
  assert.equal(exactGrantTarget(ASK_PREVIEW + GRANT_BROWSER_PATH + '?next=1', ASK_PREVIEW), false);
  for (const popup of ['blocked', 'closed', 'timeout'] as const) assert.equal(parentSavedAllowed(popup, true, 'parent_saved'), false);
  assert.equal(parentSavedAllowed('message', false, 'parent_saved'), false);
  assert.equal(parentSavedAllowed('message', true, 'unavailable'), false);
  assert.equal(parentSavedAllowed('message', true, 'parent_saved'), true);
});

test('Move receipt bridge rejects a malformed proof and an account switch before finish', async () => {
  let finishes = 0; let resolves = 0;
  const origin = 'http://127.0.0.1:4321';
  const config = { enabled: true, environment: 'isolated' as const, verifiedIsolatedPair: true, moveOrigin: origin, parentOrigin: 'http://127.0.0.1:4322', parentFormPath: PARENT_FORM_PATH };
  const adapter = { async finish() { finishes += 1; return { state: 'parent_saved' as const, projectFailed: false, returnPath: '/companies/x', localCopy: 'keep' as const }; } };
  const deps = { config, adapter: adapter as never, allowRequest: async () => true, resolveGrant: async () => { resolves += 1; return 'account_changed' as const; } };
  const boot = await handleMoveProfileSave(new Request(origin + '/api/my-trusthub/profile-save', { method: 'POST', headers: { origin, 'sec-fetch-site': 'same-origin', 'content-type': 'application/json' }, body: JSON.stringify({ action: 'bootstrap' }) }), deps);
  const { csrf } = await boot.json() as { csrf: string };
  const headers = { origin, 'sec-fetch-site': 'same-origin', 'content-type': 'application/json', cookie: 'mth_move_profile_transfer=' + csrf, 'x-mth-csrf': csrf };
  const call = (body: unknown) => handleMoveProfileSave(new Request(origin + '/api/my-trusthub/profile-save', { method: 'POST', headers, body: JSON.stringify(body) }), deps);
  assert.equal((await call({ action: 'receipt', ticket: 't'.repeat(43), selected: [], proofRef: 'short' })).status, 400);
  assert.equal(resolves, 0); assert.equal(finishes, 0);
  const switched = await call({ action: 'receipt', ticket: 't'.repeat(43), selected: [], proofRef: 'p'.repeat(43) });
  assert.equal((await switched.json()).state, 'account_changed');
  assert.equal(resolves, 1); assert.equal(finishes, 0);
  assert.deepEqual([...MOVE_SERVICE_OPERATIONS], ['prepareGuestProfileTransfer', 'prepareProfileSaveContinuation', 'getProfileSaveReceipt', 'verifyProfileSaveReceipt']);
});

test('signed parent channel binds the reviewed origin pair and cannot carry a commit', async () => {
  const keys = pair(); let posts = 0;
  const config = { enabled: true, environment: 'isolated' as const, verifiedIsolatedPair: true, moveOrigin: MOVE_PREVIEW, parentOrigin: ASK_PREVIEW, parentFormPath: PARENT_FORM_PATH };
  const channel = signedParentChannel(config, keys.privateKey, async (_url, init) => {
    posts += 1;
    const token = new Headers(init?.headers).get(ASSERTION_HEADER)!;
    const claims = await verifyAssertion(new Request(ASK_PREVIEW + PROFILE_SAVE_ENDPOINT, { method: 'POST', headers: { [ASSERTION_HEADER]: token } }), Buffer.from(String(init?.body)), keys.publicKey, 'move', 'receipt:verify', nonceStore(), Date.now());
    assert.equal(claims.grant, 'p'.repeat(43)); assert.equal(claims.session, hash('session'));
    return Response.json({ ok: true, operation: 'getProfileSaveReceipt', result: null });
  }, () => ({ session: hash('session'), grant: 'p'.repeat(43) }));
  const binding: BrowserBinding = { binding: browser, csrfVerified: true, origin: MOVE_PREVIEW, environment: 'isolated' };
  const envelope = { version: PROFILE_SAVE_RUNTIME_VERSION, operation: 'getProfileSaveReceipt', input: { requestKey: 'k', accountContextRef: 'a'.repeat(43) } };
  assert.equal((await channel.post(ASK_PREVIEW + PROFILE_SAVE_ENDPOINT, envelope, binding, AbortSignal.timeout(1000))).ok, true);
  await assert.rejects(channel.post(ASK_PREVIEW + PROFILE_SAVE_ENDPOINT, { ...envelope, operation: 'commitProfileSave' }, binding, AbortSignal.timeout(1000)));
  await assert.rejects(channel.post('https://ask.test' + PROFILE_SAVE_ENDPOINT, envelope, binding, AbortSignal.timeout(1000)));
  assert.equal(posts, 1);
});
