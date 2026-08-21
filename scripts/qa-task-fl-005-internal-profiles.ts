/**
 * FL-005 — read-only QA of the 37 FL-004 companies, Suddath holds, and universe.
 * Google Places requests: 0. Does not publish or mutate companies.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { loadEnvFiles, resolveDatabaseUrl } from '../lib/state-hhg/calibration/db';
import { LOCAL_CANARY_WAVE_ID } from '../lib/state-hhg/canary/types';
import { loadExactCanaryManifests } from '../lib/state-hhg/canary/manifest';
import {
  isAnonymousPublicProfileAllowed,
  isConsumerVisibleCompany,
  isSeoIndexableCompany,
} from '../lib/provider/publication';
import { isUnsafeFederalAbsenceClaim } from '../lib/state-hhg/fl/profile-presentation';
import { normalizeEmail, normalizeLegalName, normalizePhone } from '../lib/state-hhg/normalize';
import type { Fl004ManifestRow } from '../lib/state-hhg/fl/fl-004';

const GOOGLE = 0 as const;

type Score = 'PASS' | 'REVIEW_REQUIRED' | 'FAIL';

async function main() {
  loadEnvFiles();
  const manifest = JSON.parse(
    readFileSync(resolve(process.cwd(), 'data/state-hhg/fl/fl-004-canonicalization-manifest.json'), 'utf8')
  ) as { hash: string; rows: Fl004ManifestRow[] };
  const insertRows = manifest.rows.filter((r) => r.action === 'INSERT');
  const holdRows = manifest.rows.filter((r) => r.action === 'HOLD');
  const ids = insertRows.map((r) => r.intended_company_id);

  const client = new pg.Client({
    connectionString: resolveDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 20000,
  });
  await client.connect();

  const freeze = await client.query(`
    SELECT count(*)::int AS companies,
           count(*) FILTER (WHERE indexable)::int AS indexable,
           count(*) FILTER (WHERE id ILIKE 'fl-im-%')::int AS fl_im_all,
           count(*) FILTER (WHERE id ILIKE 'fl-im-%' AND publication_state='INGESTED')::int AS fl_im_ingested,
           count(*) FILTER (WHERE id ILIKE 'fl-im-%' AND publication_state='PUBLISHABLE')::int AS fl_im_publishable
      FROM companies`);
  const canary = await client.query(
    `SELECT state_code, count(*)::int AS n FROM local_hhg_canary_publication
      WHERE wave_id=$1 AND status='published' GROUP BY 1`,
    [LOCAL_CANARY_WAVE_ID]
  );
  const canaryBy: Record<string, number> = {};
  for (const row of canary.rows) canaryBy[String(row.state_code)] = Number(row.n);

  const companies = await client.query(
    `SELECT id, slug, name, fmcsa_legal_name, phone, email, physical_address, headquarters,
            usdot_number, publication_state, indexable, service_scope
       FROM companies WHERE id = ANY($1::text[])`,
    [ids]
  );
  const byId = new Map(companies.rows.map((r: { id: string }) => [r.id, r]));
  const psa = await client.query(
    `SELECT company_id, authority_number, status, verification_state, regulator, source, authority_type
       FROM provider_state_authority
      WHERE state_code='FL' AND company_id = ANY($1::text[])`,
    [ids]
  );
  const psaByCompany = new Map<string, typeof psa.rows>();
  for (const row of psa.rows) {
    const cid = String(row.company_id);
    psaByCompany.set(cid, [...(psaByCompany.get(cid) ?? []), row]);
  }
  const obs = await client.query(
    `SELECT company_id, regulatory_id, observation_type, count(*)::int AS n
       FROM provider_contact_observation
      WHERE company_id = ANY($1::text[])
      GROUP BY 1,2,3`,
    [ids]
  );

  const scorecard = [];
  let pass = 0;
  let review = 0;
  let fail = 0;
  for (const row of insertRows) {
    const issues: string[] = [];
    const c = byId.get(row.intended_company_id) as
      | {
          id: string;
          slug: string;
          name: string;
          fmcsa_legal_name: string | null;
          publication_state: string;
          indexable: boolean;
          usdot_number: string | null;
          physical_address: string | null;
          service_scope: string | null;
        }
      | undefined;
    if (!c) issues.push('company_missing');
    if (c && c.publication_state !== 'INGESTED') issues.push(`publication_state_${c.publication_state}`);
    if (c && c.indexable !== false) issues.push('indexable_true');
    if (c && isAnonymousPublicProfileAllowed({ publicationState: c.publication_state as 'INGESTED' })) {
      issues.push('anonymous_profile_would_render');
    }
    if (c && isConsumerVisibleCompany({ publicationState: c.publication_state as 'INGESTED' })) {
      issues.push('consumer_visible');
    }
    if (c && isSeoIndexableCompany({ publicationState: c.publication_state as 'INGESTED', indexable: c.indexable })) {
      issues.push('seo_indexable');
    }
    const auths = psaByCompany.get(row.intended_company_id) ?? [];
    if (!auths.some((a: { authority_number: string; status: string }) => String(a.authority_number).toUpperCase() === row.fdacs_im_number && a.status === 'active')) {
      issues.push('psa_im_missing_or_inactive');
    }
    if (!row.county_fips || row.county_verification !== 'COUNTY_VERIFIED') issues.push('county_not_verified');
    if (!row.physical_address || !row.city || !row.zip) issues.push('incomplete_geography');
    const obsFor = obs.rows.filter((o: { company_id: string }) => o.company_id === row.intended_company_id);
    const types = new Set(obsFor.map((o: { observation_type: string }) => o.observation_type));
    if (!types.has('physical_address')) issues.push('address_observation_missing');
    if (!types.has('business_phone') && row.phone) issues.push('phone_observation_missing');
    if (obsFor.some((o: { n: number }) => Number(o.n) > 1)) issues.push('duplicate_observation_type');
    if (c?.usdot_number) issues.push('unexpected_usdot_on_state_only_row');
    const descBits = `${c?.name ?? ''} ${row.legal_name}`;
    if (isUnsafeFederalAbsenceClaim(descBits)) issues.push('unsafe_federal_claim');

    let score: Score = 'PASS';
    if (issues.some((i) => i.startsWith('publication_') || i === 'indexable_true' || i === 'company_missing' || i === 'anonymous_profile_would_render')) {
      score = 'FAIL';
    } else if (issues.length) {
      score = 'REVIEW_REQUIRED';
    }
    if (score === 'PASS') pass += 1;
    else if (score === 'FAIL') fail += 1;
    else review += 1;
    scorecard.push({
      company_id: row.intended_company_id,
      slug: c?.slug ?? row.intended_slug,
      regulatory_id: row.regulatory_id,
      legal_name: row.legal_name,
      county: row.county,
      score,
      issues,
      publication_state: c?.publication_state ?? null,
      indexable: c?.indexable ?? null,
      anonymous_profile_allowed: c
        ? isAnonymousPublicProfileAllowed({ publicationState: c.publication_state as 'INGESTED' })
        : null,
    });
  }

  const suddathIds = ['FL-FDACS-IM-3813', 'FL-FDACS-IM-4099'];
  const suddathStaging = await client.query(
    `SELECT regulatory_id, authority_number, legal_name_raw, dba_raw, email_norm, phone_norm,
            physical_address_raw, city_norm, postal_code_norm, status_normalized, disposition
       FROM state_hhg_registry_staging
      WHERE state_code='FL' AND (regulatory_id = ANY($1::text[]) OR authority_number IN ('IM3813','IM4099'))`,
    [suddathIds]
  );
  const waCompany = await client.query(
    `SELECT id, slug, name, fmcsa_legal_name, phone, email, physical_address, headquarters,
            usdot_number, publication_state, indexable
       FROM companies WHERE id='wa-hg-064493'`
  );
  const waAuth = await client.query(
    `SELECT authority_number, status, legal_name, dba_name, verification_state
       FROM provider_state_authority WHERE company_id='wa-hg-064493'`
  );

  const flEmails = insertRows.map((r) => normalizeEmail(r.email)).filter(Boolean) as string[];
  const flPhones = insertRows.map((r) => normalizePhone(r.phone)).filter(Boolean) as string[];
  const cross = await client.query(
    `SELECT id, name, fmcsa_legal_name, phone, email, headquarters, publication_state
       FROM companies
      WHERE id NOT LIKE 'fl-im-%'
        AND (
          (email IS NOT NULL AND lower(email) = ANY($1::text[]))
          OR (phone IS NOT NULL AND regexp_replace(phone, '\\D', '', 'g') = ANY($2::text[]))
        )`,
    [flEmails, flPhones]
  );
  const multiState = [];
  for (const other of cross.rows) {
    const oEmail = normalizeEmail(other.email);
    const oPhone = normalizePhone(other.phone);
    const oName = normalizeLegalName(other.fmcsa_legal_name || other.name);
    const hits = insertRows.filter((r) => {
      const emailHit = oEmail && normalizeEmail(r.email) === oEmail;
      const phoneHit = oPhone && normalizePhone(r.phone) === oPhone;
      const nameHit = oName && normalizeLegalName(r.legal_name) === oName;
      return (emailHit && nameHit) || (phoneHit && nameHit);
    });
    for (const hit of hits) {
      multiState.push({
        fl_regulatory_id: hit.regulatory_id,
        fl_company_id: hit.intended_company_id,
        other_company_id: other.id,
        other_name: other.name,
        evidence:
          oEmail && normalizeEmail(hit.email) === oEmail
            ? 'exact_legal_name_and_email'
            : 'exact_legal_name_and_phone',
        classification: 'MULTI_STATE_ENTITY_CANDIDATE',
      });
    }
  }

  const eligibility = JSON.parse(
    readFileSync(resolve(process.cwd(), 'data/state-hhg/fl/publication-eligibility-v1.json'), 'utf8')
  ) as { rows: Array<{ publication_status: string; registration_type: string; registration_status: string }> };
  const reviewCohort = eligibility.rows.filter((r) => r.publication_status === 'REVIEW_REQUIRED').length;
  const activeIm = eligibility.rows.filter((r) => r.registration_type === 'IM' && r.registration_status === 'active').length;
  const activeMb = eligibility.rows.filter((r) => r.registration_type === 'MB' && r.registration_status === 'active').length;

  const psaLinked = await client.query(
    `SELECT count(*)::int AS n FROM provider_state_authority
      WHERE state_code='FL' AND COALESCE(company_id, matched_company_id) IS NOT NULL`
  );
  const flIndexable = await client.query(
    `SELECT count(*)::int AS n FROM companies
      WHERE indexable
        AND (id ILIKE 'fl-im-%' OR headquarters ~* ',\\s*FL\\b' OR physical_address ~* '\\bFL\\s+\\d{5}\\b')`
  );
  const flAll = await client.query(
    `SELECT count(*)::int AS n FROM companies
      WHERE id ILIKE 'fl-im-%' OR headquarters ~* ',\\s*FL\\b' OR physical_address ~* '\\bFL\\s+\\d{5}\\b'`
  );

  await client.end();

  const canaryMan = loadExactCanaryManifests();
  const audit = {
    google_places_requests: GOOGLE,
    freeze: freeze.rows[0],
    canary: {
      fl: canaryBy.FL ?? 0,
      wa: canaryBy.WA ?? 0,
      total: (canaryBy.FL ?? 0) + (canaryBy.WA ?? 0),
      manifest: { fl: canaryMan.FL.length, wa: canaryMan.WA.length },
      keep_80_noindex: (canaryBy.FL ?? 0) === 50 && (canaryBy.WA ?? 0) === 30,
    },
    scorecard_summary: { pass, review_required: review, fail, total: insertRows.length },
    scorecard,
    suddath: {
      held_regulatory_ids: suddathIds,
      fl_staging: suddathStaging.rows,
      wa_company: waCompany.rows[0] ?? null,
      wa_authorities: waAuth.rows,
      determination: {
        'FL-FDACS-IM-3813': {
          candidate: 'wa-hg-064493',
          classification: 'UNRESOLVED',
          reason:
            'Florida legal entity SUDDATH MOVING & STORAGE, LLC at Tampa vs WA canonical wa-hg-064493. Shared legal@suddath.com is brand/enterprise email, not unique branch identity. Fail closed: keep held. Distinct Florida entity likely, but not auto-created in FL-005.',
          action: 'HOLD',
        },
        'FL-FDACS-IM-4099': {
          candidate: 'wa-hg-064493',
          classification: 'UNRESOLVED',
          reason:
            'Florida legal entity SUDDATH RELOCATION SYSTEMS OF ST. PETERSBURG, INC. is a different corporate name than the WA company. Same enterprise brand, legally distinct registrant. Do not attach to wa-hg-064493. Keep held pending a dedicated multi-entity model.',
          action: 'HOLD',
        },
      },
    },
    cross_state: {
      multi_state_entity_candidates: multiState,
      note: 'Exact legal-name + email/phone only. No fuzzy merge. Suddath holds are the known brand-email collision.',
    },
    universe: {
      companies: freeze.rows[0].companies,
      indexable: freeze.rows[0].indexable,
      florida_all: flAll.rows[0].n,
      florida_indexable: flIndexable.rows[0].n,
      fl_im_all: freeze.rows[0].fl_im_all,
      fl_im_ingested: freeze.rows[0].fl_im_ingested,
      fl_im_publishable: freeze.rows[0].fl_im_publishable,
      fdacs_linked: psaLinked.rows[0].n,
      active_fdacs_im: activeIm,
      active_fdacs_mb: activeMb,
      fl003_review_required: reviewCohort,
      fl004_new_ingested: insertRows.length,
      suddath_held: 2,
    },
  };

  mkdirSync(resolve(process.cwd(), 'docs'), { recursive: true });
  writeFileSync(resolve(process.cwd(), 'docs/task-fl-005-scorecard.json'), JSON.stringify(audit, null, 2) + '\n');
  writeFileSync(
    resolve(process.cwd(), 'docs/task-fl-005-suddath-investigation.json'),
    JSON.stringify({ google_places_requests: 0, ...audit.suddath }, null, 2) + '\n'
  );
  writeFileSync(
    resolve(process.cwd(), 'docs/task-fl-005-cross-state-collision.json'),
    JSON.stringify({ google_places_requests: 0, ...audit.cross_state }, null, 2) + '\n'
  );
  console.log(
    JSON.stringify(
      {
        google_places_requests: 0,
        scorecard: audit.scorecard_summary,
        canary: audit.canary,
        universe: audit.universe,
        cross_state: multiState.length,
      },
      null,
      2
    )
  );
}

main().catch((e) => {
  console.error(String(e instanceof Error ? e.message : e).replace(/postgresql:\/\/[^@]+@/, 'postgresql://***@'));
  process.exit(1);
});
