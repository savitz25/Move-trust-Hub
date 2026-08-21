/**
 * FL-008 — read-only Florida state publication-readiness QA.
 * Does not mutate companies, PSA, contacts, Trust Score, or canary.
 * Google Places requests: 0.
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
import type { Fl004ManifestRow } from '../lib/state-hhg/fl/fl-004';
import {
  FL_008_GOOGLE_PLACES_REQUESTS,
  FL_008_POST_FL004_ADDITIONS,
  FL_STATE_PUBLICATION_READINESS_V1,
  FL_STATE_WAVE_1,
  buildFl008Cohort,
  evaluatePresentationLayout,
  hashFl008Manifest,
  qualifyFloridaPublicationReadiness,
  simulatePublishableNoindexSurface,
  simulateStateOnlyStructuredData,
  type ReadinessInput,
  type ReadinessState,
} from '../lib/state-hhg/fl/publication-readiness';
import {
  FL_FDACS_ADDRESS_SOURCE_LABEL,
  FL_FDACS_EMAIL_SOURCE_LABEL,
  FL_FDACS_PHONE_SOURCE_LABEL,
  FL_FDACS_SCOPE_EXPLANATION,
  FL_NO_FEDERAL_ID_IN_MTH_DATA,
  FL_STATE_ONLY_REGISTRATION_COPY,
  floridaFdacsEvidenceBlock,
  floridaFederalPlusStatePresentation,
} from '../lib/state-hhg/fl/profile-presentation';
import { SHARE_HUB } from '../lib/seo/share-hub';

const AS_OF = '2026-08-21';
const ORIGIN = SHARE_HUB.origin;

type EligRow = {
  regulatory_id: string;
  expiration: string | null;
  registration_status: string;
  source_provenance?: string | null;
};

async function freeze(client: pg.Client) {
  const c = await client.query(`
    SELECT count(*)::int AS companies,
           count(*) FILTER (WHERE indexable)::int AS indexable,
           count(*) FILTER (WHERE id ILIKE 'fl-im-%')::int AS fl_im,
           count(*) FILTER (WHERE id ILIKE 'wa-hg-%')::int AS wa_hg,
           count(*) FILTER (WHERE publication_state='INGESTED')::int AS ingested,
           count(*) FILTER (WHERE publication_state='PUBLISHABLE')::int AS publishable
      FROM companies`);
  const psa = await client.query(`
    SELECT count(*) FILTER (WHERE state_code='FL')::int AS fl_psa,
           count(*) FILTER (WHERE state_code='WA')::int AS wa_psa,
           count(*) FILTER (WHERE company_id IS NOT NULL)::int AS psa_attached
      FROM provider_state_authority`);
  const canary = await client.query(
    `SELECT state_code, count(*)::int AS n FROM local_hhg_canary_publication
      WHERE wave_id=$1 AND status='published' GROUP BY 1`,
    [LOCAL_CANARY_WAVE_ID]
  );
  const canaryBy: Record<string, number> = {};
  for (const row of canary.rows) canaryBy[String(row.state_code)] = Number(row.n);
  return {
    ...c.rows[0],
    ...psa.rows[0],
    canary_fl: canaryBy.FL ?? 0,
    canary_wa: canaryBy.WA ?? 0,
    canary_total: (canaryBy.FL ?? 0) + (canaryBy.WA ?? 0),
  };
}

async function probe(path: string): Promise<{
  status: number;
  noindex: boolean;
  notFoundShell: boolean;
  title: string;
  bodySnippet: string;
}> {
  const res = await fetch(`${ORIGIN}${path}`, {
    redirect: 'manual',
    headers: { 'user-agent': 'MoveTrustHub-FL008-readiness/1.0' },
  });
  const text = await res.text();
  const title = (text.match(/<title>([^<]+)/i) ?? ['', ''])[1];
  return {
    status: res.status,
    noindex: /noindex/i.test(text) || /robots:\s*noindex/i.test(res.headers.get('x-robots-tag') ?? ''),
    notFoundShell: /company not found|page not found/i.test(title) || /page not found/i.test(text.slice(0, 4000)),
    title,
    bodySnippet: text.slice(0, 240).replace(/\s+/g, ' '),
  };
}

async function main() {
  loadEnvFiles();
  const fl004 = JSON.parse(
    readFileSync(resolve(process.cwd(), 'data/state-hhg/fl/fl-004-canonicalization-manifest.json'), 'utf8')
  ) as { hash: string; rows: Fl004ManifestRow[]; retrieved_at?: string };
  const eligibility = JSON.parse(
    readFileSync(resolve(process.cwd(), 'data/state-hhg/fl/publication-eligibility-v1.json'), 'utf8')
  ) as { rows: EligRow[] };
  const seeds = buildFl008Cohort(fl004.rows, FL_008_POST_FL004_ADDITIONS);
  const manifestByCompany = new Map(fl004.rows.map((r) => [r.intended_company_id, r]));
  const eligByReg = new Map(eligibility.rows.map((r) => [r.regulatory_id, r]));
  const ids = seeds.map((s) => s.companyId);
  const regs = seeds.map((s) => s.regulatoryId);

  const client = new pg.Client({
    connectionString: resolveDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 20000,
  });
  await client.connect();
  const freezeBefore = await freeze(client);

  const companies = await client.query(
    `SELECT id, slug, name, fmcsa_legal_name, phone, email, physical_address, headquarters,
            usdot_number, mc_number, publication_state, indexable, service_scope
       FROM companies WHERE id = ANY($1::text[])`,
    [ids]
  );
  const byId = new Map(companies.rows.map((r: { id: string }) => [r.id, r]));
  const psa = await client.query(
    `SELECT company_id, authority_number, status, verification_state, regulator, source,
            authority_type, retrieved_at
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
    `SELECT company_id, regulatory_id, observation_type, retrieved_at
       FROM provider_contact_observation
      WHERE company_id = ANY($1::text[])`,
    [ids]
  );
  const canaryMan = loadExactCanaryManifests();
  const canaryLive = await client.query(
    `SELECT id, slug, publication_state, indexable FROM companies WHERE id = ANY($1::text[])`,
    [canaryMan.companyIds]
  );

  const scorecard: Array<Record<string, unknown>> = [];
  const counts: Record<ReadinessState, number> = {
    READY_FOR_PUBLISHABLE_CANARY: 0,
    HOLD_PROFILE_THIN: 0,
    REVIEW_REQUIRED: 0,
    NOT_ELIGIBLE: 0,
    DEFERRED: 0,
  };
  const byCounty = new Map<string, { ready: number; other: number }>();
  let refreshRequired = 0;

  for (const seed of seeds) {
    const row = manifestByCompany.get(seed.companyId);
    const c = byId.get(seed.companyId) as
      | {
          id: string;
          slug: string;
          name: string;
          publication_state: string;
          indexable: boolean;
          usdot_number: string | null;
          mc_number: string | null;
          phone: string | null;
          email: string | null;
          physical_address: string | null;
        }
      | undefined;
    const auths = psaByCompany.get(seed.companyId) ?? [];
    const im = auths.find((a: { authority_number: string }) =>
      String(a.authority_number).toUpperCase().startsWith('IM')
    );
    const obsFor = obs.rows.filter((o: { company_id: string }) => o.company_id === seed.companyId);
    const types = new Set(obsFor.map((o: { observation_type: string }) => o.observation_type));
    const elig = eligByReg.get(seed.regulatoryId) ?? eligByReg.get(row?.regulatory_id ?? '');
    const retrieved =
      (obsFor[0] as { retrieved_at?: string } | undefined)?.retrieved_at ||
      (im as { retrieved_at?: string } | undefined)?.retrieved_at ||
      fl004.retrieved_at ||
      null;

    const input: ReadinessInput = {
      companyId: seed.companyId,
      slug: c?.slug ?? row?.intended_slug ?? null,
      displayName: c?.name ?? row?.dba ?? row?.legal_name ?? '',
      legalName: row?.legal_name ?? c?.name ?? '',
      publicationState: c?.publication_state ?? 'MISSING',
      indexable: c?.indexable === true,
      fdacsRegulatoryId: seed.regulatoryId,
      fdacsAuthorityNumber: row?.fdacs_im_number ?? String(im?.authority_number ?? ''),
      authorityType: String(im?.authority_type ?? 'intrastate_mover_registration'),
      authorityStatus: String(im?.status ?? row?.registration_status ?? 'unknown'),
      regulator: String(im?.regulator ?? 'FDACS'),
      sourceProvenance: row?.source_provenance ?? 'fdacs_legacy_xls',
      retrievedAt: retrieved ? String(retrieved) : null,
      expiration: elig?.expiration ?? null,
      physicalStreet: row?.physical_address ?? c?.physical_address ?? null,
      city: row?.city ?? null,
      state: 'FL',
      zip: row?.zip ?? null,
      county: row?.county ?? null,
      countyFips: row?.county_fips ?? null,
      countyVerification: row?.county_verification ?? null,
      phoneObservation: types.has('business_phone') || Boolean(row?.phone),
      emailObservation: types.has('business_email') || Boolean(row?.email),
      addressObservation: types.has('physical_address') || Boolean(row?.physical_address),
      canonicalPhone: c?.phone ?? null,
      canonicalEmail: c?.email ?? null,
      usdot: c?.usdot_number ?? null,
      mcNumber: c?.mc_number ?? null,
      unresolvedDuplicate: false,
      unresolvedMultiStateCollision: false,
      brandOnlyIdentity: false,
      corporateFamilyDeferral: seed.companyId === 'fl-im-4099',
      currentlyInCanary: canaryMan.companyIds.includes(seed.companyId),
      cohortOrigin: seed.cohortOrigin,
      asOf: AS_OF,
    };
    const result = qualifyFloridaPublicationReadiness(input);
    counts[result.state] += 1;
    if (result.statusFreshness === 'STATUS_REFRESH_REQUIRED') refreshRequired += 1;
    const countyKey = input.county || '_none';
    const bucket = byCounty.get(countyKey) ?? { ready: 0, other: 0 };
    if (result.state === 'READY_FOR_PUBLISHABLE_CANARY') bucket.ready += 1;
    else bucket.other += 1;
    byCounty.set(countyKey, bucket);

    const ingestedGate = {
      anonymous_profile_allowed: c
        ? isAnonymousPublicProfileAllowed({ publicationState: c.publication_state as 'INGESTED' })
        : null,
      consumer_visible: c
        ? isConsumerVisibleCompany({ publicationState: c.publication_state as 'INGESTED' })
        : null,
      seo_indexable: c
        ? isSeoIndexableCompany({
            publicationState: c.publication_state as 'INGESTED',
            indexable: c.indexable,
          })
        : null,
    };

    scorecard.push({
      company_id: seed.companyId,
      slug: input.slug,
      fdacs_id: seed.regulatoryId,
      fdacs_im: input.fdacsAuthorityNumber,
      county: input.county,
      county_fips: input.countyFips,
      readiness_state: result.state,
      readiness_reasons: result.reasons,
      missing_requirements: result.missingRequirements,
      contact_coverage: {
        phone_observation: input.phoneObservation,
        email_observation: input.emailObservation,
        address_observation: input.addressObservation,
        website_required: false,
      },
      freshness: result.statusFreshness,
      expiration: input.expiration,
      federal_identity: result.federalIdLabel,
      publication_state: c?.publication_state ?? null,
      indexable: c?.indexable ?? null,
      ingested_gate: ingestedGate,
      cohort_origin: seed.cohortOrigin,
      recommended_future_action:
        result.state === 'READY_FOR_PUBLISHABLE_CANARY'
          ? 'INCLUDE_IN_FL_STATE_WAVE_1'
          : result.state === 'DEFERRED'
            ? 'HOLD_FOR_LATER_WAVE'
            : 'DO_NOT_PUBLISH',
      google_places_requests: 0,
    });
  }

  const freezeAfter = await freeze(client);
  await client.end();

  const readyIds = scorecard
    .filter((r) => r.readiness_state === 'READY_FOR_PUBLISHABLE_CANARY')
    .map((r) => String(r.company_id));

  const samples = scorecard
    .filter((r) => r.readiness_state === 'READY_FOR_PUBLISHABLE_CANARY')
    .slice(0, 8)
    .map((r) => {
      const row = manifestByCompany.get(String(r.company_id));
      return evaluatePresentationLayout({
        displayName: String(row?.dba || row?.legal_name || r.company_id),
        hasEmail: Boolean(row?.email),
        hasPhone: Boolean(row?.phone),
        address: `${row?.physical_address ?? ''}, ${row?.city ?? ''}, FL ${row?.zip ?? ''}`,
        fdacsNumber: String(r.fdacs_im),
        usdot: null,
        statusLabel: 'Registered / Active',
        viewport: 'mobile',
      });
    });

  const liveRoutes: Array<Record<string, unknown>> = [];
  for (const row of scorecard) {
    const slug = String(row.slug ?? '');
    if (!slug) continue;
    try {
      const profile = await probe(`/companies/${slug}`);
      const og = await probe(`/companies/${slug}/share-og`);
      const compare = await probe(`/api/compare/companies?slugs=${encodeURIComponent(slug)}`);
      liveRoutes.push({
        slug,
        profile_status: profile.status,
        profile_not_found_shell: profile.notFoundShell,
        profile_title: profile.title,
        profile_noindex: profile.noindex,
        profile_leaks_company_id: new RegExp(String(row.company_id), 'i').test(profile.bodySnippet),
        og_status: og.status,
        compare_status: compare.status,
        compare_includes_company: compare.bodySnippet.includes(String(row.company_id)),
      });
    } catch (err) {
      liveRoutes.push({ slug, error: String(err) });
    }
  }

  const flCanary = canaryMan.FL[0];
  let canaryProbe: Record<string, unknown> | null = null;
  if (flCanary?.slug) {
    try {
      const profile = await probe(`/companies/${flCanary.slug}`);
      canaryProbe = { slug: flCanary.slug, status: profile.status, noindex: profile.noindex };
    } catch (err) {
      canaryProbe = { slug: flCanary.slug, error: String(err) };
    }
  }

  const canaryPhone = canaryMan.FL.filter((p) => p.phone).length;
  const canaryEmail = canaryMan.FL.filter((p) => p.email).length;
  const canaryWeb = canaryMan.FL.filter((p) => p.website).length;
  const cohortPhone = scorecard.filter((r) => (r.contact_coverage as { phone_observation: boolean }).phone_observation).length;
  const cohortEmail = scorecard.filter((r) => (r.contact_coverage as { email_observation: boolean }).email_observation).length;

  const sim = simulatePublishableNoindexSurface({ publicationState: 'PUBLISHABLE', indexable: false });
  const sd = simulateStateOnlyStructuredData({
    name: 'Gentletouch Moving Company',
    slug: 'gentletouch-moving-company',
    street: '1900 FLORA RD',
    city: 'CLEARWATER',
    state: 'FL',
    zip: '33755',
    phone: '7274460712',
    usdot: null,
    reviewCount: 0,
    avgRating: 0,
    fdacsNumber: 'IM1025',
    serviceAreaClaimed: false,
  });

  const hash = hashFl008Manifest(seeds);
  const freezeUnchanged =
    JSON.stringify(freezeBefore) === JSON.stringify(freezeAfter) &&
    freezeBefore.canary_total === 80 &&
    freezeBefore.indexable === freezeAfter.indexable;

  const manifest = {
    google_places_requests: FL_008_GOOGLE_PLACES_REQUESTS,
    ruleset: FL_STATE_PUBLICATION_READINESS_V1,
    as_of: AS_OF,
    hash,
    fl004_inserts: seeds.filter((s) => s.cohortOrigin === 'FL-004').length,
    post_fl004_additions: seeds.filter((s) => s.cohortOrigin !== 'FL-004').map((s) => s.companyId),
    exclusions: {
      older_ingested_fl_im_not_in_allowlist: true,
      fl007_held_overlaps: ['fl-im-350', 'fl-im-210', 'fl-im-3819'],
    },
    candidates: scorecard,
  };

  const docs = resolve(process.cwd(), 'docs');
  mkdirSync(docs, { recursive: true });
  mkdirSync(resolve(process.cwd(), 'data/state-hhg/fl'), { recursive: true });
  writeFileSync(
    resolve(process.cwd(), 'data/state-hhg/fl/fl-008-publication-readiness-manifest.json'),
    JSON.stringify(manifest, null, 2) + '\n'
  );
  writeFileSync(
    resolve(process.cwd(), 'docs/task-fl-008-scorecard.json'),
    JSON.stringify(
      {
        google_places_requests: 0,
        freeze_before: freezeBefore,
        freeze_after: freezeAfter,
        freeze_unchanged: freezeUnchanged,
        counts,
        refresh_required: refreshRequired,
        by_county: Object.fromEntries([...byCounty.entries()].sort()),
        scorecard,
        ingested_anonymous_allowed: scorecard.filter((r) => (r.ingested_gate as { anonymous_profile_allowed: boolean }).anonymous_profile_allowed).length,
      },
      null,
      2
    ) + '\n'
  );
  writeFileSync(
    resolve(process.cwd(), 'docs/task-fl-008-simulated-publishable-qa.json'),
    JSON.stringify(
      {
        google_places_requests: 0,
        simulation_only: true,
        db_mutated: false,
        publishable_surface: sim,
        structured_data: sd,
        live_ingested_routes: liveRoutes,
        canary_probe: canaryProbe,
        canary_live_rows: canaryLive.rows.map((r: { id: string; publication_state: string; indexable: boolean }) => ({
          id: r.id,
          publication_state: r.publication_state,
          indexable: r.indexable,
          seo: isSeoIndexableCompany({ publicationState: r.publication_state, indexable: r.indexable }),
        })),
        presentation_samples: samples,
      },
      null,
      2
    ) + '\n'
  );
  writeFileSync(
    resolve(process.cwd(), 'docs/task-fl-008-wave-recommendation.json'),
    JSON.stringify(
      {
        google_places_requests: 0,
        apply: false,
        wave_id: FL_STATE_WAVE_1.id,
        publication_state: FL_STATE_WAVE_1.publicationState,
        indexable: FL_STATE_WAVE_1.indexable,
        robots: FL_STATE_WAVE_1.robots,
        sitemap_excluded: FL_STATE_WAVE_1.sitemapExcluded,
        recommended_company_ids: readyIds,
        size: readyIds.length,
        observation_days: 14,
        rollback: 'Revert publication_state to INGESTED for wave IDs only; do not touch canary.',
        indexable_decision: 'SEPARATE_FUTURE_TASK',
      },
      null,
      2
    ) + '\n'
  );
  writeFileSync(
    resolve(process.cwd(), 'docs/task-fl-008-florida-state-completeness.json'),
    JSON.stringify(
      {
        google_places_requests: 0,
        checkpoint: 'INITIAL FLORIDA STATE IDENTITY LAYER COMPLETE',
        acquired: [
          'FDACS IM/MB snapshots',
          'state identity reconciliation (FL-003/FL-004)',
          'state-only canonicalization of the qualified FL-004 cohort',
          'multi-state identity safety (FL-006/FL-007)',
          'FDACS contact observations',
          'COUNTY_VERIFIED geography',
          'publication lifecycle INGESTED → PUBLISHABLE → INDEXABLE',
          'profile semantics / FL_STATE_PUBLICATION_READINESS_V1',
        ],
        deferred_later_enrichment: [
          'complaints/dispositions',
          'enforcement/final orders',
          'broker relationships',
          'owners/officers bulk',
          'insurance/bond history',
          'historical applications',
        ],
        pra_submitted: false,
        publication_wave_applied: false,
      },
      null,
      2
    ) + '\n'
  );
  writeFileSync(
    resolve(process.cwd(), 'docs/task-fl-008-evidence-presentation.json'),
    JSON.stringify(
      {
        google_places_requests: 0,
        live: false,
        state_only_copy: FL_STATE_ONLY_REGISTRATION_COPY,
        scope: FL_FDACS_SCOPE_EXPLANATION,
        no_federal_id: FL_NO_FEDERAL_ID_IN_MTH_DATA,
        fdacs_block: floridaFdacsEvidenceBlock({ authorityNumber: 'IM1025', status: 'active', retrievedAt: fl004.retrieved_at }),
        federal_plus_state: floridaFederalPlusStatePresentation({
          fdacsNumber: 'IM4099',
          fdacsStatus: 'active',
          usdot: '1018395',
          mcNumber: '425403',
        }),
        contact_labels: {
          phone: FL_FDACS_PHONE_SOURCE_LABEL,
          email: FL_FDACS_EMAIL_SOURCE_LABEL,
          address: FL_FDACS_ADDRESS_SOURCE_LABEL,
        },
      },
      null,
      2
    ) + '\n'
  );

  const comparison = {
    canary_fl: 50,
    canary_phone: canaryPhone,
    canary_email: canaryEmail,
    canary_website: canaryWeb,
    cohort: scorecard.length,
    cohort_phone: cohortPhone,
    cohort_email: cohortEmail,
    verdict:
      cohortPhone / scorecard.length >= 0.8
        ? 'roughly_equivalent_to_fl_canary_thinness'
        : 'thinner_than_fl_canary',
  };

  console.log(
    JSON.stringify(
      {
        google_places_requests: 0,
        hash,
        cohort: seeds.length,
        counts,
        refresh_required: refreshRequired,
        freeze_unchanged: freezeUnchanged,
        freeze: freezeAfter,
        comparison,
        wave_size: readyIds.length,
        live_http_404s: liveRoutes.filter((r) => r.profile_status === 404).length,
        live_not_found_shells: liveRoutes.filter((r) => r.profile_not_found_shell).length,
        live_compare_leaks: liveRoutes.filter((r) => r.compare_includes_company).length,
        live_probed: liveRoutes.length,
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
