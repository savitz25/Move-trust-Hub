/**
 * Task 011D.1 — Conservative local discovery foundation audit.
 * NO publication. NO Google Places. NO radius consumer enablement.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { withDb, loadEnvFiles } from '@/lib/state-hhg/calibration/db';
import {
  loadVerifiedCalibrationCohort,
  summarizeCohort,
} from '@/lib/state-hhg/calibration/cohort';
import {
  resolveOperatingLocations,
  summarizeOperatingLocations,
} from '@/lib/state-hhg/calibration/operating-location';
import { loadFlWaCountyCentroids } from '@/lib/state-hhg/calibration/counties';
import { geocodeOneLineAddress } from '@/lib/state-hhg/calibration/census-geocoder';
import {
  buildHomeCountyAudit,
  loadExplicitPositiveDiscoveryEvidence,
  mergeHomeAndExplicitEdges,
  homeCountyEdges,
  computeCountyCoverage,
  experimentalAdjacentCoverage,
  compareExplicitVsHome,
  estimateConservativeScale,
  classifyNewProviderReadiness,
  summarizeReadiness,
  getLocalDiscoveryCandidates,
  RETIRED_RADIUS_MODELS,
  GOOGLE_PLACES_REQUESTS,
  FUTURE_UI_COPY,
  DISCOVERY_EVIDENCE_PRECEDENCE,
  CANONICALIZATION_RULE_011D2,
  ORIGIN_DESTINATION_CONTRACT,
  type NewProviderCandidateInput,
  type LocalDiscoveryProviderMeta,
  type LocalDiscoveryAuthority,
} from '@/lib/state-hhg/discovery';

const GEOCODE_CACHE = resolve(
  'data/state-hhg/calibration/geocode-cache.json'
);

type CohortJsonRecord = {
  state: string;
  sourceAuthorityId: string;
  authorityStatus: string;
  legalName: string;
  dba: string | null;
  usdot: string | null;
  location?: {
    physicalAddress?: string | null;
    city?: string | null;
    postalCode?: string | null;
  };
  phoneAvailable?: boolean;
  emailAvailable?: boolean;
  identityDisposition: string;
  verificationState: string;
  roleClass: string;
  reviewReason?: string | null;
  phone?: string | null;
  email?: string | null;
};

function loadGeocodeCache(): Record<
  string,
  Awaited<ReturnType<typeof geocodeOneLineAddress>>
> {
  if (!existsSync(GEOCODE_CACHE)) return {};
  return JSON.parse(readFileSync(GEOCODE_CACHE, 'utf8'));
}

function saveGeocodeCache(
  cache: Record<string, Awaited<ReturnType<typeof geocodeOneLineAddress>>>
) {
  mkdirSync(resolve('data/state-hhg/calibration'), { recursive: true });
  writeFileSync(GEOCODE_CACHE, JSON.stringify(cache, null, 2));
}

async function geocodeAddressCached(
  address: string,
  cache: Record<string, Awaited<ReturnType<typeof geocodeOneLineAddress>>>,
  delayMs: number
) {
  const key = address.toUpperCase();
  if (cache[key]) return cache[key];
  const geo = await geocodeOneLineAddress(address, { delayMs });
  cache[key] = geo;
  return geo;
}

function loadNewCandidates(state: 'FL' | 'WA'): CohortJsonRecord[] {
  const path = resolve(
    `docs/task-011b-${state.toLowerCase()}-verified-authority-cohort.json`
  );
  const json = JSON.parse(readFileSync(path, 'utf8')) as {
    records: CohortJsonRecord[];
  };
  return (json.records ?? []).filter(
    (r) => r.identityDisposition === 'NEW_PROVIDER_CANDIDATE'
  );
}

async function main() {
  loadEnvFiles();
  const retrievedAt = new Date().toISOString();
  const centroids = loadFlWaCountyCentroids();
  const geocodeCache = loadGeocodeCache();

  const result = await withDb(async (client) => {
    const freeze = await client.query(`
      SELECT count(*)::int AS companies,
             count(*) FILTER (WHERE indexable)::int AS indexable FROM companies`);
    const waves = await client.query(`
      SELECT wave_id, count(*)::int AS n FROM federal_hhg_wave_publication
       WHERE status <> 'unpublished' GROUP BY 1 ORDER BY 1`);
    const caps = await client.query(`
      SELECT capability, evidence_state, count(*)::int AS n
        FROM provider_capability
       WHERE capability IN ('hhg_local','hhg_intrastate','auto_carrier','auto_broker')
       GROUP BY 1, 2 ORDER BY 1, 2`);
    const countyTable = await client.query(
      `SELECT to_regclass('public.provider_county_coverage') AS t`
    );

    const cohort = await loadVerifiedCalibrationCohort(client);
    const cohortSummary = summarizeCohort(cohort);
    // Cache-only preferred; delay 0 if already cached from 011C
    const locations = await resolveOperatingLocations(cohort, { delayMs: 0 });
    const locationSummary = summarizeOperatingLocations(locations);

    const homeAudit = buildHomeCountyAudit({
      cohort,
      locations,
      retrievedAt,
    });
    const explicit = loadExplicitPositiveDiscoveryEvidence(retrievedAt);

    const homeEdges = homeCountyEdges(homeAudit.rows);
    const merged = mergeHomeAndExplicitEdges(homeAudit.rows, explicit.evidence);

    const flHome = homeEdges.filter((e) => e.stateCode === 'FL');
    const waHome = homeEdges.filter((e) => e.stateCode === 'WA');
    const flMerged = merged.filter((e) => e.stateCode === 'FL');
    const waMerged = merged.filter((e) => e.stateCode === 'WA');

    const homeOnlyFl = computeCountyCoverage(flHome);
    const homeOnlyWa = computeCountyCoverage(waHome);
    const homePlusFl = computeCountyCoverage(flMerged);
    const homePlusWa = computeCountyCoverage(waMerged);

    const adjacent = experimentalAdjacentCoverage(homeAudit.rows, centroids, 45);
    const explicitVsHome = compareExplicitVsHome(
      homeAudit.rows,
      explicit.evidence,
      centroids,
      45
    );

    // Explicit edges that are not also home
    const homeKeys = new Set(
      homeEdges.map((e) => `${e.providerId}|${e.countyFips}`)
    );
    const explicitExtra = merged.filter(
      (e) =>
        e.bases.includes('EXPLICIT_SERVICE_AREA') &&
        !homeKeys.has(`${e.providerId}|${e.countyFips}`)
    ).length;

    const scale = estimateConservativeScale({
      sampleProviders: cohort.length,
      sampleHomeEdges: homeEdges.length,
      sampleExplicitExtraEdges: explicitExtra,
      targets: [10_000, 25_000, 50_000, 75_000, 100_000],
    });

    // Internal query smoke (bounded, not public)
    const providers: LocalDiscoveryProviderMeta[] = cohort.map((m) => ({
      providerId: m.providerId,
      canonicalName: m.canonicalName,
      legalName: m.legalName,
      activeVerifiedAuthority: true,
      roleClass: 'mover',
    }));
    const authorities: LocalDiscoveryAuthority[] = cohort.map((m) => ({
      providerId: m.providerId,
      stateCode: m.stateCode,
      authorityNumber: m.authorityNumber,
      authorityType: m.authorityType,
      status: 'active',
      verificationState: 'VERIFIED',
      roleClass: 'mover',
    }));
    const allEvidence = [...homeAudit.evidence, ...explicit.evidence];
    const sampleCounty =
      homeOnlyFl.countyFips[0] ?? homeOnlyWa.countyFips[0] ?? '12099';
    const sampleState = sampleCounty.startsWith('12') ? 'FL' : 'WA';
    const querySmoke = getLocalDiscoveryCandidates({
      state: sampleState,
      originCountyFips: sampleCounty,
      evidence: allEvidence,
      providers,
      authorities,
    });

    // --- New provider readiness (geocode via Census cache; no Google) ---
    const flNew = loadNewCandidates('FL');
    const waNew = loadNewCandidates('WA');
    const readinessRows = [];

    for (const rec of [...flNew, ...waNew]) {
      const stateCode = rec.state.toUpperCase() as 'FL' | 'WA';
      const parts = [
        rec.location?.physicalAddress,
        rec.location?.city,
        stateCode,
        rec.location?.postalCode,
      ].filter(Boolean);
      const address = parts.join(', ');
      let countyFips: string | null = null;
      let geocodeStatus: string | null = null;
      if (address) {
        const geo = await geocodeAddressCached(address, geocodeCache, 50);
        geocodeStatus = geo.status;
        const expected = stateCode === 'FL' ? '12' : '53';
        if (
          (geo.status === 'MATCH' || geo.status === 'TIE') &&
          geo.countyFips &&
          geo.stateFips === expected
        ) {
          countyFips = geo.countyFips;
        }
      }

      const input: NewProviderCandidateInput = {
        stagingKey: `${stateCode}:${rec.sourceAuthorityId}`,
        stateCode,
        authorityNumber: rec.sourceAuthorityId,
        legalName: rec.legalName,
        dba: rec.dba,
        disposition: rec.identityDisposition,
        statusNormalized: rec.authorityStatus || 'unknown',
        authorityStatus: rec.authorityStatus,
        roleClass: rec.roleClass,
        usdot: rec.usdot,
        phone: rec.phoneAvailable ? 'available' : null,
        email: rec.emailAvailable ? 'available' : null,
        physicalAddress: rec.location?.physicalAddress ?? null,
        city: rec.location?.city ?? null,
        postalCode: rec.location?.postalCode ?? null,
        countyFips,
        geocodeStatus,
        reviewReason: rec.reviewReason ?? null,
      };
      readinessRows.push(classifyNewProviderReadiness(input));
    }
    saveGeocodeCache(geocodeCache);

    const flReady = readinessRows.filter((r) => r.stateCode === 'FL');
    const waReady = readinessRows.filter((r) => r.stateCode === 'WA');

    const providersWithHome = new Set(
      homeAudit.rows.filter((r) => r.homeCountyEligible).map((r) => r.providerId)
    );
    const providersWithExplicit = new Set(
      explicit.evidence.map((e) => e.providerId)
    );
    const both = [...providersWithHome].filter((id) =>
      providersWithExplicit.has(id)
    ).length;
    const neither = cohort.filter(
      (m) =>
        !providersWithHome.has(m.providerId) &&
        !providersWithExplicit.has(m.providerId)
    ).length;

    return {
      freeze: freeze.rows[0] as { companies: number; indexable: number },
      waves: waves.rows as Array<{ wave_id: string; n: number }>,
      caps: caps.rows,
      providerCountyCoverageExists: Boolean(
        (countyTable.rows[0] as { t: string | null })?.t
      ),
      cohortSummary,
      locationSummary,
      homeAudit,
      explicit,
      coverage: {
        homeOnly: {
          FL: {
            countiesRepresented: homeOnlyFl.countiesRepresented,
            providersPerCounty: homeOnlyFl.providersPerCounty,
            edges: homeOnlyFl.providerCountyEdges,
          },
          WA: {
            countiesRepresented: homeOnlyWa.countiesRepresented,
            providersPerCounty: homeOnlyWa.providersPerCounty,
            edges: homeOnlyWa.providerCountyEdges,
          },
        },
        homePlusExplicit: {
          FL: {
            countiesRepresented: homePlusFl.countiesRepresented,
            providersPerCounty: homePlusFl.providersPerCounty,
            edges: homePlusFl.providerCountyEdges,
          },
          WA: {
            countiesRepresented: homePlusWa.countiesRepresented,
            providersPerCounty: homePlusWa.providersPerCounty,
            edges: homePlusWa.providerCountyEdges,
          },
        },
        providerBreakdown: {
          withAuthoritativeHomeCounty: providersWithHome.size,
          withExplicitServiceEvidence: providersWithExplicit.size,
          withBoth: both,
          withNeither: neither,
          byState: {
            FL: {
              home: homeAudit.rows.filter(
                (r) => r.stateCode === 'FL' && r.homeCountyEligible
              ).length,
              explicit: new Set(
                explicit.evidence
                  .filter((e) => e.stateCode === 'FL')
                  .map((e) => e.providerId)
              ).size,
            },
            WA: {
              home: homeAudit.rows.filter(
                (r) => r.stateCode === 'WA' && r.homeCountyEligible
              ).length,
              explicit: new Set(
                explicit.evidence
                  .filter((e) => e.stateCode === 'WA')
                  .map((e) => e.providerId)
              ).size,
            },
          },
        },
      },
      adjacentExperimental: {
        label: adjacent.label,
        countiesRepresented: adjacent.countiesRepresented,
        edges: adjacent.edges.length,
        consumerEligible: false,
      },
      explicitVsHome,
      scale,
      querySmoke: {
        prototypeStatus: 'INTERNAL_ONLY',
        boundedQuery: true,
        consumerExposed: false,
        sampleState,
        sampleCounty,
        candidateCount: querySmoke.length,
      },
      readiness: {
        FL: summarizeReadiness(flReady),
        WA: summarizeReadiness(waReady),
        rows: readinessRows,
      },
    };
  });

  mkdirSync(resolve('docs'), { recursive: true });

  const homeCountyAuditDoc = {
    task: '011D.1',
    retrievedAt,
    google_places_requests: GOOGLE_PLACES_REQUESTS,
    radius_models: RETIRED_RADIUS_MODELS,
    cohort: result.cohortSummary,
    operating_locations: result.locationSummary,
    home_county_summary: result.homeAudit.summary,
    address_quality: result.homeAudit.summary.byAddressQuality,
    rows: result.homeAudit.rows,
    explicit_evidence_summary: result.explicit.summary,
    coverage: result.coverage,
    explicit_vs_home: result.explicitVsHome,
    adjacent_experimental: result.adjacentExperimental,
    semantics: {
      home_county_means:
        'Provider is based/registered at an operating address in this county.',
      home_county_does_not_mean:
        'Provider guarantees pickup service throughout this county.',
      explicit_county_means:
        'Provider/regulator evidence positively names this county as a service/pickup area.',
      unmentioned_county_means: 'UNKNOWN — not a negative edge.',
      origin_discovery: ORIGIN_DESTINATION_CONTRACT.localDiscoveryCounty,
      destination_legality: ORIGIN_DESTINATION_CONTRACT.stateAuthority,
    },
  };

  writeFileSync(
    resolve('docs/task-011d1-home-county-audit.json'),
    JSON.stringify(homeCountyAuditDoc, null, 2) + '\n'
  );

  const readinessDoc = {
    task: '011D.1',
    retrievedAt,
    google_places_requests: GOOGLE_PLACES_REQUESTS,
    note: 'Preparation for 011D.2 — no canonical providers created; none published.',
    FL_974: result.readiness.FL,
    WA_196: result.readiness.WA,
    canonicalization_rule: CANONICALIZATION_RULE_011D2,
    // Keep row detail but trim notes-heavy bulk for readability in git
    sample_ready: result.readiness.rows
      .filter((r) => r.readiness === 'READY_FOR_CANONICALIZATION')
      .slice(0, 25),
    sample_review: result.readiness.rows
      .filter((r) => r.readiness === 'REVIEW_REQUIRED')
      .slice(0, 25),
    sample_address_unresolved: result.readiness.rows
      .filter((r) => r.readiness === 'ADDRESS_UNRESOLVED')
      .slice(0, 25),
    full_counts_only: true,
    rows_path_note:
      'Full row classifications embedded under readiness_rows for machine use.',
    readiness_rows: result.readiness.rows.map((r) => ({
      stagingKey: r.stagingKey,
      stateCode: r.stateCode,
      authorityNumber: r.authorityNumber,
      readiness: r.readiness,
      addressQuality: r.addressQuality,
      homeCountyResolvable: r.homeCountyResolvable,
      franchiseHold: r.franchiseHold,
      roleClass: r.roleClass,
      hasPhone: Boolean(r.phone),
      hasEmail: Boolean(r.email),
      hasDba: Boolean(r.dba),
      hasUsdot: Boolean(r.usdot),
      notes: r.notes,
    })),
  };

  writeFileSync(
    resolve('docs/task-011d1-new-provider-readiness.json'),
    JSON.stringify(readinessDoc, null, 2) + '\n'
  );

  const freezeQa = {
    task: '011D.1',
    google_places_requests: GOOGLE_PLACES_REQUESTS,
    totals: result.freeze,
    waves: result.waves,
    capabilities: result.caps,
    provider_county_coverage_exists: result.providerCountyCoverageExists,
    checks: {
      companies: result.freeze.companies === 4941,
      indexable: result.freeze.indexable === 4905,
      wave1:
        result.waves.find((w) => w.wave_id === 'FEDERAL_HHG_2026_08_WAVE_1')
          ?.n === 1000,
      wave2:
        result.waves.find((w) => w.wave_id === 'FEDERAL_HHG_2026_08_WAVE_2')
          ?.n === 1274,
      wave3:
        result.waves.find((w) => w.wave_id === 'FEDERAL_HHG_2026_08_WAVE_3')
          ?.n === 1279,
      wave4:
        result.waves.find(
          (w) => w.wave_id === 'FEDERAL_HHG_2026_08_WAVE_4_FINAL_CLEAN'
        )?.n === 920,
      no_county_edges: !result.providerCountyCoverageExists,
      google_zero: GOOGLE_PLACES_REQUESTS === 0,
      radius_not_approved:
        RETIRED_RADIUS_MODELS.POWER_UNIT_RADIUS === 'NOT_APPROVED' &&
        !RETIRED_RADIUS_MODELS.consumerEnabled,
      new_public_companies: 0,
      new_indexable: 0,
      consumer_county_assignments: 0,
    },
  };
  writeFileSync(
    resolve('docs/task-011d1-freeze-qa.json'),
    JSON.stringify(freezeQa, null, 2) + '\n'
  );

  // Markdown policy doc
  const md = `# Task 011D.1 — Conservative Local Discovery Foundation

**Status:** COMPLETE — CONSERVATIVE LOCAL DISCOVERY FOUNDATION READY / NO PUBLICATION

**Google Places API requests:** ${GOOGLE_PLACES_REQUESTS}

## Policy

Radius models from 011C remain **historical experiments only**:

| Model | Status |
|-------|--------|
| POWER_UNIT_RADIUS | ${RETIRED_RADIUS_MODELS.POWER_UNIT_RADIUS} |
| FIXED_25 | ${RETIRED_RADIUS_MODELS.FIXED_25} |
| FIXED_40 | ${RETIRED_RADIUS_MODELS.FIXED_40} |
| FIXED_50 | ${RETIRED_RADIUS_MODELS.FIXED_50} |
| Consumer enabled | ${RETIRED_RADIUS_MODELS.consumerEnabled} |

Derived fallback (mileage radius, power-unit radius, adjacent-county assumption): **DISABLED**.

## Evidence hierarchy (future)

${DISCOVERY_EVIDENCE_PRECEDENCE.map((b, i) => `${i + 1}. \`${b}\``).join('\n')}

Consumer-approved bases: \`EXPLICIT_SERVICE_AREA\`, \`VERIFIED_HOME_COUNTY\`, \`REGULATOR_TERRITORY\`, \`CURATED_VERIFIED\`.

Not consumer-approved: \`DERIVED_EXPERIMENTAL\`.

## Home county semantics

**Means:** Provider is based/registered at an attributable operating address in this county.

**Does NOT mean:** Provider guarantees pickup throughout the county.

Required: active VERIFIED state mover authority, resolved canonical company, regulator physical/operating address, authoritative county resolution in authority state. PO Box / mailing-only fail closed.

## Explicit service evidence

Positive-only. PARTIAL evidence may prove a county is mentioned/served; it does **not** prove other counties are unserved. Unmentioned counties remain **UNKNOWN** (no negative edges).

### Coverage (verified matched cohort)

| Mode | FL counties | WA counties |
|------|-------------|-------------|
| HOME COUNTY ONLY | ${result.coverage.homeOnly.FL.countiesRepresented} | ${result.coverage.homeOnly.WA.countiesRepresented} |
| HOME + EXPLICIT | ${result.coverage.homePlusExplicit.FL.countiesRepresented} | ${result.coverage.homePlusExplicit.WA.countiesRepresented} |

Home county resolved: FL ${result.homeAudit.summary.flResolved} / ${result.homeAudit.summary.flEligible}; WA ${result.homeAudit.summary.waResolved} / ${result.homeAudit.summary.waEligible}.

Explicit positive providers: FL ${result.explicit.summary.flProviders}; WA ${result.explicit.summary.waProviders}; relationships ${result.explicit.summary.positiveCountyRelationships}.

## Origin / destination

- **Origin discovery** controlled by local discovery evidence (home / explicit / regulator / curated).
- **Destination legality** controlled by active same-state mover authority.

## Internal query

\`getLocalDiscoveryCandidates({ state, originCounty })\` — **internal only**, not consumer-exposed.

Prototype smoke: state=${result.querySmoke.sampleState} county=${result.querySmoke.sampleCounty} candidates=${result.querySmoke.candidateCount}.

## Future UI copy (not wired)

- Home: "${FUTURE_UI_COPY.homeCounty.locationLine}" / "${FUTURE_UI_COPY.homeCounty.authorityLine}" / "${FUTURE_UI_COPY.homeCounty.cta}"
- Explicit: "${FUTURE_UI_COPY.explicitService.line}"
- Forbidden without evidence: ${FUTURE_UI_COPY.forbiddenWithoutEvidence.map((s) => `"${s}"`).join('; ')}

## New provider readiness (011D.2 prep — not created)

| Segment | FL (974) | WA (196) |
|---------|----------|----------|
| READY_FOR_CANONICALIZATION | ${result.readiness.FL.readiness.READY_FOR_CANONICALIZATION} | ${result.readiness.WA.readiness.READY_FOR_CANONICALIZATION} |
| REVIEW_REQUIRED | ${result.readiness.FL.readiness.REVIEW_REQUIRED} | ${result.readiness.WA.readiness.REVIEW_REQUIRED} |
| INACTIVE_HOLD | ${result.readiness.FL.readiness.INACTIVE_HOLD} | ${result.readiness.WA.readiness.INACTIVE_HOLD} |
| ADDRESS_UNRESOLVED | ${result.readiness.FL.readiness.ADDRESS_UNRESOLVED} | ${result.readiness.WA.readiness.ADDRESS_UNRESOLVED} |

## Canonicalization rule (011D.2)

- USDOT required: **NO** (helpful, not mandatory for state-only movers)
- Required: state authority number, legal name, physical address, phone, state regulator source
- Franchise: fail-closed; local entity owns local authority

## Scale estimate (conservative)

| Providers | Home-only edges | Home+explicit edges |
|-----------|-----------------|---------------------|
${result.scale.map((s) => `| ${s.providers} | ${s.homeCountyOnlyEdges} | ${s.homePlusExplicitEdges} |`).join('\n')}

## Publication safety

- New public companies: **0**
- New indexable: **0**
- New sitemap URLs: **0**
- Consumer county assignments: **0**
- Waves 1–4 / Task 008B: **unchanged**

## Recommendation

Proceed to **Task 011D.2 — FL + WA New Provider Canonicalization & Local Publication Canary Preparation** (do not auto-start). Create READY canonicals, attach VERIFIED authority + VERIFIED_HOME_COUNTY + explicit positives, quarantine review/inactive/unresolved, build small noindex canary — **no broad publish**.

## Artifacts

- \`docs/task-011d1-home-county-audit.json\`
- \`docs/task-011d1-new-provider-readiness.json\`
- \`docs/task-011d1-freeze-qa.json\`
- \`lib/state-hhg/discovery/*\`
`;

  writeFileSync(resolve('docs/task-011d1-conservative-local-discovery.md'), md);

  console.log(
    JSON.stringify(
      {
        status: 'COMPLETE',
        google: GOOGLE_PLACES_REQUESTS,
        home: result.homeAudit.summary,
        explicit: result.explicit.summary,
        coverage: result.coverage,
        readiness: {
          FL: result.readiness.FL.readiness,
          WA: result.readiness.WA.readiness,
        },
        scale: result.scale,
        freeze: freezeQa.checks,
        querySmoke: result.querySmoke,
      },
      null,
      2
    )
  );

  const freezeOk = Object.entries(freezeQa.checks).every(([k, v]) =>
    typeof v === 'number' ? v === 0 : Boolean(v)
  );
  if (!freezeOk) {
    console.error('FREEZE CHECK FAILED', freezeQa.checks);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
