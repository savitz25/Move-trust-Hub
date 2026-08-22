/**
 * Build PBC_COUNTY_CREDENTIAL_WAVE_A_INTERNAL_V1 from live preflight + research package.
 */
import { createHash } from 'crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const OUT = resolve('data/county-regulatory/fl/palm-beach/production/pbc-prod-001');
mkdirSync(OUT, { recursive: true });

const preflight = JSON.parse(
  readFileSync(resolve(OUT, 'live-cohort-preflight.json'), 'utf8')
);
if (preflight.gate !== 'PASS' || preflight.still.length !== 46) {
  console.error('Preflight gate not PASS with 46 still-ready; refuse manifest.');
  process.exit(3);
}

const permits = JSON.parse(
  readFileSync(
    'data/county-regulatory/fl/palm-beach/normalized/mover-permits.json',
    'utf8'
  )
);
const permitByMv = new Map(
  (permits.records || []).map((r) => [
    r.business_regulatory_id || r.source_record_id || r.mv_permit,
    r,
  ])
);

const REGULATOR =
  'Palm Beach County Public Safety — Consumer Affairs Division';
const SOURCE_KEY = 'pbc-consumer-affairs-moving-business-permit';
const SOURCE_URL =
  'https://discover.pbc.gov/publicsafety/consumeraffairs/Pages/Lookup.aspx';
const COUNTY_FIPS = '12099';
const WAVE_ID = 'PBC_COUNTY_CREDENTIAL_WAVE_A_INTERNAL_V1';

const members = preflight.still
  .map((r) => {
    const p =
      permitByMv.get(r.mv_permit) ||
      permitByMv.get(String(r.mv_permit).toUpperCase()) ||
      {};
    return {
      company_id: r.company_id,
      slug: r.slug,
      fdacs_im: r.fdacs_im,
      palm_beach_mv: r.mv_permit,
      county: 'Palm Beach',
      county_fips: COUNTY_FIPS,
      state_code: 'FL',
      regulator: REGULATOR,
      source_key: SOURCE_KEY,
      source_url: SOURCE_URL,
      source_status: r.county_status || p.status || 'LICENSED',
      normalized_status: (r.county_status || p.status || 'LICENSED').toUpperCase(),
      credential_type: 'moving_business_permit',
      match_ruleset: 'PBC_FDACS_RECONCILIATION_V1',
      match_method: r.match_method,
      qa_state: 'VERIFIED',
      verification_state: 'VERIFIED',
      match_result: 'VERIFIED',
      source_retrieval_reference:
        p.source_url ||
        'data/county-regulatory/fl/palm-beach/normalized/mover-permits.json',
      retrieved_at: p.retrieved_at || preflight.retrieved_at,
      evidence_publication_state: 'INTERNAL_ONLY',
      intended_operation: 'UPSERT_INTERNAL_ONLY',
      issue_date: p.issue_date || p.issued_date || null,
      expiration_date: p.expiration_date || null,
      legal_name: p.legal_name || r.name || null,
      dba_name: p.dba_name || null,
      publication_state_at_manifest: r.publication_state,
      indexable_at_manifest: r.indexable,
    };
  })
  .sort((a, b) => a.palm_beach_mv.localeCompare(b.palm_beach_mv));

if (members.length !== 46) {
  console.error('Expected 46 members, got', members.length);
  process.exit(3);
}

const bodyForHash = {
  wave_id: WAVE_ID,
  count: members.length,
  members: members.map((m) => ({
    company_id: m.company_id,
    palm_beach_mv: m.palm_beach_mv,
    fdacs_im: m.fdacs_im,
    evidence_publication_state: m.evidence_publication_state,
    match_ruleset: m.match_ruleset,
  })),
};
const manifest_hash = createHash('sha256')
  .update(JSON.stringify(bodyForHash))
  .digest('hex');

const manifest = {
  wave_id: WAVE_ID,
  task: 'PBC-PROD-001',
  created_at: new Date().toISOString(),
  count: 46,
  manifest_hash,
  evidence_publication_state: 'INTERNAL_ONLY',
  publish: false,
  exclusions: {
    newly_linkable_after_c009: preflight.newly_linkable_after_c009,
    note: 'Frozen C009 cohort only; newly linkable excluded from Wave A',
  },
  source: {
    source_key: SOURCE_KEY,
    regulator: REGULATOR,
    jurisdiction: 'FL / Palm Beach County',
    county_fips: COUNTY_FIPS,
    source_url: SOURCE_URL,
    access_class: 'OFFICIAL_PUBLIC',
    pii_classification: 'BUSINESS_REGULATORY_ONLY',
  },
  program: {
    state_code: 'FL',
    county_name: 'Palm Beach',
    county_fips: COUNTY_FIPS,
    posture: 'CREDENTIAL_BASED',
    agency_name: REGULATOR,
    program_name: 'Moving Business Permit',
    credential_type: 'moving_business_permit',
  },
  members,
  google_places_api_requests: 0,
  consumer_pii_committed: 0,
};

writeFileSync(
  resolve(OUT, 'pbc-county-credential-wave-a-internal-v1.json'),
  JSON.stringify(manifest, null, 2) + '\n'
);
writeFileSync(
  resolve(OUT, 'schema-reuse-audit.json'),
  JSON.stringify(
    {
      task: 'PBC-PROD-001',
      concepts: [
        {
          concept: 'companies',
          decision: 'REUSE_EXISTING',
          notes: 'Fail-closed FK target for company_id',
        },
        {
          concept: 'provider_state_authority',
          decision: 'REUSE_EXISTING',
          notes: 'STATE HHG only — county MV must not overload PSA',
        },
        {
          concept: 'provider_contact_observation',
          decision: 'REUSE_EXISTING',
          notes: 'Not used in Wave A',
        },
        {
          concept: 'county_regulatory_program',
          decision: 'NEW_CONCEPT_REQUIRED',
          notes: 'Minimum program/source registry for Palm Beach',
        },
        {
          concept: 'provider_county_credential',
          decision: 'NEW_CONCEPT_REQUIRED',
          notes: 'Wave A INTERNAL_ONLY credentials',
        },
        {
          concept: 'complaints_enforcement',
          decision: 'DEFERRED',
          notes: 'Future waves only',
        },
      ],
    },
    null,
    2
  ) + '\n'
);

console.log(
  JSON.stringify(
    {
      ok: true,
      wave_id: WAVE_ID,
      count: 46,
      manifest_hash,
      exclusions_newly_linkable: preflight.newly_linkable_after_c009,
    },
    null,
    2
  )
);
