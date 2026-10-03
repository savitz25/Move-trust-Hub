import assert from 'node:assert/strict';
import { createHash, generateKeyPairSync } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { classifyProvider } from '@/lib/provider/classification';
import { createHostedMoveRuntime } from './hosted-runtime';
import { evaluatePublishedMover, publishedMoverSource, type CompaniesPort, type CompanyRecord } from './publication-source';
import { resolveExactMovePublication } from './publication-resolver';
import { ASSERTION_HEADER } from './service-assertion';
import { ASK_PRODUCTION, GRANT_API_PATH, MOVE_PRODUCTION, PRODUCTION_PAIR } from './reviewed-origins';
import { SOURCE_CAPABILITY, SOURCE_SEARCH_PATH } from './source-pool';
import { projection } from './selection';
import { manifestDigest, type GuestStageInput } from './vendor/v2-3-profile-transfer';
import type { BrowserBinding, TransferRecord } from './profile-save-adapter';

const hash = (value: string) => createHash('sha256').update(value).digest('hex');

// Row shapes copied from the production publication source (public.companies),
// read anonymously on 2026-10-03. Only the columns the resolver reads.
const company = (patch: CompanyRecord): CompanyRecord => ({
  entity_type: 'Carrier', services: ['Carrier'], specialties: [], coverage: 'Interstate household-goods authority — confirm origin and destination with this company',
  service_scope: 'interstate', publication_state: 'PUBLISHABLE', indexable: true, out_of_service: false, authority_active: true, is_verified: true, fmcsa_raw: null, ...patch });
const HINDMAN = company({ id: 'usdot-1002530', slug: 'hindman-isaacs-moving-storage-inc', name: 'HINDMAN & ISAACS MOVING & STORAGE, INC.', usdot_number: '1002530', mc_number: '421784' });
const GENTLE = company({ id: 'gentle-giant', slug: 'gentle-giant-moving', name: 'Gentle Giant Moving Company', usdot_number: '373544', mc_number: '228137',
  services: ['Full Service', 'Storage', 'Carrier'], specialties: ['White Glove', 'Art', 'Antiques', 'Pianos'], coverage: 'Northeast' });
const CARAWAY = company({ id: 'usdot-1684331', slug: 'caraway-moving-inc', name: 'CARAWAY MOVING INC', usdot_number: '1684331', mc_number: '618833' });
const INGESTED = company({ id: 'usdot-5550001', slug: 'fixture-ingested-mover', usdot_number: '5550001', publication_state: 'INGESTED', indexable: false });
const REVIEW = company({ id: 'usdot-5550002', slug: 'fixture-review-mover', usdot_number: '5550002', publication_state: 'REVIEW_REQUIRED', indexable: false });
const INACTIVE = company({ id: 'usdot-5550003', slug: 'fixture-inactive-mover', usdot_number: '5550003', publication_state: 'INACTIVE', indexable: false });
const LEGACY_NULL = company({ id: 'usdot-5550004', slug: 'fixture-legacy-mover', usdot_number: '5550004', publication_state: null });
const OUT_OF_SERVICE = company({ id: 'usdot-5550005', slug: 'fixture-oos-mover', usdot_number: '5550005', out_of_service: true });
const BROKER = company({ id: 'usdot-5550006', slug: 'fixture-broker', usdot_number: '5550006', entity_type: 'Broker', services: ['Broker'] });
const AUTO = company({ id: 'usdot-5550007', slug: 'fixture-auto-carrier', usdot_number: '5550007', services: ['Auto Transport', 'Carrier'], service_scope: null, coverage: 'Continental US' });
const DUPLICATE_A = company({ id: 'usdot-5550008', slug: 'fixture-duplicate-mover', usdot_number: '5550008' });
const DUPLICATE_B = company({ id: 'fixture-duplicate', slug: 'fixture-duplicate-mover-2', usdot_number: '5550008' });
const NO_USDOT = company({ id: 'fixture-local', slug: 'fixture-no-usdot-mover', usdot_number: null });
const ROWS = [HINDMAN, GENTLE, CARAWAY, INGESTED, REVIEW, INACTIVE, LEGACY_NULL, OUT_OF_SERVICE, BROKER, AUTO, DUPLICATE_A, DUPLICATE_B, NO_USDOT];

/** The production port's shape over the fixture rows: two exact-equality reads
 * and the profile page's real classifier. */
function port(rows: CompanyRecord[] = ROWS) {
  const reads: string[] = [];
  const companies: CompaniesPort = {
    bySlug: async slug => { reads.push('slug:' + slug); return rows.filter(row => row.slug === slug).slice(0, 3); },
    byUsdot: async usdot => { reads.push('usdot:' + usdot); return rows.filter(row => row.usdot_number === usdot).slice(0, 3); },
    capabilities: row => classifyProvider({ entityType: row.entity_type as string, services: row.services as string[], specialties: row.specialties as string[],
      coverage: row.coverage as string, serviceScope: row.service_scope as string | null, usdotNumber: row.usdot_number as string | null,
      mcNumber: row.mc_number as string | null, fmcsaRaw: row.fmcsa_raw as Record<string, unknown> | null }).capabilities,
  };
  return { companies, reads };
}
const profileOf = (row: CompanyRecord) => ({ hub: 'move' as const, nativeId: 'usdot-' + row.usdot_number, profileClass: 'mover' });
const APPROVED = { VERCEL_ENV: 'production', MTH_V23_MOVE_PRODUCTION_SOURCE_APPROVED: 'true', MTH_V23_MOVE_PRODUCTION_SOURCE: 'production-move-reader' };

test('A/O. two non-Hindman published movers and the Hindman reference resolve through the real-source resolver', async () => {
  const source = publishedMoverSource(port().companies);
  for (const row of [GENTLE, CARAWAY, HINDMAN]) {
    const expected = { nativeId: 'usdot-' + row.usdot_number, canonicalSlug: row.slug, publicationState: 'PUBLISHABLE', reviewedClass: 'mover' };
    assert.deepEqual(await source.bySlug(row.slug as string), expected);
    assert.deepEqual(await source.byIdentity(profileOf(row)), expected);
    const publication = await resolveExactMovePublication(APPROVED, source.byIdentity, profileOf(row), 1000);
    assert.deepEqual(publication, { identity: profileOf(row), canonicalSlug: row.slug, publicationState: 'PUBLISHABLE', reviewedClass: 'mover', checkedAt: 1000 });
  }
  // The native identity is the USDOT number, never the row id (which is not uniform).
  assert.equal((await source.bySlug('gentle-giant-moving'))!.nativeId, 'usdot-373544');
  assert.notEqual(GENTLE.id, 'usdot-373544');
});

test('B. unpublished movers are not eligible: explicit internal states, a missing state, out of service', async () => {
  const source = publishedMoverSource(port().companies);
  for (const row of [INGESTED, REVIEW, INACTIVE, LEGACY_NULL, OUT_OF_SERVICE]) {
    assert.equal(await source.bySlug(row.slug as string), null, String(row.slug));
    assert.equal(await source.byIdentity(profileOf(row)), null, String(row.slug));
    assert.equal(await resolveExactMovePublication(APPROVED, source.byIdentity, profileOf(row)), null);
  }
  // A company row merely existing is not eligibility.
  assert.equal(evaluatePublishedMover([company({ slug: 'x', usdot_number: '5', publication_state: undefined })], '5', () => ['hhg_interstate_carrier']), null);
});

test('C. unsupported class: broker-only and auto-only profiles are never a trusted mover Save', async () => {
  const source = publishedMoverSource(port().companies);
  for (const row of [BROKER, AUTO]) {
    assert.equal((await source.bySlug(row.slug as string))?.reviewedClass, 'unsupported');
    assert.equal(await resolveExactMovePublication(APPROVED, source.byIdentity, profileOf(row)), null);
    assert.equal(await resolveExactMovePublication(APPROVED, source.byIdentity, { ...profileOf(row), profileClass: 'broker' }), null);
  }
});

test('exact stable identity only: no duplicate USDOT, no alias, id, name, pattern or missing-USDOT lookup', async () => {
  const { companies, reads } = port();
  const source = publishedMoverSource(companies);
  for (const slug of ['fixture-duplicate-mover', 'fixture-duplicate-mover-2']) assert.equal(await source.bySlug(slug), null);
  assert.equal(await source.byIdentity({ hub: 'move', nativeId: 'usdot-5550008', profileClass: 'mover' }), null);
  assert.equal(await source.bySlug('fixture-no-usdot-mover'), null);
  reads.length = 0;
  for (const input of ['gentle-giant', 'Gentle Giant Moving Company', 'GENTLE-GIANT-MOVING', 'gentle-giant-moving%', 'gentle*', '../gentle-giant-moving', 'usdot-373544', ''])
    assert.equal(await source.bySlug(input), null, input);
  for (const nativeId of ['gentle-giant', '373544', 'usdot-0', 'usdot-373544 ', 'usdot-37354a', 'USDOT-373544', 'usdot-99999999999'])
    assert.equal(await source.byIdentity({ hub: 'move', nativeId, profileClass: 'mover' }), null, nativeId);
  assert.equal(await source.byIdentity({ hub: 'insurance' as 'move', nativeId: 'usdot-373544', profileClass: 'mover' }), null);
  // Malformed input never reaches the source; well-formed misses are exact-equality reads only.
  assert.deepEqual(reads, ['slug:gentle-giant', 'slug:usdot-373544']);
  // A source failure is "not eligible", never a throw into the Save path.
  const down = publishedMoverSource({ ...companies, byUsdot: async () => { throw new Error('down'); } });
  assert.equal(await down.bySlug('gentle-giant-moving'), null);
  assert.equal(await down.byIdentity(profileOf(GENTLE)), null);
});

// --- Production runtime, end to end at the Move boundary -------------------
function keys() {
  const pair = generateKeyPairSync('ed25519');
  return { privatePem: pair.privateKey.export({ type: 'pkcs8', format: 'pem' }).toString(), publicPem: pair.publicKey.export({ type: 'spki', format: 'pem' }).toString() };
}
function productionEnv(material = keys()) {
  const host = 'aws-0-us-east-1.pooler.supabase.com';
  return {
    VERCEL_ENV: 'production', NODE_ENV: 'production', NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED: '1',
    MTH_MOVE_PARENT_SAVE_MODE: 'production', MTH_MOVE_PARENT_SAVE_PRODUCTION_APPROVED: 'true', MTH_MOVE_PARENT_SAVE_PRODUCTION_PROJECT: PRODUCTION_PAIR.project,
    MTH_MOVE_PARENT_SAVE_MOVE_ORIGIN: MOVE_PRODUCTION, MTH_MOVE_PARENT_SAVE_PARENT_ORIGIN: ASK_PRODUCTION, MTH_MOVE_PARENT_SAVE_FORM_PATH: '/my/profile-save',
    MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND: PRODUCTION_PAIR.sourceBackend, MTH_V23_MOVE_PRODUCTION_SOURCE: 'production-move-reader', MTH_V23_MOVE_PRODUCTION_SOURCE_APPROVED: 'true',
    MTH_MOVE_PARENT_SAVE_DATABASE_HOST: host,
    MTH_MOVE_PARENT_SAVE_DATABASE_URL: `postgresql://${PRODUCTION_PAIR.login}.${PRODUCTION_PAIR.project}@${host}:5432/postgres`,
    MTH_MOVE_PARENT_SAVE_DATABASE_CA: 'FIXTURE NOT A CERTIFICATE',
    MY_TRUSTHUB_V23_MOVE_KEY_ID: 'move-test', MY_TRUSTHUB_V23_MOVE_SIGNING_PRIVATE_KEY_PEM: material.privatePem,
    MY_TRUSTHUB_V23_ASK_KEY_ID: 'ask-test', MY_TRUSTHUB_V23_ASK_VERIFY_PUBLIC_KEY_PEM: keys().publicPem,
  };
}
function database() {
  const records = new Map<string, TransferRecord>(), queries: string[] = [];
  const pool = { async connect() { return { async query(sql: string, args: unknown[] = []) {
    queries.push(sql);
    if (sql.includes('pg_try_advisory_lock')) return { rows: [{ locked: true }] };
    if (sql.startsWith('insert into mth_profile_transfer.stages')) { records.set(String(args[0]), JSON.parse(String(args[3]))); return { rows: [] }; }
    if (sql.includes('quota')) return { rows: [{ count: 1 }] };
    if (sql.includes('session_user')) return { rows: [{ login: PRODUCTION_PAIR.login, active_role: SOURCE_CAPABILITY, search_path: SOURCE_SEARCH_PATH }] };
    return { rows: [] };
  }, release() {} }; }, async end() {} };
  return { pool, queries, records };
}
const browser: BrowserBinding = { binding: 'b'.repeat(43), csrfVerified: true, origin: MOVE_PRODUCTION, environment: 'production' };
const selection = (slug: string) => { const savedAt = '2026-10-03T00:00:00.000Z', digest = hash(projection(slug, savedAt)); return [{ companySlug: slug, savedAt, revision: digest, digest }]; };

/** The parent (Ask) as Move sees it: a binding answer per exact identity, then
 * the two staging operations. `bindings` is the parent's verdict per USDOT id. */
function parent(bindings: Record<string, 'accepted' | 'none' | 'ambiguous' | 'review_required'>) {
  const asked: Array<Record<string, unknown>> = [], operations: string[] = [], deadline = Date.now() + 60_000;
  const send = (async (url: string, init?: RequestInit) => {
    assert.ok(String(url).startsWith(ASK_PRODUCTION + '/'));
    assert.ok(new Headers(init?.headers).get(ASSERTION_HEADER));
    const parsed = JSON.parse(String(init?.body)) as { action?: string; profile?: { nativeId: string }; operation?: string; input?: GuestStageInput };
    if (String(url).endsWith(GRANT_API_PATH)) {
      asked.push(parsed as Record<string, unknown>);
      const verdict = bindings[parsed.profile?.nativeId ?? ''] ?? 'none';
      // The parent answers only for exactly one accepted binding; everything else is an error.
      if (verdict !== 'accepted') return Response.json({ ok: false, error: 'unavailable' }, { status: 503 });
      return Response.json({ ok: true, result: { profile: parsed.profile, binding: { id: 'binding-' + parsed.profile!.nativeId, networkEntityId: 'entity-' + parsed.profile!.nativeId, status: 'accepted' } } });
    }
    operations.push(String(parsed.operation));
    if (parsed.operation === 'prepareGuestProfileTransfer') return Response.json({ ok: true, operation: parsed.operation, result: { transferRef: 't'.repeat(43), manifestDigest: manifestDigest(parsed.input!), expiresAt: deadline } });
    return Response.json({ ok: true, operation: parsed.operation, result: { continuationRef: createHash('sha256').update(String(operations.length)).digest('base64url'), expiresAt: deadline } });
  }) as typeof fetch;
  return { send, asked, operations };
}

test('G. production runtime: any eligible published mover with one accepted binding stages a Save for its exact identity', async () => {
  const db = database(), ask = parent({ 'usdot-373544': 'accepted', 'usdot-1684331': 'accepted', 'usdot-1002530': 'accepted' }), source = port();
  const projects: string[] = [];
  const runtime = createHostedMoveRuntime(productionEnv(), { send: ask.send, createPool: () => db.pool, companies: project => { projects.push(project); return source.companies; } })!;
  assert.ok(runtime);
  for (const row of [GENTLE, CARAWAY, HINDMAN]) {
    const slug = row.slug as string, nativeId = 'usdot-' + row.usdot_number;
    const prepared = await runtime.http.adapter.prepare(selection(slug), browser);
    assert.equal(prepared.state, 'continue', slug);
    if (prepared.state !== 'continue') return;
    assert.equal(prepared.target, ASK_PRODUCTION + '/my/profile-save');
    const record = [...db.records.values()].at(-1)!;
    assert.deepEqual(record.manifest.selected[0]!.profile, { hub: 'move', nativeId, profileClass: 'mover' });
    assert.deepEqual(record.manifest.returnTask, { kind: 'profile', hub: 'move', canonicalSlug: slug, profile: { hub: 'move', nativeId, profileClass: 'mover' }, returnPath: '/companies/' + slug });
    // The parent was asked about exactly this identity, nothing else.
    assert.deepEqual(ask.asked.at(-1), { action: 'binding', profile: { hub: 'move', nativeId, profileClass: 'mover' } });
    // The parent's own publication re-check (source callback "resolve") answers for the same identity.
    assert.deepEqual({ ...(await runtime.resolvePublication({ hub: 'move', nativeId, profileClass: 'mover' })), checkedAt: 0 },
      { identity: { hub: 'move', nativeId, profileClass: 'mover' }, canonicalSlug: slug, publicationState: 'PUBLISHABLE', reviewedClass: 'mover', checkedAt: 0 });
  }
  assert.deepEqual(ask.operations, Array(3).fill(['prepareGuestProfileTransfer', 'prepareProfileSaveContinuation']).flat());
  // Production reads the real source for the pinned project and never the one-row attestation table.
  assert.deepEqual([...new Set(projects)], ['arepfylnilkjmyduhwbz']);
  assert.equal(db.queries.some(sql => sql.includes('certified_publication')), false);
});

test('B/C/D/E/F. production runtime: every ineligible mover stays a device Save and nothing is staged with the parent', async () => {
  const db = database(), source = port();
  const ask = parent({ 'usdot-373544': 'none', 'usdot-1684331': 'ambiguous', 'usdot-1002530': 'review_required',
    'usdot-5550001': 'accepted', 'usdot-5550006': 'accepted', 'usdot-5550008': 'accepted' });
  const runtime = createHostedMoveRuntime(productionEnv(), { send: ask.send, createPool: () => db.pool, companies: () => source.companies })!;
  const cases: Array<[string, CompanyRecord]> = [['D missing binding', GENTLE], ['E ambiguous binding', CARAWAY], ['F review_required binding', HINDMAN],
    ['B unpublished', INGESTED], ['B review-required publication', REVIEW], ['B inactive', INACTIVE], ['C broker', BROKER], ['C auto-only', AUTO],
    ['duplicate USDOT', DUPLICATE_A], ['no USDOT', NO_USDOT]];
  for (const [label, row] of cases) {
    const prepared = await runtime.http.adapter.prepare(selection(row.slug as string), browser);
    assert.equal(prepared.state, 'local_only', label);
    assert.equal((prepared as { localCopy: string }).localCopy, 'keep', label);
  }
  assert.equal((await runtime.http.adapter.prepare(selection('no-such-mover'), browser)).state, 'local_only');
  // Nothing was staged, and the parent was only ever asked about movers Move itself proved published.
  assert.deepEqual(ask.operations, []); assert.equal(db.records.size, 0);
  assert.deepEqual(ask.asked.map(body => (body.profile as { nativeId: string }).nativeId), ['usdot-373544', 'usdot-1684331', 'usdot-1002530']);
  // The parent's publication re-check is refused for them as well.
  for (const row of [INGESTED, BROKER, DUPLICATE_A]) assert.equal(await runtime.resolvePublication(profileOf(row)), null);
  assert.equal(await runtime.resolvePublication({ hub: 'move', nativeId: 'gentle-giant', profileClass: 'mover' }), null);
});

test('production runtime fails closed without the pinned real source; the isolated pair never reads it', async () => {
  const db = database(), ask = parent({ 'usdot-373544': 'accepted' });
  const unavailable = createHostedMoveRuntime(productionEnv(), { send: ask.send, createPool: () => db.pool, companies: () => null })!;
  assert.equal((await unavailable.http.adapter.prepare(selection('gentle-giant-moving'), browser)).state, 'local_only');
  assert.deepEqual(ask.asked, []);
  const hosted = readFileSync('lib/my-trusthub/hosted-runtime.ts', 'utf8'), adapter = readFileSync('lib/my-trusthub/companies-publication-port.ts', 'utf8');
  // No Hindman pin anywhere in the runtime; the reference lives in tests only.
  for (const file of ['hosted-runtime.ts', 'publication-resolver.ts', 'publication-source.ts', 'companies-publication-port.ts', 'isolated-runtime.ts', 'profile-save-adapter.ts'])
    assert.doesNotMatch(readFileSync('lib/my-trusthub/' + file, 'utf8').replace(/native_id = 'usdot-1002530'|canonical_slug = 'hindman-isaacs-moving-storage-inc'/g, ''), /1002530|hindman/i, file);
  assert.match(hosted, /pair\.kind === 'isolated'\) return isolatedPublicationSource\(pool\)/);
  // The production adapter is an anonymous, exact-equality, bounded read pinned to one project.
  assert.match(adapter, /\.eq\(column, value\)\.limit\(3\)/); assert.match(adapter, /getSupabaseAnonKey/);
  assert.doesNotMatch(adapter, /service_role|SERVICE_ROLE|ilike|\.or\(|textSearch/);
});
