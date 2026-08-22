/**
 * FL-011C — read-only ACTIVE IM canonicalization-gap classification.
 * Production writes: 0. Google Places: 0.
 */
import { mkdirSync, writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { loadEnvFiles, resolveDatabaseUrl } from '../lib/state-hhg/calibration/db';
import { loadExactCanaryManifests } from '../lib/state-hhg/canary/manifest';
import { FloridaStateMoverAdapter } from '../lib/state-hhg/fl/adapter';
import { loadWave1Manifest } from '../lib/state-hhg/fl/wave-1';
import { loadFl007HoldCompanyIds } from '../lib/state-hhg/fl/wave-2-readiness';
import {
  FL_011C_GOOGLE_PLACES_REQUESTS,
  FL_STATE_ACTIVE_IM_CANONICALIZATION_GAP_V1,
  FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1_DRAFT,
  classifyActiveImGap,
  hashCanonicalizationDraft,
  proposedImCompanyId,
  toDraftOp,
  type GapClass,
  type GapSubject,
} from '../lib/state-hhg/fl/wave-2-canonicalization';
import type { CanonicalProviderIdentity } from '../lib/state-hhg/identity';
import { normalizeEmail, normalizePhone } from '../lib/state-hhg/normalize';

const AS_OF = '2026-08-22';
const DOCS = resolve(process.cwd(), 'docs');
const LEDGER = resolve(process.cwd(), 'docs/florida-impact-ledger/state');
const DATA = resolve(process.cwd(), 'data/state-hhg/fl');

function tally<T extends string>(rows: Array<{ classification: T }>) {
  const m = new Map<string, number>();
  for (const r of rows) m.set(r.classification, (m.get(r.classification) ?? 0) + 1);
  return Object.fromEntries([...m.entries()].sort()) as Record<GapClass, number>;
}

async function main() {
  loadEnvFiles();
  mkdirSync(DOCS, { recursive: true });
  mkdirSync(LEDGER, { recursive: true });
  mkdirSync(DATA, { recursive: true });

  const wave1 = loadWave1Manifest();
  const wave1Ids = new Set(wave1.members.map((m) => m.companyId));
  const keep80 = new Set(loadExactCanaryManifests().companyIds);
  const holds = new Set(loadFl007HoldCompanyIds());

  const adapter = new FloridaStateMoverAdapter({
    retrievedAt: '2026-08-21T17:11:52.759Z',
  });
  const raw = await adapter.fetchOrLoadRegistry();
  const records = raw
    .map((r) => adapter.normalizeRecord(r))
    .filter((r) => !adapter.resolveBrokerRole(r));

  const client = new pg.Client({
    connectionString: resolveDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 20000,
  });
  await client.connect();
  const companies = await client.query(`
    SELECT id, slug, name, fmcsa_legal_name, phone, email, physical_address, headquarters,
           usdot_number, mc_number, publication_state, indexable
      FROM companies`);
  const existingIds = new Set(companies.rows.map((r: { id: string }) => r.id));
  const psaIm = await client.query(`
    SELECT company_id, authority_number FROM provider_state_authority
     WHERE state_code='FL' AND upper(authority_number) LIKE 'IM%'`);
  await client.end();

  const existingImCompanyIds = new Set(
    [...existingIds].filter((id) => id.startsWith('fl-im-'))
  );
  for (const row of psaIm.rows) {
    existingImCompanyIds.add(String(row.company_id));
  }

  const candidates: CanonicalProviderIdentity[] = companies.rows.map((r: Record<string, unknown>) => ({
    companyId: String(r.id),
    legalName: r.fmcsa_legal_name ? String(r.fmcsa_legal_name) : String(r.name ?? ''),
    dbaName: r.name ? String(r.name) : null,
    publicName: r.name ? String(r.name) : null,
    usdot: r.usdot_number ? String(r.usdot_number) : null,
    phone: r.phone ? String(r.phone) : null,
    email: r.email ? String(r.email) : null,
    address: r.physical_address ? String(r.physical_address) : r.headquarters ? String(r.headquarters) : null,
    city: null,
    state: 'FL',
    postalCode: null,
    publicationState: r.publication_state ? String(r.publication_state) : null,
    indexable: r.indexable === true,
  }));

  const gapSubjects: GapSubject[] = [];
  for (const rec of records) {
    const im = String(rec.authorityNumber ?? '').toUpperCase();
    if (!im.startsWith('IM')) continue;
    if (String(rec.status).toLowerCase() !== 'active') continue;
    const proposed = proposedImCompanyId(im);
    if (existingIds.has(proposed)) continue;
    if (wave1Ids.has(proposed) || keep80.has(proposed) || holds.has(proposed)) continue;
    gapSubjects.push({
      fdacsIm: im,
      legalName: rec.legalName,
      dba: rec.dba,
      status: String(rec.status),
      expiration: rec.expirationDate,
      retrievedAt: String(rec.raw._retrievedAt ?? '2026-08-21T17:11:52.759Z'),
      physicalAddress: rec.physicalAddress,
      city: rec.city,
      postalCode: rec.postalCode,
      phone: rec.phone,
      email: rec.email,
      usdot: rec.usdot,
      county: null,
    });
  }

  const classified = gapSubjects.map((s) => ({
    subject: s,
    result: classifyActiveImGap({
      subject: s,
      candidates,
      existingImCompanyIds,
      wave1Ids,
      keep80Ids: keep80,
      asOf: AS_OF,
    }),
  }));

  const rows = classified.map((c) => ({
    fdacsIm: c.subject.fdacsIm,
    legalName: c.subject.legalName,
    dba: c.subject.dba,
    county: c.subject.county,
    city: c.subject.city,
    zip: c.subject.postalCode,
    phone: Boolean(c.subject.phone),
    email: Boolean(c.subject.email),
    address: Boolean(c.subject.physicalAddress),
    ...c.result,
  }));

  const byClass = tally(rows);
  const buckets = (cls: GapClass) => rows.filter((r) => r.classification === cls);

  const ops = classified
    .map((c) => toDraftOp(c.result, c.subject))
    .filter((o): o is NonNullable<typeof o> => Boolean(o));
  const links = ops.filter((o) => o.op === 'LINK_EXISTING_CANONICAL');
  const inserts = ops.filter((o) => o.op === 'INSERT_NEW_CANONICAL');
  const hash = hashCanonicalizationDraft(ops);

  const phones = new Set(gapSubjects.map((s) => normalizePhone(s.phone)).filter(Boolean));
  const emails = new Set(gapSubjects.map((s) => normalizeEmail(s.email)).filter(Boolean));

  const newReady = buckets('NEW_CANONICAL_COMPANY_READY');
  const countyDist: Record<string, number> = {};
  for (const r of newReady) {
    const k = r.city || 'UNKNOWN';
    countyDist[k] = (countyDist[k] || 0) + 1;
  }

  const gap = {
    google_places_requests: 0,
    ruleset: FL_STATE_ACTIVE_IM_CANONICALIZATION_GAP_V1,
    historical_target: 281,
    current_target: gapSubjects.length,
    as_of: AS_OF,
    apply: false,
  };

  const contact = {
    google_places_requests: 0,
    n: gapSubjects.length,
    with_phone: gapSubjects.filter((s) => s.phone).length,
    with_email: gapSubjects.filter((s) => s.email).length,
    with_address: gapSubjects.filter((s) => s.physicalAddress).length,
    unique_phones: phones.size,
    unique_emails: emails.size,
    note: 'SOURCE OBSERVATIONS only — not canonical overwrites',
  };

  const impact = {
    google_places_requests: 0,
    discovered: {
      target_active_im: gapSubjects.length,
      existing_canonical_links: byClass.EXISTING_CANONICAL_LINK_READY ?? 0,
      new_canonical_company_ready: byClass.NEW_CANONICAL_COMPANY_READY ?? 0,
      unresolved:
        (byClass.REVIEW_REQUIRED ?? 0) +
        (byClass.POSSIBLE_DUPLICATE ?? 0) +
        (byClass.CORPORATE_FAMILY_REVIEW ?? 0) +
        (byClass.CONFLICT ?? 0) +
        (byClass.SOURCE_STATUS_BLOCKED ?? 0),
      emails_observed: contact.with_email,
      phones_observed: contact.with_phone,
      addresses_observed: contact.with_address,
      fdacs_authorities_represented: gapSubjects.length,
      federal_state_deterministic_links: links.filter((o) => o.evidenceMethod === 'exact_usdot').length,
      state_only_new_ready: newReady.filter((r) => !classified.find((c) => c.subject.fdacsIm === r.fdacsIm)?.subject.usdot)
        .length,
      rejected_or_held:
        (byClass.REVIEW_REQUIRED ?? 0) +
        (byClass.POSSIBLE_DUPLICATE ?? 0) +
        (byClass.CORPORATE_FAMILY_REVIEW ?? 0) +
        (byClass.CONFLICT ?? 0) +
        (byClass.SOURCE_STATUS_BLOCKED ?? 0),
    },
    canonicalized: 0,
    publicly_published: 0,
    production_writes: 0,
    public_publication_change: 0,
  };

  const draft = {
    google_places_requests: 0,
    waveId: FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1_DRAFT,
    apply: false as const,
    hash,
    link_count: links.length,
    insert_count: inserts.length,
    total: ops.length,
    intendedPublicationState: 'INGESTED',
    intendedIndexable: false,
    operations: ops,
  };

  const simulated = {
    google_places_requests: 0,
    apply: false,
    companies_inserted: inserts.length,
    psa_links: links.length,
    publication_state: 'INGESTED',
    indexable: false,
    public_routes: 'HTTP 404 after future internal ingest',
    sitemap: 0,
    directory: 0,
    compare: 0,
    county_discovery: 0,
  };

  writeFileSync(resolve(DOCS, 'task-fl-011c-current-active-gap.json'), JSON.stringify({ ...gap, ims: gapSubjects.map((s) => s.fdacsIm) }, null, 2) + '\n');
  writeFileSync(resolve(DOCS, 'task-fl-011c-existing-canonical-link-ready.json'), JSON.stringify({ google_places_requests: 0, n: buckets('EXISTING_CANONICAL_LINK_READY').length, rows: buckets('EXISTING_CANONICAL_LINK_READY') }, null, 2) + '\n');
  writeFileSync(resolve(DOCS, 'task-fl-011c-new-canonical-company-ready.json'), JSON.stringify({ google_places_requests: 0, n: newReady.length, rows: newReady }, null, 2) + '\n');
  writeFileSync(resolve(DOCS, 'task-fl-011c-corporate-family-review.json'), JSON.stringify({ google_places_requests: 0, n: buckets('CORPORATE_FAMILY_REVIEW').length, rows: buckets('CORPORATE_FAMILY_REVIEW') }, null, 2) + '\n');
  writeFileSync(resolve(DOCS, 'task-fl-011c-duplicate-review.json'), JSON.stringify({ google_places_requests: 0, n: buckets('POSSIBLE_DUPLICATE').length, rows: buckets('POSSIBLE_DUPLICATE') }, null, 2) + '\n');
  writeFileSync(resolve(DOCS, 'task-fl-011c-status-blocked.json'), JSON.stringify({ google_places_requests: 0, n: buckets('SOURCE_STATUS_BLOCKED').length, rows: buckets('SOURCE_STATUS_BLOCKED') }, null, 2) + '\n');
  writeFileSync(resolve(DOCS, 'task-fl-011c-contact-observation-summary.json'), JSON.stringify(contact, null, 2) + '\n');
  writeFileSync(
    resolve(DOCS, 'task-fl-011c-identity-collision-audit.json'),
    JSON.stringify(
      {
        google_places_requests: 0,
        name_only_auto_link: 0,
        conflict: buckets('CONFLICT').length,
        possible_duplicate: buckets('POSSIBLE_DUPLICATE').length,
        review_required: buckets('REVIEW_REQUIRED').length,
        rows: [...buckets('CONFLICT'), ...buckets('POSSIBLE_DUPLICATE')],
      },
      null,
      2
    ) + '\n'
  );
  writeFileSync(resolve(DATA, 'fl-011c-canonicalization-wave-internal-draft.json'), JSON.stringify(draft, null, 2) + '\n');
  writeFileSync(resolve(LEDGER, 'fl-011c-impact-delta.json'), JSON.stringify(impact, null, 2) + '\n');
  writeFileSync(
    resolve(DOCS, 'task-fl-011c-readiness-summary.json'),
    JSON.stringify(
      {
        google_places_requests: FL_011C_GOOGLE_PLACES_REQUESTS,
        production_db_writes: 0,
        apply: false,
        gap,
        classification: byClass,
        draft: { hash, link_count: links.length, insert_count: inserts.length, total: ops.length, apply: false },
        contact,
        simulated,
        new_ready_city_distribution: Object.fromEntries(
          Object.entries(countyDist).sort((a, b) => b[1] - a[1]).slice(0, 20)
        ),
      },
      null,
      2
    ) + '\n'
  );

  console.log(
    JSON.stringify(
      {
        google_places_requests: 0,
        current_target: gapSubjects.length,
        classification: byClass,
        link: links.length,
        insert: inserts.length,
        hash,
        apply: false,
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
