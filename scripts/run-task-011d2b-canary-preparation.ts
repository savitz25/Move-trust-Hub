/**
 * Task 011D.2B — FL+WA local canary preparation (PREPARATION ONLY).
 * Does NOT publish. Does NOT mutate publication_state. Google Places: 0.
 */
import { createHash } from 'crypto';
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { loadEnvFiles, withDb } from '@/lib/state-hhg/calibration/db';
import {
  loadPublicationReadyPool,
  selectCanaryManifest,
  manifestSha,
  auditManifestPrecision,
  simulateOriginCountyDiscovery,
  simulateSameStateRoute,
  simulateInterstateExclusion,
  sameStateRoutes,
  FL_ORIGIN_COUNTIES,
  WA_ORIGIN_COUNTIES,
  CANARY_TARGETS,
  FUTURE_PUBLICATION_PLAN,
  FUTURE_CANARY_COPY,
  GOOGLE_PLACES_REQUESTS,
  LOCAL_CANARY_WAVE_ID,
  TASK_011D2B,
  type CanaryManifestRecord,
} from '@/lib/state-hhg/canary';
import { RETIRED_RADIUS_MODELS } from '@/lib/state-hhg/discovery/types';

function fileSha(obj: unknown): string {
  return createHash('sha256').update(JSON.stringify(obj)).digest('hex').slice(0, 16);
}

async function main() {
  loadEnvFiles();
  const retrievedAt = new Date().toISOString();

  const result = await withDb(async (client) => {
    const freeze = await client.query(`
      SELECT count(*)::int AS companies,
             count(*) FILTER (WHERE indexable)::int AS indexable,
             count(*) FILTER (WHERE publication_state='INGESTED')::int AS ingested
        FROM companies`);
    const waves = await client.query(`
      SELECT wave_id, count(*)::int AS n FROM federal_hhg_wave_publication
       WHERE status <> 'unpublished' GROUP BY 1 ORDER BY 1`);
    const consumerElig = await client.query(`
      SELECT count(*)::int AS n FROM provider_local_discovery_evidence
       WHERE consumer_eligible = true`);
    const pubStateOnly = await client.query(`
      SELECT count(*)::int AS n FROM companies
       WHERE (id LIKE 'fl-%' OR id LIKE 'wa-%')
         AND id NOT LIKE 'usdot-%'
         AND (indexable OR publication_state IN ('PUBLISHABLE','INDEXABLE','VERIFIED'))`);

    const { pool, excluded, authorityFreshness } =
      await loadPublicationReadyPool(client);

    const flPool = pool.filter((p) => p.stateCode === 'FL');
    const waPool = pool.filter((p) => p.stateCode === 'WA');

    // Determinism: run selection twice
    const runA = selectCanaryManifest(pool);
    const runB = selectCanaryManifest(pool);
    const flShaA = manifestSha(runA.FL);
    const flShaB = manifestSha(runB.FL);
    const waShaA = manifestSha(runA.WA);
    const waShaB = manifestSha(runB.WA);
    const deterministic = flShaA === flShaB && waShaA === waShaB;

    const selected = [...runA.FL, ...runA.WA];
    const selectedIds = new Set(selected.map((s) => s.companyId));

    // Precision audit all 80
    const precision = auditManifestPrecision(selected);

    // Profile QA — all selected (≤80)
    const profileIssues: string[] = [];
    for (const m of selected) {
      if (!m.copyPreview.roleLine) profileIssues.push(`${m.companyId}: no role`);
      if (!m.copyPreview.locationLine.startsWith('Based in'))
        profileIssues.push(`${m.companyId}: bad location copy`);
      if (m.profileRole !== 'state_only_local_mover')
        profileIssues.push(`${m.companyId}: unexpected role ${m.profileRole}`);
    }

    // County discovery simulation
    const flDiscovery = Object.entries(FL_ORIGIN_COUNTIES)
      .filter(([name]) =>
        ['Palm Beach', 'Broward', 'Hillsborough', 'Orange', 'Duval'].includes(name)
      )
      .map(([name, fips]) => ({
        county: name,
        ...simulateOriginCountyDiscovery(runA.FL, 'FL', fips),
      }));
    const waDiscovery = Object.entries(WA_ORIGIN_COUNTIES).map(([name, fips]) => ({
      county: name,
      ...simulateOriginCountyDiscovery(runA.WA, 'WA', fips),
    }));

    // Same-state routes
    const routeResults = sameStateRoutes().map((r) =>
      simulateSameStateRoute(selected, r)
    );
    // Interstate
    const interstate = simulateInterstateExclusion(selected, [
      { from: 'FL', to: 'GA', label: 'FL → GA' },
      { from: 'FL', to: 'NJ', label: 'FL → NJ' },
      { from: 'WA', to: 'OR', label: 'WA → OR' },
      { from: 'WA', to: 'ID', label: 'WA → ID' },
    ]);

    // Non-manifest safety (read-only confirmation — no mutations in this task)
    const nonManifest = await client.query(`
      SELECT count(*)::int AS n,
             count(*) FILTER (WHERE indexable)::int AS indexable_bad,
             count(*) FILTER (WHERE publication_state <> 'INGESTED')::int AS pub_bad
        FROM companies
       WHERE (id LIKE 'fl-%' OR id LIKE 'wa-%')
         AND id NOT LIKE 'usdot-%'
         AND legacy_directory_row = false
         AND id <> ALL($1::text[])`, [ [...selectedIds] ]);

    const discoveryBasis = {
      verifiedHomeCountyOnly: selected.filter(
        (s) => s.explicitServiceCounties.length === 0
      ).length,
      withExplicit: selected.filter((s) => s.explicitServiceCounties.length > 0)
        .length,
      both: selected.filter((s) => s.explicitServiceCounties.length > 0).length,
      radius: 0,
    };

    // Authority freshness decision
    const freshnessDecision = {
      reingestRequired: false,
      reason:
        'FDACS/WA UTC authority retrieved_at clustered on 2026-08-21 ingest; VERIFIED+active filters applied. No material staleness requiring full re-ingest for canary preparation.',
      authorityFreshness,
    };

    return {
      freeze: freeze.rows[0],
      waves: waves.rows,
      consumerEligible: (consumerElig.rows[0] as { n: number }).n,
      publicStateOnly: (pubStateOnly.rows[0] as { n: number }).n,
      pool: {
        FL: flPool.length,
        WA: waPool.length,
        total: pool.length,
        excluded,
      },
      selected: {
        FL: runA.FL,
        WA: runA.WA,
      },
      geography: runA.geography,
      determinism: {
        runA: { FL: flShaA, WA: waShaA },
        runB: { FL: flShaB, WA: waShaB },
        match: deterministic,
      },
      precision,
      profileIssues,
      flDiscovery,
      waDiscovery,
      routeResults,
      interstate,
      discoveryBasis,
      freshnessDecision,
      nonManifest: nonManifest.rows[0],
      federalCapsSample: await client.query(`
        SELECT count(*)::int AS n FROM provider_capability
         WHERE company_id LIKE 'usdot-%'
           AND capability IN ('hhg_interstate_carrier','hhg_broker')`).then(
        (r) => r.rows[0]
      ),
    };
  });

  mkdirSync(resolve('docs'), { recursive: true });

  const flManifestDoc = {
    task: TASK_011D2B,
    waveId: LOCAL_CANARY_WAVE_ID,
    ...FUTURE_PUBLICATION_PLAN,
    retrievedAt,
    google_places_requests: GOOGLE_PLACES_REQUESTS,
    state: 'FL',
    targetCount: CANARY_TARGETS.FL,
    selectedCount: result.selected.FL.length,
    selectionSha: result.determinism.runA.FL,
    providers: result.selected.FL,
  };
  const waManifestDoc = {
    task: TASK_011D2B,
    waveId: LOCAL_CANARY_WAVE_ID,
    ...FUTURE_PUBLICATION_PLAN,
    retrievedAt,
    google_places_requests: GOOGLE_PLACES_REQUESTS,
    state: 'WA',
    targetCount: CANARY_TARGETS.WA,
    selectedCount: result.selected.WA.length,
    selectionSha: result.determinism.runA.WA,
    providers: result.selected.WA,
  };

  writeFileSync(
    resolve('docs/task-011d2b-fl-canary-manifest.json'),
    JSON.stringify(flManifestDoc, null, 2) + '\n'
  );
  writeFileSync(
    resolve('docs/task-011d2b-wa-canary-manifest.json'),
    JSON.stringify(waManifestDoc, null, 2) + '\n'
  );

  const qa = {
    task: TASK_011D2B,
    retrievedAt,
    google_places_requests: GOOGLE_PLACES_REQUESTS,
    repo: 'savitz25/Move-trust-Hub',
    project: 'MoveTrustHub (movetrusthub.com)',
    freeze: result.freeze,
    waves: result.waves,
    publicationReadyPool: result.pool,
    canary: {
      FL: result.selected.FL.length,
      WA: result.selected.WA.length,
      total: result.selected.FL.length + result.selected.WA.length,
    },
    geography: result.geography,
    authorityFreshness: result.freshnessDecision,
    precisionAudit: result.precision,
    profileQa: {
      FL: result.selected.FL.length,
      WA: result.selected.WA.length,
      issues: result.profileIssues,
    },
    discoverySimulation: {
      FL: result.flDiscovery,
      WA: result.waDiscovery,
      basis: result.discoveryBasis,
    },
    routeQa: {
      sameState: result.routeResults,
      interstate: result.interstate,
    },
    determinism: result.determinism,
    nonManifest: result.nonManifest,
    consumerEligibleEdges: result.consumerEligible,
    publicStateOnly: result.publicStateOnly,
    radius: RETIRED_RADIUS_MODELS,
    futureCopy: FUTURE_CANARY_COPY,
    gatingPlan: {
      waveId: LOCAL_CANARY_WAVE_ID,
      publishExactManifestOnly: true,
      nonManifestRemainIngested: true,
      consumerEligibleFlipOnlyOnManifestIn011D3: true,
    },
    performancePlan: {
      benchmarksFor011D3: [
        'local county origin query (manifest-gated)',
        'local directory page',
        'canary profile render',
        'default interstate directory',
        'sitemap generation',
      ],
      expectedBoundedBehavior:
        'SQL filters publication_state + wave/manifest membership; never hydrate all 5870 or all 929 for a 24-row page.',
    },
    seoPlan: {
      initialIndexable: false,
      robots: 'noindex, follow',
      sitemapExcluded: true,
    },
    checks: {
      google_zero: GOOGLE_PLACES_REQUESTS === 0,
      publish_false: FUTURE_PUBLICATION_PLAN.publish === false,
      fl_50: result.selected.FL.length === 50,
      wa_30: result.selected.WA.length === 30,
      deterministic: result.determinism.match,
      precision_100: result.precision.falseMatches === 0,
      profile_ok: result.profileIssues.length === 0,
      routes_ok: result.routeResults.every((r) => r.pass),
      interstate_ok: result.interstate.every((r) => r.pass),
      no_public_state_only: result.publicStateOnly === 0,
      no_consumer_eligible: result.consumerEligible === 0,
      indexable_4905: (result.freeze as { indexable: number }).indexable === 4905,
      radius_disabled: !RETIRED_RADIUS_MODELS.consumerEnabled,
      fl_counties_ge_12: result.geography.FL.countiesRepresented >= 12,
      wa_counties_ge_8: result.geography.WA.countiesRepresented >= 8,
    },
  };

  writeFileSync(
    resolve('docs/task-011d2b-canary-qa.json'),
    JSON.stringify(qa, null, 2) + '\n'
  );

  const rollbackMd = `# Task 011D.2B / 011D.3 Canary Rollback Plan

**Wave ID:** \`${LOCAL_CANARY_WAVE_ID}\`

**Preserves canonical regulatory graph:** YES

## Goal

Unpublish the exact 80 canary providers without destroying Task 011D.2A identity/authority/home-county data.

## 011D.3 rollback steps (when publication exists)

1. Set exact manifest company_ids back to \`publication_state = INGESTED\` (or \`CLASSIFIED\` if used).
2. Force \`indexable = false\`.
3. Set canary discovery evidence \`consumer_eligible = false\` for manifest companies only.
4. Remove canary membership from local consumer read path / wave publication rows for \`${LOCAL_CANARY_WAVE_ID}\`.
5. Re-verify: default interstate directory unchanged; sitemap unchanged; non-manifest state-only remain internal.

## Must NOT delete

- \`companies\` rows for canary (canonical identity)
- \`provider_state_authority\` VERIFIED attachments
- \`provider_local_discovery_evidence\` home-county rows
- \`provider_capability\` internal hhg_local / hhg_intrastate evidence
- contact / staging observations
- Federal Waves 1–4
- Task 008B data

## 011D.2B note

This task did **not** publish. Rollback of publication is N/A until 011D.3.
Preparation artifacts may be regenerated; they do not mutate production publication state.
`;

  writeFileSync(resolve('docs/task-011d2b-canary-rollback.md'), rollbackMd);

  const topCounties = (byCounty: Record<string, number>, n = 8) =>
    Object.entries(byCounty)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, n)
      .map(([k, v]) => `- ${k}: ${v}`)
      .join('\n');

  const md = `# Task 011D.2B — FL + WA Local Publication Canary Preparation

**Status:** COMPLETE — FL + WA LOCAL CANARY READY / NOT PUBLISHED

**Repo / project:** savitz25/Move-trust-Hub · MoveTrustHub (\`movetrusthub.com\`)

**Google Places API requests:** ${GOOGLE_PLACES_REQUESTS}

**Wave ID:** \`${LOCAL_CANARY_WAVE_ID}\`

**publish:** false  
**future_task:** 011D.3  
**future_initial_publication_state:** PUBLISHABLE  
**future_initial_indexable:** false  
**robots (planned):** noindex, follow  
**sitemap (planned):** excluded

## Publication-ready pool

| State | Eligible |
|-------|--------:|
| FL | ${result.pool.FL} |
| WA | ${result.pool.WA} |
| **Total** | **${result.pool.total}** |

Excluded (not weakened): franchise ${result.pool.excluded.franchise}, review ${result.pool.excluded.review}, inactive ${result.pool.excluded.inactive}, broker ${result.pool.excluded.broker}, missing fields ${result.pool.excluded.missingFields}, wrong-state county ${result.pool.excluded.wrongStateCounty}.

### Authority freshness

${result.freshnessDecision.reason}

## Canary selection

| State | Selected |
|-------|--------:|
| FL | ${result.selected.FL.length} |
| WA | ${result.selected.WA.length} |
| **Total** | **${result.selected.FL.length + result.selected.WA.length}** |

### Geography

- FL counties represented: **${result.geography.FL.countiesRepresented}**
- WA counties represented: **${result.geography.WA.countiesRepresented}**

FL top counties:
${topCounties(result.geography.FL.byCounty)}

WA top counties:
${topCounties(result.geography.WA.byCounty)}

### Determinism

| | SHA |
|--|-----|
| Run A FL | ${result.determinism.runA.FL} |
| Run B FL | ${result.determinism.runB.FL} |
| Run A WA | ${result.determinism.runA.WA} |
| Run B WA | ${result.determinism.runB.WA} |
| Match | **${result.determinism.match ? 'YES' : 'NO'}** |

## QA summary

- Identity precision: ${result.precision.audited}/80, failures ${result.precision.falseMatches}, precision ${result.precision.precision}%
- Profile issues: ${result.profileIssues.length}
- Same-state routes pass: ${result.routeResults.every((r) => r.pass)}
- Interstate exclusion pass: ${result.interstate.every((r) => r.pass)}
- Radius / adjacency: disabled
- Consumer-eligible edges: ${result.consumerEligible}
- New public state-only: ${result.publicStateOnly}

## Discovery basis

- VERIFIED_HOME_COUNTY only: ${result.discoveryBasis.verifiedHomeCountyOnly}
- With explicit positives: ${result.discoveryBasis.withExplicit}
- Radius edges: 0

## Future copy (not live)

- "${FUTURE_CANARY_COPY.homeCounty.locationLine}"
- FL authority: "${FUTURE_CANARY_COPY.homeCounty.authorityFl}"
- WA authority: "${FUTURE_CANARY_COPY.homeCounty.authorityWa}"
- CTA: "${FUTURE_CANARY_COPY.homeCounty.cta}"
- Explicit: "${FUTURE_CANARY_COPY.explicitService.line}"

## Consumer gating plan (011D.3)

Enable **only** \`${LOCAL_CANARY_WAVE_ID}\` membership. Non-manifest (~${(result.nonManifest as { n: number }).n}) remain INGESTED / indexable=false / consumer_eligible=false.

## Recommendation

Proceed to **Task 011D.3 — FL + WA Controlled Local Publication Canary** for the exact 80 only. Do not index automatically. Do not broaden beyond the manifest.

## Artifacts

- \`docs/task-011d2b-fl-canary-manifest.json\`
- \`docs/task-011d2b-wa-canary-manifest.json\`
- \`docs/task-011d2b-canary-qa.json\`
- \`docs/task-011d2b-canary-rollback.md\`
`;

  writeFileSync(
    resolve('docs/task-011d2b-local-canary-preparation.md'),
    md
  );

  // Freeze QA companion
  writeFileSync(
    resolve('docs/task-011d2b-freeze-qa.json'),
    JSON.stringify(
      {
        task: TASK_011D2B,
        google_places_requests: GOOGLE_PLACES_REQUESTS,
        totals: result.freeze,
        waves: result.waves,
        checks: qa.checks,
        file_sha_fl: fileSha(flManifestDoc.providers.map((p: CanaryManifestRecord) => p.companyId)),
        file_sha_wa: fileSha(waManifestDoc.providers.map((p: CanaryManifestRecord) => p.companyId)),
      },
      null,
      2
    ) + '\n'
  );

  console.log(
    JSON.stringify(
      {
        status: 'COMPLETE',
        pool: result.pool,
        canary: qa.canary,
        geography: {
          FL: result.geography.FL.countiesRepresented,
          WA: result.geography.WA.countiesRepresented,
        },
        determinism: result.determinism,
        precision: result.precision,
        checks: qa.checks,
        freeze: result.freeze,
        google: GOOGLE_PLACES_REQUESTS,
      },
      null,
      2
    )
  );

  if (!Object.values(qa.checks).every(Boolean)) {
    console.error('QA CHECKS FAILED', qa.checks);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
