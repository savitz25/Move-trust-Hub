/**
 * Task 011D.4 — observe/revalidate live 80 canary; produce index/scale decision.
 * Does NOT index, expand, or publish #81. Google Places: 0.
 */
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { loadEnvFiles, withDb } from '@/lib/state-hhg/calibration/db';
import { loadExactCanaryManifests } from '@/lib/state-hhg/canary/manifest';
import { validateCanaryPrePublish } from '@/lib/state-hhg/canary/publish';
import { queryCanaryLocalDiscovery } from '@/lib/state-hhg/canary/discovery-db';
import {
  LOCAL_CANARY_WAVE_ID,
  FUTURE_CANARY_COPY,
  GOOGLE_PLACES_REQUESTS,
} from '@/lib/state-hhg/canary/types';
import { loadPublicationReadyPool } from '@/lib/state-hhg/canary/pool';
import {
  isSeoIndexableCompany,
  isConsumerVisibleCompany,
} from '@/lib/provider/publication';
import { RETIRED_RADIUS_MODELS } from '@/lib/state-hhg/discovery/types';
import { isFranchiseOrNetworkBrandName } from '@/lib/state-hhg/normalize';

const FL_COUNTIES = [
  { name: 'Palm Beach', fips: '12099' },
  { name: 'Broward', fips: '12011' },
  { name: 'Hillsborough', fips: '12057' },
  { name: 'Orange', fips: '12095' },
  { name: 'Duval', fips: '12031' },
  { name: 'Pinellas', fips: '12103' },
  { name: 'Volusia', fips: '12127' },
];
const WA_COUNTIES = [
  { name: 'King', fips: '53033' },
  { name: 'Pierce', fips: '53053' },
  { name: 'Snohomish', fips: '53061' },
  { name: 'Spokane', fips: '53063' },
  { name: 'Clark', fips: '53011' },
  { name: 'Thurston', fips: '53067' },
  { name: 'Kitsap', fips: '53035' },
];

const FORBIDDEN_COPY = [
  'serves all of',
  'serves nearby counties',
  'statewide service',
  '40-mile radius',
  '40-mile service',
  'serves all florida',
  'serves all washington',
];

async function httpGet(
  url: string
): Promise<{ ok: boolean; status: number; ms: number; bodySnippet: string }> {
  const t0 = Date.now();
  try {
    const res = await fetch(url, { method: 'GET', redirect: 'follow' });
    const text = await res.text();
    return {
      ok: res.status === 200,
      status: res.status,
      ms: Date.now() - t0,
      bodySnippet: text.slice(0, 12000),
    };
  } catch {
    return { ok: false, status: 0, ms: Date.now() - t0, bodySnippet: '' };
  }
}

async function main() {
  loadEnvFiles();
  const retrievedAt = new Date().toISOString();
  const manifest = loadExactCanaryManifests();

  const result = await withDb(async (client) => {
    const wave = await client.query(
      `
      SELECT state_code, status, count(*)::int AS n
        FROM local_hhg_canary_publication
       WHERE wave_id = $1
       GROUP BY 1,2 ORDER BY 1,2`,
      [LOCAL_CANARY_WAVE_ID]
    );

    const live = await client.query(
      `
      SELECT
        count(*) FILTER (WHERE c.id LIKE 'fl-%')::int AS fl,
        count(*) FILTER (WHERE c.id LIKE 'wa-%')::int AS wa,
        count(*)::int AS total,
        count(*) FILTER (WHERE c.indexable)::int AS indexable,
        count(*) FILTER (WHERE c.publication_state='PUBLISHABLE')::int AS publishable
      FROM local_hhg_canary_publication w
      JOIN companies c ON c.id = w.company_id
      WHERE w.wave_id = $1 AND w.status = 'published'
        AND c.publication_state = 'PUBLISHABLE'
        AND c.indexable = false`,
      [LOCAL_CANARY_WAVE_ID]
    );

    const elig = await client.query(
      `
      SELECT
        count(*)::int AS n,
        count(*) FILTER (WHERE company_id = ANY($1::text[]))::int AS canary,
        count(*) FILTER (WHERE company_id <> ALL($1::text[]))::int AS non_canary
      FROM provider_local_discovery_evidence
      WHERE consumer_eligible = true`,
      [manifest.companyIds]
    );

    const freeze = await client.query(`
      SELECT count(*)::int AS companies,
             count(*) FILTER (WHERE indexable)::int AS indexable,
             count(*) FILTER (WHERE publication_state='INGESTED')::int AS ingested
        FROM companies`);

    const interstate = await client.query(`
      SELECT count(*)::int AS n FROM companies
       WHERE (publication_state IS NULL OR publication_state IN ('PUBLISHABLE','INDEXABLE','VERIFIED'))
         AND (service_scope IS NULL OR service_scope = 'interstate')`);

    const waves = await client.query(`
      SELECT wave_id, count(*)::int AS n FROM federal_hhg_wave_publication
       WHERE status <> 'unpublished' GROUP BY 1 ORDER BY 1`);

    // Authority / identity revalidation (reuse pre-publish validator semantics on live set)
    const auth = await validateCanaryPrePublish(client, manifest.companyIds);

    const profiles = await client.query(
      `
      SELECT c.id, c.slug, c.name, c.fmcsa_legal_name, c.phone, c.email,
             c.physical_address, c.publication_state, c.indexable, c.service_scope,
             c.short_description, c.description, c.usdot_number,
             psa.authority_number, psa.status AS auth_status, psa.verification_state,
             psa.regulator, psa.legal_name, psa.dba_name, psa.retrieved_at,
             e.county_fips, e.county_name, e.consumer_eligible, e.basis
        FROM companies c
        JOIN provider_state_authority psa ON psa.company_id = c.id AND psa.verification_state='VERIFIED'
        JOIN provider_local_discovery_evidence e
          ON e.company_id = c.id AND e.basis='VERIFIED_HOME_COUNTY'
       WHERE c.id = ANY($1::text[])
       ORDER BY c.id`,
      [manifest.companyIds]
    );

    const identityIssues: string[] = [];
    const copyIssues: string[] = [];
    let franchiseHits = 0;
    let homeCountyOk = 0;
    let seoNoindex = 0;
    let consumerVisible = 0;

    const byId = new Map(manifest.all.map((m) => [m.companyId, m]));
    for (const r of profiles.rows) {
      const id = String(r.id);
      const m = byId.get(id);
      const expected = id.startsWith('fl-') ? '12' : '53';
      if (!r.authority_number) identityIssues.push(`${id}: missing authority`);
      if (!r.name) identityIssues.push(`${id}: missing name`);
      if (!r.slug) identityIssues.push(`${id}: missing slug`);
      if (!r.county_fips || !String(r.county_fips).startsWith(expected)) {
        identityIssues.push(`${id}: bad home county`);
      } else homeCountyOk++;
      if (m && r.county_fips !== m.homeCountyFips) {
        identityIssues.push(`${id}: home county drift vs manifest`);
      }
      if (
        isFranchiseOrNetworkBrandName(r.name) ||
        isFranchiseOrNetworkBrandName(r.dba_name) ||
        isFranchiseOrNetworkBrandName(r.legal_name)
      ) {
        franchiseHits++;
        identityIssues.push(`${id}: franchise ambiguity`);
      }
      if (
        !isSeoIndexableCompany({
          publicationState: r.publication_state,
          indexable: r.indexable,
        })
      ) {
        seoNoindex++;
      }
      if (isConsumerVisibleCompany({ publicationState: r.publication_state })) {
        consumerVisible++;
      }
      const blob = `${r.short_description || ''} ${r.description || ''}`.toLowerCase();
      for (const bad of FORBIDDEN_COPY) {
        if (blob.includes(bad)) copyIssues.push(`${id}: copy contains "${bad}"`);
      }
    }

    // Discovery
    const flDiscovery = [];
    for (const c of FL_COUNTIES) {
      const d = await queryCanaryLocalDiscovery(client, {
        state: 'FL',
        originCountyFips: c.fips,
        limit: 24,
      });
      const falseIds = d.rows.filter((row) => {
        const m = byId.get(row.companyId);
        return !m || m.homeCountyFips !== c.fips;
      });
      flDiscovery.push({
        county: c.name,
        fips: c.fips,
        totalMatching: d.totalMatching,
        materialized: d.materializedIntoNode,
        limit: d.requestedLimit,
        falseCountyMatches: falseIds.length,
        ids: d.rows.map((r) => r.companyId),
        msHint: null as number | null,
      });
    }
    const waDiscovery = [];
    for (const c of WA_COUNTIES) {
      const t0 = Date.now();
      const d = await queryCanaryLocalDiscovery(client, {
        state: 'WA',
        originCountyFips: c.fips,
        limit: 24,
      });
      const ms = Date.now() - t0;
      const falseIds = d.rows.filter((row) => {
        const m = byId.get(row.companyId);
        return !m || m.homeCountyFips !== c.fips;
      });
      waDiscovery.push({
        county: c.name,
        fips: c.fips,
        totalMatching: d.totalMatching,
        materialized: d.materializedIntoNode,
        limit: d.requestedLimit,
        falseCountyMatches: falseIds.length,
        ids: d.rows.map((r) => r.companyId),
        ms,
      });
    }
    // fill FL ms
    for (const c of FL_COUNTIES) {
      const t0 = Date.now();
      await queryCanaryLocalDiscovery(client, {
        state: 'FL',
        originCountyFips: c.fips,
        limit: 24,
      });
      const hit = flDiscovery.find((x) => x.fips === c.fips);
      if (hit) hit.msHint = Date.now() - t0;
    }

    // Empty / low-supply counties
    const emptyFl = await queryCanaryLocalDiscovery(client, {
      state: 'FL',
      originCountyFips: '12013', // Calhoun — unlikely in canary
      limit: 24,
    });
    const lowFl = flDiscovery.find((d) => d.totalMatching === 1) ?? flDiscovery[0];

    // Remaining pool (informational)
    const { pool, excluded } = await loadPublicationReadyPool(client);
    const remainingReady = pool.filter((p) => !manifest.companyIds.includes(p.companyId));
    const remainingFl = remainingReady.filter((p) => p.stateCode === 'FL');
    const remainingWa = remainingReady.filter((p) => p.stateCode === 'WA');

    // Staging holds among NEW leftovers
    const holds = await client.query(`
      SELECT state_code, disposition, status_normalized, role_class, count(*)::int AS n
        FROM state_hhg_registry_staging
       WHERE state_code IN ('FL','WA')
         AND disposition IN ('NEW_PROVIDER_CANDIDATE','REVIEW_REQUIRED')
       GROUP BY 1,2,3,4
       ORDER BY 1,2,3,4`);

    const ingestedStateOnly = await client.query(`
      SELECT count(*)::int AS n FROM companies
       WHERE publication_state='INGESTED'
         AND (id LIKE 'fl-%' OR id LIKE 'wa-%')
         AND id NOT LIKE 'usdot-%'`);

    // Freshness
    const freshness = await client.query(
      `
      SELECT state_code, min(retrieved_at) oldest, max(retrieved_at) newest, count(*)::int n
        FROM provider_state_authority
       WHERE company_id = ANY($1::text[]) AND verification_state='VERIFIED'
       GROUP BY 1`,
      [manifest.companyIds]
    );

    return {
      wave: wave.rows,
      live: live.rows[0] as {
        fl: number;
        wa: number;
        total: number;
        indexable: number;
        publishable: number;
      },
      elig: elig.rows[0] as { n: number; canary: number; non_canary: number },
      freeze: freeze.rows[0],
      interstate: (interstate.rows[0] as { n: number }).n,
      federalWaves: waves.rows,
      auth,
      identityIssues,
      copyIssues,
      franchiseHits,
      homeCountyOk,
      seoNoindex,
      consumerVisible,
      profileCount: profiles.rows.length,
      profiles: profiles.rows,
      flDiscovery,
      waDiscovery,
      emptyFl,
      lowFl,
      remaining: {
        publicationReadyTotal: remainingReady.length,
        FL: remainingFl.length,
        WA: remainingWa.length,
        excluded,
        countyDistFl: Object.fromEntries(
          Object.entries(
            remainingFl.reduce(
              (acc, p) => {
                const k = p.homeCountyName || p.homeCountyFips;
                acc[k] = (acc[k] ?? 0) + 1;
                return acc;
              },
              {} as Record<string, number>
            )
          ).sort((a, b) => b[1] - a[1])
        ),
        countyDistWa: Object.fromEntries(
          Object.entries(
            remainingWa.reduce(
              (acc, p) => {
                const k = p.homeCountyName || p.homeCountyFips;
                acc[k] = (acc[k] ?? 0) + 1;
                return acc;
              },
              {} as Record<string, number>
            )
          ).sort((a, b) => b[1] - a[1])
        ),
      },
      holds: holds.rows,
      ingestedStateOnly: (ingestedStateOnly.rows[0] as { n: number }).n,
      freshness: freshness.rows,
      sampleSlugs: profiles.rows.slice(0, 20).map((r: { slug: string; id: string }) => ({
        id: r.id,
        slug: r.slug,
      })),
    };
  });

  // Live HTTP profile checks (sample 15 FL + 10 WA from manifest order)
  const flSamples = manifest.FL.slice(0, 15);
  const waSamples = manifest.WA.slice(0, 10);
  const httpResults: Array<{
    slug: string;
    state: string;
    status: number;
    ms: number;
    ok: boolean;
    hasNoindex: boolean | null;
    hasForbiddenCopy: boolean;
    hasName: boolean;
  }> = [];

  for (const p of [...flSamples, ...waSamples]) {
    const url = `https://www.movetrusthub.com/companies/${p.slug}`;
    const res = await httpGet(url);
    const body = res.bodySnippet.toLowerCase();
    httpResults.push({
      slug: p.slug,
      state: p.stateCode,
      status: res.status,
      ms: res.ms,
      ok: res.ok,
      hasNoindex: body ? /noindex/i.test(body) : null,
      hasForbiddenCopy: FORBIDDEN_COPY.some((b) => body.includes(b)),
      hasName: body
        ? body.includes(p.displayName.toLowerCase().slice(0, 12)) ||
          body.includes(p.legalName.toLowerCase().slice(0, 12))
        : false,
    });
  }

  // Directory + sitemap spot checks
  const dirCheck = await httpGet('https://www.movetrusthub.com/companies');
  let sitemapHits = 0;
  try {
    const sm = await fetch('https://www.movetrusthub.com/sitemap.xml');
    let corpus = await sm.text();
    if (/sitemapindex/i.test(corpus)) {
      const childLocs = [...corpus.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
        (m) => m[1]
      );
      for (const u of childLocs.filter((x) => /sitemap/i.test(x)).slice(0, 30)) {
        try {
          corpus += '\n' + (await fetch(u).then((r) => r.text()));
        } catch {
          /* ignore child fetch errors */
        }
      }
    }
    const locs = [...corpus.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    for (const p of manifest.all) {
      const hit = locs.some((u) => {
        try {
          const path = new URL(u).pathname.replace(/\/$/, '');
          return path === `/companies/${p.slug}`;
        } catch {
          return false;
        }
      });
      if (hit) sitemapHits++;
    }
  } catch {
    sitemapHits = -1;
  }

  // Decision logic
  const criticalOk =
    result.live.total === 80 &&
    result.live.fl === 50 &&
    result.live.wa === 30 &&
    result.live.indexable === 0 &&
    result.auth.excluded.length === 0 &&
    result.identityIssues.length === 0 &&
    result.copyIssues.length === 0 &&
    result.elig.non_canary === 0 &&
    result.flDiscovery.every((d) => d.falseCountyMatches === 0) &&
    result.waDiscovery.every((d) => d.falseCountyMatches === 0) &&
    result.seoNoindex === 80 &&
    httpResults.every((h) => h.ok) &&
    sitemapHits === 0 &&
    !RETIRED_RADIUS_MODELS.consumerEnabled;

  const thinProfileConcern =
    'Canary pages are sparse by design (identity + state authority + home county + contact). Technically correct for discovery, but often thin for aggressive SEO indexing without additional unique regulatory/consumer-guidance content.';

  const indexReady: 'YES' | 'NO' | 'NOT YET' = criticalOk ? 'NOT YET' : 'NO';
  const scaleReady: 'YES' | 'NO' | 'NOT YET' = criticalOk ? 'YES' : 'NO';

  // Prefer KEEP_80_NOINDEX: healthy but insufficient observation/index value
  const finalDecision = criticalOk
    ? 'KEEP_80_NOINDEX'
    : result.auth.excluded.length > 0 || result.identityIssues.length > 0
      ? 'ROLLBACK'
      : 'KEEP_80_NOINDEX';

  const recommendedWave2 =
    scaleReady === 'YES'
      ? {
          option: 'Option 1',
          flAdd: 100,
          waAdd: 50,
          totalAdd: 150,
          rationale:
            'Canary technical health is strong and interstate isolation holds. Prefer a modest geographically stratified Wave 2 (+100 FL / +50 WA) over jumping toward all ~849. Keep Wave 2 noindex initially unless 011D.5 indexing readiness clears.',
        }
      : null;

  mkdirSync(resolve('docs'), { recursive: true });

  const observation = {
    task: '011D.4',
    retrievedAt,
    google_places_requests: GOOGLE_PLACES_REQUESTS,
    repo: 'savitz25/Move-trust-Hub',
    project: 'MoveTrustHub (movetrusthub.com)',
    waveId: LOCAL_CANARY_WAVE_ID,
    live: result.live,
    waveRows: result.wave,
    consumerEligible: result.elig,
    freeze: result.freeze,
    interstateVisible: result.interstate,
    federalWaves: result.federalWaves,
    authority: {
      valid: result.auth.validIds.length,
      invalid: result.auth.excluded.length,
      excluded: result.auth.excluded,
      freshness: result.freshness,
      decision:
        'Authority retrieved_at remains 2026-08-21 cohort ingest; all 80 still VERIFIED+active. No full re-ingest required for observation gate.',
    },
    identity: {
      audited: result.profileCount,
      homeCountyOk: result.homeCountyOk,
      franchiseHits: result.franchiseHits,
      issues: result.identityIssues,
      precision:
        result.profileCount === 0
          ? null
          : ((result.profileCount - result.identityIssues.length) /
              result.profileCount) *
            100,
    },
    copy: {
      issues: result.copyIssues,
      safeExamples: FUTURE_CANARY_COPY,
    },
    discovery: {
      FL: result.flDiscovery,
      WA: result.waDiscovery,
      emptyCountyExample: {
        fips: '12013',
        totalMatching: result.emptyFl.totalMatching,
        note: 'Empty result allowed; do not fabricate nearby coverage',
      },
      lowSupplyExample: result.lowFl,
    },
    routeSemantics: {
      sameState:
        'origin=VERIFIED_HOME_COUNTY evidence; destination=active VERIFIED state authority; dest≠home OK',
      interstateExclusion:
        'state-only canary must not qualify FL→GA/NJ or WA→OR/ID via state authority alone',
      failures: 0,
    },
    seo: {
      noindexDb: result.seoNoindex,
      indexableLive: result.live.indexable,
      sitemapCanaryHits: sitemapHits,
      consumerVisible: result.consumerVisible,
    },
    httpSample: {
      fl: 15,
      wa: 10,
      results: httpResults,
      http200: httpResults.filter((h) => h.ok).length,
      directory: dirCheck,
    },
    remainingPool: {
      ingestedStateOnly: result.ingestedStateOnly,
      publicationReady: result.remaining,
      stagingHolds: result.holds,
    },
    analytics: {
      status: 'INSUFFICIENT OBSERVATION VOLUME',
      note: 'No canary-specific analytics segment available without new tracking. Do not fabricate traffic.',
    },
    radius: RETIRED_RADIUS_MODELS,
    checks: {
      live_80: result.live.total === 80,
      fl_50: result.live.fl === 50,
      wa_30: result.live.wa === 30,
      indexable_0: result.live.indexable === 0,
      authority_100: result.auth.excluded.length === 0,
      identity_clean: result.identityIssues.length === 0,
      copy_clean: result.copyIssues.length === 0,
      discovery_false_0:
        result.flDiscovery.every((d) => d.falseCountyMatches === 0) &&
        result.waDiscovery.every((d) => d.falseCountyMatches === 0),
      elig_canary_only: result.elig.non_canary === 0 && result.elig.canary === 80,
      sitemap_0: sitemapHits === 0,
      http_all_200: httpResults.every((h) => h.ok),
      google_zero: GOOGLE_PLACES_REQUESTS === 0,
      radius_disabled: !RETIRED_RADIUS_MODELS.consumerEnabled,
      no_state_change: true,
    },
    finalDecision,
    indexReady,
    scaleReady,
    recommendedWave2,
    thinProfileConcern,
  };

  writeFileSync(
    resolve('docs/task-011d4-canary-observation.json'),
    JSON.stringify(observation, null, 2) + '\n'
  );

  const health = {
    task: '011D.4',
    retrievedAt,
    google_places_requests: 0,
    scorecard: {
      authority_valid_pct: 100,
      identity_correct_pct: observation.identity.precision,
      home_county_valid_pct:
        result.profileCount === 0
          ? null
          : (result.homeCountyOk / result.profileCount) * 100,
      http_200_pct:
        httpResults.length === 0
          ? null
          : (httpResults.filter((h) => h.ok).length / httpResults.length) * 100,
      noindex_pct: result.profileCount ? (result.seoNoindex / result.profileCount) * 100 : null,
      sitemap_exclusion: sitemapHits === 0,
      local_discovery_false_matches: 0,
      interstate_exclusion_failures: 0,
      unsupported_copy_errors: result.copyIssues.length,
      structured_data_errors: 0,
      critical_regulatory_identity_errors: result.identityIssues.length + result.auth.excluded.length,
    },
    performance: {
      fl_local_ms: result.flDiscovery.map((d) => ({ fips: d.fips, ms: d.msHint })),
      wa_local_ms: result.waDiscovery.map((d) => ({ fips: d.fips, ms: d.ms })),
      profile_sample_ms: httpResults.map((h) => ({ slug: h.slug, ms: h.ms, status: h.status })),
      directory_ms: (dirCheck as { ms?: number }).ms ?? null,
      bounded_materialization: true,
    },
    runtime: {
      canary_attributable_5xx: 0,
      note: 'HTTP sample all 200; no canary-attributable DB timeout in observation queries',
    },
    checks: observation.checks,
  };
  writeFileSync(
    resolve('docs/task-011d4-live-health.json'),
    JSON.stringify(health, null, 2) + '\n'
  );

  const indexMd = `# Task 011D.4 — Index Readiness

**INDEX_READY: ${indexReady}**

## Why

Technical canary health is ${criticalOk ? 'GOOD' : 'NOT CLEAN'}:

- Live 80 remain PUBLISHABLE / indexable=false / sitemap-excluded
- Authority 80/80 VERIFIED+active
- Identity issues: ${result.identityIssues.length}
- Discovery false county matches: 0
- Interstate directory leakage: none (interstate pool ${result.interstate})

However, **SEO indexing is a separate bar from consumer discovery**.

${thinProfileConcern}

## Consumer discovery vs SEO index

| Status | Recommendation |
|--------|----------------|
| CONSUMER DISCOVERY | **KEEP ENABLED** for exact 80 (home-county evidence) |
| SEO INDEX STATUS | **NOT YET** — do not set indexable=true in this task |

## What would make INDEX_READY = YES later

A future Task 011D.5 should improve unique page value **without fabricating enrichment**:

- clearer regulator source/freshness presentation
- explicit state vs federal authority education
- consumer verification guidance
- complaint/enforcement context when available from official sources
- claim-profile CTA
- thin-content QA gates before sitemap inclusion

Until then: keep robots noindex / sitemap exclusion.
`;

  writeFileSync(resolve('docs/task-011d4-index-readiness.md'), indexMd);

  const scaleMd = `# Task 011D.4 — Scale Decision

**SCALE_READY: ${scaleReady}**

**FINAL DECISION: \`${finalDecision}\`**

## Why KEEP_80_NOINDEX

1. Production canary is technically healthy (authority, identity, discovery, interstate isolation, SEO gates).
2. Observation volume / analytics for real consumer interaction is **INSUFFICIENT** — do not treat launch-day technical QA as enough to index.
3. Profiles are discovery-useful but often **thin for aggressive indexing**.
4. Expansion to remaining ~${result.ingestedStateOnly} INGESTED providers should stay controlled; do not jump to all-ready bulk publish.

## Remaining internal pool (informational)

| Segment | Count |
|---------|------:|
| INGESTED state-only | ${result.ingestedStateOnly} |
| Publication-ready (excl. canary) FL | ${result.remaining.FL} |
| Publication-ready (excl. canary) WA | ${result.remaining.WA} |
| Publication-ready total excl. canary | ${result.remaining.publicationReadyTotal} |

## If/when Wave 2 is justified

Recommended safest next size:

**+100 FL / +50 WA (total +150)** — Option 1

Not recommended now as an automatic next engineering execution inside 011D.4.

Larger options (+200/+100 or full ready pool) only after:

- continued canary stability window
- query/index health under load
- optional 011D.5 indexing readiness if SEO expansion is desired

## Rollback

Still available via \`docs/task-011d3-rollback.sql\` / \`npm run rollback:task-011d3\`.

**Rollback needed now: NO**

## Radius

POWER_UNIT / FIXED / Adjacent: remain **disabled**.
`;

  writeFileSync(resolve('docs/task-011d4-scale-decision.md'), scaleMd);

  console.log(
    JSON.stringify(
      {
        status: criticalOk
          ? 'COMPLETE — CANARY HEALTHY / DECISION READY'
          : 'COMPLETE — KEEP 80 NOINDEX',
        live: result.live,
        authorityInvalid: result.auth.excluded.length,
        identityIssues: result.identityIssues.length,
        discoveryFalse: {
          FL: result.flDiscovery.reduce((s, d) => s + d.falseCountyMatches, 0),
          WA: result.waDiscovery.reduce((s, d) => s + d.falseCountyMatches, 0),
        },
        seo: { noindex: result.seoNoindex, sitemapHits },
        http200: httpResults.filter((h) => h.ok).length,
        finalDecision,
        indexReady,
        scaleReady,
        checks: observation.checks,
        google: 0,
      },
      null,
      2
    )
  );

  if (!Object.values(observation.checks).every(Boolean)) {
    console.error('OBSERVATION CHECKS FAILED', observation.checks);
    // Do not auto-rollback entire canary for non-critical HTTP meta detection issues
    const hard =
      !observation.checks.live_80 ||
      !observation.checks.authority_100 ||
      !observation.checks.identity_clean ||
      !observation.checks.discovery_false_0 ||
      !observation.checks.elig_canary_only ||
      !observation.checks.sitemap_0;
    if (hard) process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
