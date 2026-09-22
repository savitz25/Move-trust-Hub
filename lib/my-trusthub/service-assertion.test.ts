import test from 'node:test';
import assert from 'node:assert/strict';
import { generateKeyPairSync, sign } from 'node:crypto';
import { ASSERTION_HEADER, signAssertion, verifyAssertion, type AssertionKey } from './service-assertion';
import { API_PATH, SOURCE_PATH, ASK_ORIGIN, MOVE_ORIGIN } from './config';

// Ephemeral TEST keys and a MOCK nonce store. Actual PostgreSQL replay tests are
// in the separate native PostgreSQL suite; these are not parent Auth/JQA proof.
export function testKeys(kid: string) {
  const { privateKey, publicKey } = generateKeyPairSync('ed25519');
  return { private: { kid, pem: privateKey.export({ type: 'pkcs8', format: 'pem' }).toString() },
    public: { kid, pem: publicKey.export({ type: 'spki', format: 'pem' }).toString() } };
}
const keys = testKeys('ask-test'), move = testKeys('move-test');
const browser = 'b'.repeat(43), body = Buffer.from('{ "action": "resolve" }'), now = 1800000000000;
const target = MOVE_ORIGIN + SOURCE_PATH;
const fresh = () => signAssertion(keys.private, 'ask', target, 'source:read', body, browser, null, null, now);
const request = (token: string, url = target, method = 'POST') => new Request(url, { method, headers: { [ASSERTION_HEADER]: token } });
const nonces = () => { const used = new Set<string>(); return { async claim(key: string) { if (used.has(key)) return false; used.add(key); return true; } }; };
function changed(token: string, key: AssertionKey, change: (h: any, c: any) => void) {
  const [a,b] = token.split('.'), h = JSON.parse(Buffer.from(a, 'base64url').toString()), c = JSON.parse(Buffer.from(b, 'base64url').toString());
  change(h,c); const bytes = Buffer.from(JSON.stringify(h)).toString('base64url') + '.' + Buffer.from(JSON.stringify(c)).toString('base64url');
  return bytes + '.' + sign(null, Buffer.from(bytes), key.pem).toString('base64url');
}
test('Move signs, Ask direction verifies exact body/request and claim set', async () => {
  const t = signAssertion(move.private, 'move', ASK_ORIGIN + API_PATH, 'transfer:stage', body, browser, null, null, now);
  const c = await verifyAssertion(request(t, ASK_ORIGIN + API_PATH), body, move.public, 'move', 'transfer:stage', nonces(), now);
  assert.equal(c.browser, browser); assert.equal(c.exp - c.iat, 30); assert.equal(c.session, null); assert.equal(c.grant, null);
});
test('Ask signed callback and replay', async () => {
  const token = fresh(), store = nonces();
  assert.equal((await verifyAssertion(request(token), body, keys.public, 'ask', 'source:read', store, now)).browser, browser);
  await assert.rejects(verifyAssertion(request(token), body, keys.public, 'ask', 'source:read', store, now));
});
for (const [name, change] of Object.entries<Record<string, (h: any,c: any) => void>[string]>({
  kid: h => { h.kid = 'wrong'; }, alg: h => { h.alg = 'HS256'; }, extra_header: h => { h.jku = 'https://attacker.test'; },
  issuer: (_h,c) => { c.iss = 'wrong'; }, subject: (_h,c) => { c.sub = 'wrong'; }, audience: (_h,c) => { c.aud = ASK_ORIGIN + API_PATH; },
  scope: (_h,c) => { c.scope = 'source:ack'; }, method: (_h,c) => { c.method = 'GET'; }, path: (_h,c) => { c.path = API_PATH; },
  body: (_h,c) => { c.body_sha256 = '0'.repeat(64); }, expired: (_h,c) => { c.iat -= 30; c.exp -= 30; }, future: (_h,c) => { c.iat += 3; c.exp += 3; },
  ttl: (_h,c) => { c.exp++; }, ask_origin: (_h,c) => { c.ask_origin = 'https://evil.vercel.app'; }, move_origin: (_h,c) => { c.move_origin = 'https://www.movetrusthub.com'; },
  browser: (_h,c) => { c.browser = 'untrusted-account'; }, session: (_h,c) => { c.session = 'raw-session-id'; }, grant: (_h,c) => { c.grant = 'raw-JWT'; },
  extra_claim: (_h,c) => { c.user = 'subject'; }, version: (_h,c) => { c.v = 2; }, jti: (_h,c) => { c.jti = 'same'; },
})) test('assertion rejects ' + name, async () => {
  await assert.rejects(verifyAssertion(request(changed(fresh(), keys.private, change)), body, keys.public, 'ask', 'source:read', nonces(), now));
});
test('wrong signature, body bytes, URL and HTTP method are rejected', async () => {
  const token = fresh();
  await assert.rejects(verifyAssertion(request(token), body, move.public, 'ask', 'source:read', nonces(), now));
  await assert.rejects(verifyAssertion(request(token), Buffer.from('{"action":"resolve"}'), keys.public, 'ask', 'source:read', nonces(), now));
  for (const url of [target + '?x=1', target + '#x', target.replace(MOVE_ORIGIN, 'https://other.vercel.app')]) await assert.rejects(verifyAssertion(request(token, url), body, keys.public, 'ask', 'source:read', nonces(), now));
  await assert.rejects(verifyAssertion(request(token, target, 'GET'), body, keys.public, 'ask', 'source:read', nonces(), now));
});
test('nonce store unavailable fails closed', async () => {
  await assert.rejects(verifyAssertion(request(fresh()), body, keys.public, 'ask', 'source:read', { claim: async () => { throw Error('DB offline'); } }, now));
});
