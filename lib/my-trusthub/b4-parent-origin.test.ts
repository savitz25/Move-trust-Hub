import assert from 'node:assert/strict';
import { generateKeyPairSync } from 'node:crypto';
import test from 'node:test';
import { signedParentChannel } from './parent-facade';
import { PARENT_FORM_PATH } from './isolated-runtime';
import { ASK_PRODUCTION, ASK_PREVIEW, ISOLATED_PAIR, MOVE_PREVIEW, MOVE_PRODUCTION, PRODUCTION_PAIR, deploymentPair, productionHandoffEnabled, reviewedPair } from './reviewed-origins';
import { ASSERTION_HEADER, signAssertion, verifyAssertion, type AssertionClaims } from './service-assertion';
import { createHostedMoveRuntime, REVIEWED_SOURCE_METADATA } from './hosted-runtime';
import { SOURCE_POOLER_USER } from './source-pool';
import { PROFILE_SAVE_ENDPOINT } from './vendor/interface';

/** The retained parent-runtime alias. It is no longer the isolated pair. */
const RETAINED_PARE = 'https://conumers-trust-hub-git-mth-v2-3-pare-3127df-savitz25-s-projects.vercel.app';
const PROPOSED_PARENT = 'https://conumers-trust-hub-git-b4-lender-ask-710157-savitz25-s-projects.vercel.app';

const PRODUCTION_ENV = {
  VERCEL_ENV: 'production', MTH_MOVE_PARENT_SAVE_MODE: 'production', MTH_MOVE_PARENT_SAVE_PRODUCTION_APPROVED: 'true',
  NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED: '1', MTH_MOVE_PARENT_SAVE_MOVE_ORIGIN: MOVE_PRODUCTION, MTH_MOVE_PARENT_SAVE_PARENT_ORIGIN: ASK_PRODUCTION,
  MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND: 'production-move-reader', MTH_MOVE_PARENT_SAVE_FORM_PATH: '/my/profile-save',
  MTH_MOVE_PARENT_SAVE_PRODUCTION_PROJECT: 'arepfylnilkjmyduhwbz',
};

function material() {
  const generated = generateKeyPairSync('ed25519');
  return {
    privatePem: generated.privateKey.export({ type: 'pkcs8', format: 'pem' }).toString(),
    publicPem: generated.publicKey.export({ type: 'spki', format: 'pem' }).toString(),
  };
}

function claimsOf(token: string): AssertionClaims {
  return JSON.parse(Buffer.from(token.split('.')[1]!, 'base64url').toString('utf8')) as AssertionClaims;
}

function isolatedEnv(keys = material(), parent = PROPOSED_PARENT) {
  return {
    VERCEL_ENV: 'preview', NODE_ENV: 'production', NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED: '1',
    MTH_MOVE_PARENT_SAVE_MODE: 'isolated', MTH_MOVE_PARENT_SAVE_ISOLATED_APPROVED: 'true',
    MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND: REVIEWED_SOURCE_METADATA.sourceBackend,
    MTH_MOVE_PARENT_SAVE_MOVE_ORIGIN: MOVE_PREVIEW, MTH_MOVE_PARENT_SAVE_PARENT_ORIGIN: parent,
    MTH_MOVE_PARENT_SAVE_FORM_PATH: PARENT_FORM_PATH,
    MTH_MOVE_PARENT_SAVE_DATABASE_URL: `postgresql://${SOURCE_POOLER_USER}@${REVIEWED_SOURCE_METADATA.databaseHost}:5432/${REVIEWED_SOURCE_METADATA.databaseName}`,
    MTH_MOVE_PARENT_SAVE_DATABASE_CA: 'FIXTURE NOT A CERTIFICATE',
    MTH_V23_MOVE_ISOLATED_SOURCE_APPROVED: 'true', MTH_V23_MOVE_ISOLATED_SOURCE: 'isolated-move-reader',
    MY_TRUSTHUB_V23_MOVE_KEY_ID: 'move-test', MY_TRUSTHUB_V23_MOVE_SIGNING_PRIVATE_KEY_PEM: keys.privatePem,
    MY_TRUSTHUB_V23_ASK_KEY_ID: 'ask-test', MY_TRUSTHUB_V23_ASK_VERIFY_PUBLIC_KEY_PEM: keys.publicPem,
  };
}

test('the isolated pair is the proposed Ask parent and the existing Move origin', () => {
  assert.equal(ASK_PREVIEW, PROPOSED_PARENT);
  assert.equal(MOVE_PREVIEW, 'https://move-trust-hub-git-mth-v2-3-move-cur-0a05f1-savitz25-s-projects.vercel.app');
  assert.equal(ISOLATED_PAIR.parentOrigin, PROPOSED_PARENT);
  assert.equal(ISOLATED_PAIR.moveOrigin, MOVE_PREVIEW);
  assert.equal(ISOLATED_PAIR.project, 'zvoijbohtyuhqfuvteoy');
  assert.equal(ISOLATED_PAIR.assertionProject, 'xkkiicsassizmakcvxml');
  assert.equal(ISOLATED_PAIR.assertionEnvironment, 'isolated');
  assert.equal(ISOLATED_PAIR.sourceBackend, 'isolated-move-reader');
  assert.equal(ISOLATED_PAIR.login, 'mth_move_v23_preview');
  assert.equal(reviewedPair(PROPOSED_PARENT, MOVE_PREVIEW), ISOLATED_PAIR);
  assert.equal(deploymentPair({ VERCEL_ENV: 'preview', MTH_MOVE_PARENT_SAVE_MODE: 'isolated' }), ISOLATED_PAIR);
});

test('a mixed retained pare parent and the new Move origin is not reviewed', () => {
  assert.equal(reviewedPair(RETAINED_PARE, MOVE_PREVIEW), null);
  assert.equal(reviewedPair(PROPOSED_PARENT, MOVE_PRODUCTION), null);
  assert.equal(reviewedPair(ASK_PRODUCTION, MOVE_PREVIEW), null);
  assert.equal(reviewedPair(PROPOSED_PARENT, RETAINED_PARE), null);
  assert.notEqual(deploymentPair({ VERCEL_ENV: 'preview', MTH_MOVE_PARENT_SAVE_MODE: 'isolated' })?.parentOrigin, RETAINED_PARE);
});

test('hosted runtime accepts the proposed parent and rejects the retained pare parent', () => {
  const keys = material();
  const pool = { async connect() { throw Error('unused'); }, async end() {} };
  const send = (async () => Response.json({ ok: false })) as typeof fetch;
  const admitted = createHostedMoveRuntime(isolatedEnv(keys, PROPOSED_PARENT), { send, createPool: () => pool });
  assert.ok(admitted);
  assert.equal(createHostedMoveRuntime(isolatedEnv(keys, RETAINED_PARE), { send, createPool: () => pool }), null);
  assert.equal(createHostedMoveRuntime({ ...isolatedEnv(keys), MTH_MOVE_PARENT_SAVE_MOVE_ORIGIN: MOVE_PRODUCTION }, { send, createPool: () => pool }), null);
  assert.equal(createHostedMoveRuntime({ ...PRODUCTION_ENV, MTH_MOVE_PARENT_SAVE_PARENT_ORIGIN: PROPOSED_PARENT }, { send, createPool: () => pool }), null);
});

test('signed audience and destination stay on the proposed parent', async () => {
  const keys = material();
  const key = { kid: 'move-test', pem: keys.privatePem };
  const pub = { kid: 'move-test', pem: keys.publicPem };
  const browser = 'B'.repeat(43);
  const body = Buffer.from('{}');
  const target = PROPOSED_PARENT + PROFILE_SAVE_ENDPOINT;
  const token = signAssertion(key, 'move', target, 'transfer:stage', body, browser, null, null, Date.now(), ISOLATED_PAIR);
  const claims = claimsOf(token);
  assert.equal(claims.aud, target);
  assert.equal(claims.ask_origin, PROPOSED_PARENT);
  assert.equal(claims.move_origin, MOVE_PREVIEW);
  assert.equal(claims.iss, 'urn:trusthub:v23:xkkiicsassizmakcvxml:move');
  assert.equal(claims.sub, 'svc:trusthub:move:v23:isolated');
  const request = new Request(target, { method: 'POST', headers: { [ASSERTION_HEADER]: token } });
  const verified = await verifyAssertion(request, body, pub, 'move', 'transfer:stage', { claim: async () => true }, Date.now(), ISOLATED_PAIR);
  assert.equal(verified.aud, target);
  assert.throws(() => signAssertion(key, 'move', RETAINED_PARE + PROFILE_SAVE_ENDPOINT, 'transfer:stage', body, browser, null, null, Date.now(), ISOLATED_PAIR));
  await assert.rejects(verifyAssertion(new Request(RETAINED_PARE + PROFILE_SAVE_ENDPOINT, { method: 'POST', headers: { [ASSERTION_HEADER]: token } }), body, pub, 'move', 'transfer:stage', { claim: async () => true }, Date.now(), ISOLATED_PAIR));

  const seen: { url?: string; aud?: string } = {};
  const channel = signedParentChannel({
    enabled: true, environment: 'isolated', verifiedIsolatedPair: true,
    moveOrigin: MOVE_PREVIEW, parentOrigin: PROPOSED_PARENT, parentFormPath: PARENT_FORM_PATH,
  }, key, (async (url, init) => {
    seen.url = String(url);
    seen.aud = claimsOf(new Headers(init?.headers).get(ASSERTION_HEADER)!).aud;
    return Response.json({ ok: true, operation: 'prepareGuestProfileTransfer', result: { transferRef: 't'.repeat(43) } });
  }) as typeof fetch);
  const response = await channel.post(target, { operation: 'prepareGuestProfileTransfer', input: {} }, { binding: browser, csrfVerified: true, origin: MOVE_PREVIEW, environment: 'isolated' }, AbortSignal.timeout(1000), { session: null, grant: null });
  assert.equal(response.ok, true);
  assert.equal(seen.url, target);
  assert.equal(seen.aud, target);
  await assert.rejects(channel.post(RETAINED_PARE + PROFILE_SAVE_ENDPOINT, { operation: 'prepareGuestProfileTransfer', input: {} }, { binding: browser, csrfVerified: true, origin: MOVE_PREVIEW, environment: 'isolated' }, AbortSignal.timeout(1000), { session: null, grant: null }));
});

test('the production pair and its admission pins stay unchanged', () => {
  assert.equal(PRODUCTION_PAIR.parentOrigin, 'https://www.asktrusthub.com');
  assert.equal(PRODUCTION_PAIR.moveOrigin, 'https://www.movetrusthub.com');
  assert.equal(PRODUCTION_PAIR.project, 'arepfylnilkjmyduhwbz');
  assert.equal(PRODUCTION_PAIR.assertionProject, 'qvvxvbcdmbjzrgvwjatw');
  assert.equal(PRODUCTION_PAIR.login, 'mth_move_v23_prod');
  assert.equal(productionHandoffEnabled(PRODUCTION_ENV), true);
  assert.equal(deploymentPair(PRODUCTION_ENV), PRODUCTION_PAIR);
  assert.equal(productionHandoffEnabled({ ...PRODUCTION_ENV, MTH_MOVE_PARENT_SAVE_PARENT_ORIGIN: PROPOSED_PARENT }), false);
  assert.equal(productionHandoffEnabled({ ...PRODUCTION_ENV, MTH_MOVE_PARENT_SAVE_PARENT_ORIGIN: RETAINED_PARE }), false);
  assert.equal(deploymentPair({ ...PRODUCTION_ENV, MTH_MOVE_PARENT_SAVE_PARENT_ORIGIN: PROPOSED_PARENT }), null);
  assert.equal(reviewedPair(ASK_PRODUCTION, MOVE_PRODUCTION), PRODUCTION_PAIR);
});
