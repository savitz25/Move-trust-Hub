import test from 'node:test';
import assert from 'node:assert/strict';
import { generateKeyPairSync } from 'node:crypto';
import { deploymentPair, productionHandoffEnabled, reviewedPair, ISOLATED_PAIR, PRODUCTION_PAIR, ASK_PRODUCTION, MOVE_PRODUCTION } from './reviewed-origins';
import { signAssertion, verifyAssertion } from './service-assertion';
import { enabled } from './profile-save-adapter';
import { publicationSourceApproved } from './publication-resolver';

const PRODUCTION_ENV = {
  VERCEL_ENV: 'production', MTH_MOVE_PARENT_SAVE_MODE: 'production', MTH_MOVE_PARENT_SAVE_PRODUCTION_APPROVED: 'true',
  NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED: '1', MTH_MOVE_PARENT_SAVE_MOVE_ORIGIN: MOVE_PRODUCTION, MTH_MOVE_PARENT_SAVE_PARENT_ORIGIN: ASK_PRODUCTION,
  MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND: 'production-move-reader', MTH_MOVE_PARENT_SAVE_FORM_PATH: '/my/profile-save',
  MTH_MOVE_PARENT_SAVE_PRODUCTION_PROJECT: 'arepfylnilkjmyduhwbz',
};

test('M01 production pair is denied without the explicit mode, approval and exact pins', () => {
  assert.equal(productionHandoffEnabled(PRODUCTION_ENV), true);
  assert.equal(deploymentPair(PRODUCTION_ENV), PRODUCTION_PAIR);
  for (const patch of [
    { MTH_MOVE_PARENT_SAVE_MODE: 'isolated' }, { MTH_MOVE_PARENT_SAVE_PRODUCTION_APPROVED: 'false' },
    { MTH_MOVE_PARENT_SAVE_MOVE_ORIGIN: 'https://movetrusthub.com' }, { MTH_MOVE_PARENT_SAVE_PARENT_ORIGIN: ISOLATED_PAIR.parentOrigin },
    { MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND: 'isolated-move-reader' }, { MTH_MOVE_PARENT_SAVE_PRODUCTION_PROJECT: 'zvoijbohtyuhqfuvteoy' },
    { MTH_MOVE_PARENT_SAVE_ISOLATED_APPROVED: 'true' }, { VERCEL_ENV: 'preview' }, { NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED: '0' },
  ]) {
    assert.equal(productionHandoffEnabled({ ...PRODUCTION_ENV, ...patch }), false, JSON.stringify(patch));
    assert.notEqual(deploymentPair({ ...PRODUCTION_ENV, ...patch }), PRODUCTION_PAIR, JSON.stringify(patch));
  }
  // A production Vercel environment with only the isolated configuration stays closed.
  assert.equal(deploymentPair({ VERCEL_ENV: 'production', MTH_MOVE_PARENT_SAVE_MODE: 'isolated', MTH_MOVE_PARENT_SAVE_ISOLATED_APPROVED: 'true' }), null);
  assert.equal(deploymentPair({ VERCEL_ENV: 'preview', MTH_MOVE_PARENT_SAVE_MODE: 'isolated' }), ISOLATED_PAIR);
});

test('M02 reviewed pairs are exact; adapter enablement follows the pair shape', () => {
  assert.equal(reviewedPair(ASK_PRODUCTION, MOVE_PRODUCTION), PRODUCTION_PAIR);
  assert.equal(reviewedPair(ISOLATED_PAIR.parentOrigin, ISOLATED_PAIR.moveOrigin), ISOLATED_PAIR);
  assert.equal(reviewedPair(ASK_PRODUCTION, ISOLATED_PAIR.moveOrigin), null);
  assert.equal(reviewedPair('https://asktrusthub.com', MOVE_PRODUCTION), null);
  const production = { enabled: true, environment: 'production' as const, verifiedIsolatedPair: false, moveOrigin: MOVE_PRODUCTION, parentOrigin: ASK_PRODUCTION, parentFormPath: '/my/profile-save' };
  assert.equal(enabled(production), true);
  assert.equal(enabled({ ...production, verifiedIsolatedPair: true }), false);
  assert.equal(enabled({ ...production, moveOrigin: 'https://move.vercel.app' }), false);
  assert.equal(enabled({ ...production, parentOrigin: 'https://ask.test' }), false);
  assert.equal(enabled({ ...production, environment: 'isolated' }), false);
});

test('M03 production publication attestation uses its own approval pair', () => {
  assert.equal(publicationSourceApproved({ ...PRODUCTION_ENV, MTH_V23_MOVE_PRODUCTION_SOURCE_APPROVED: 'true', MTH_V23_MOVE_PRODUCTION_SOURCE: 'production-move-reader' }), true);
  assert.equal(publicationSourceApproved({ ...PRODUCTION_ENV, MTH_V23_MOVE_ISOLATED_SOURCE_APPROVED: 'true', MTH_V23_MOVE_ISOLATED_SOURCE: 'isolated-move-reader' }), false);
  assert.equal(publicationSourceApproved({ ...PRODUCTION_ENV, MTH_V23_MOVE_PRODUCTION_SOURCE_APPROVED: 'true', MTH_V23_MOVE_PRODUCTION_SOURCE: 'arepfylnilkjmyduhwbz' }), false);
});

test('M04 service assertions are pinned per pair', async () => {
  const { privateKey, publicKey } = generateKeyPairSync('ed25519');
  const key = { kid: 'k', pem: privateKey.export({ type: 'pkcs8', format: 'pem' }).toString() };
  const pub = { kid: 'k', pem: publicKey.export({ type: 'spki', format: 'pem' }).toString() };
  const browser = 'A'.repeat(43), body = Buffer.from('{}');
  const target = ASK_PRODUCTION + '/api/my-trusthub/profile-save';
  const assertion = signAssertion(key, 'move', target, 'transfer:stage', body, browser, null, null, Date.now(), PRODUCTION_PAIR);
  const request = new Request(target, { method: 'POST', headers: { 'x-trusthub-v23-assertion': assertion } });
  const claims = await verifyAssertion(request, body, pub, 'move', 'transfer:stage', { claim: async () => true }, Date.now(), PRODUCTION_PAIR);
  assert.equal(claims.iss, 'urn:trusthub:v23:qvvxvbcdmbjzrgvwjatw:move');
  assert.equal(claims.sub, 'svc:trusthub:move:v23:production');
  await assert.rejects(verifyAssertion(request, body, pub, 'move', 'transfer:stage', { claim: async () => true }, Date.now(), ISOLATED_PAIR));
  assert.throws(() => signAssertion(key, 'move', target, 'transfer:stage', body, browser, null, null, Date.now(), ISOLATED_PAIR));
});
