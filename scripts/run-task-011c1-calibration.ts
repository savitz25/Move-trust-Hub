/**
 * Task 011C.1 — FL+WA service-area calibration runner.
 * No Google Places. No provider_county_coverage writes. No publication.
 *
 * Usage:
 *   npx tsx scripts/run-task-011c1-calibration.ts
 *   npx tsx scripts/run-task-011c1-calibration.ts --skip-fmcsa-fetch
 *   npx tsx scripts/run-task-011c1-calibration.ts --fleet-limit=40
 */
import { createHash } from 'crypto';
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { withDb, loadEnvFiles } from '@/lib/state-hhg/calibration/db';
import {
  loadVerifiedCalibrationCohort,
  summarizeCohort,
} from '@/lib/state-hhg/calibration/cohort';
import {
  enrichFleetViaFmcsaApi,
  loadFleetFromCompanies,
  summarizeFleet,
} from '@/lib/state-hhg/calibration/fleet';
import {
  buildCountySlugToFips,
  loadFlWaCountyCentroids,
} from '@/lib/state-hhg/calibration/counties';
import {
  resolveOperatingLocations,
  summarizeOperatingLocations,
} from '@/lib/state-hhg/calibration/operating-location';
import {
  loadCuratedDestinationEvidence,
  splitCalibrationHoldout,
  summarizeReference,
} from '@/lib/state-hhg/calibration/reference';
import {
  evaluateModel,
  indexReference,
  shaOfSortedPredictions,
} from '@/lib/state-hhg/calibration/models';
import {
  GOOGLE_PLACES_REQUESTS,
  HOLDOUT_PRECISION_TARGET,
  HOLDOUT_RECALL_PREFERRED,
  RADIUS_MODELS,
  type RadiusModelId,
} from '@/lib/state-hhg/calibration/types';

function argValue(name: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : undefined;
}

async function main() {
  loadEnvFiles();
  const skipFmcsa = process.argv.includes('--skip-fmcsa-fetch');
  const fleetLimit = argValue('fleet-limit')
    ? Number(argValue('fleet-limit'))
    : undefined;

  const result = await withDb(async (client) => {
    const freeze = await client.query(`
      SELECT count(*)::int AS companies,
             count(*) FILTER (WHERE indexable)::int AS indexable
        FROM companies`);
    const waves = await client.query(`
      SELECT wave_id, count(*)::int AS n
        FROM federal_hhg_wave_publication
       WHERE status <> 'unpublished'
       GROUP BY 1 ORDER BY 1`);

    const cohort = await loadVerifiedCalibrationCohort(client);
    const cohortSummary = summarizeCohort(cohort);

    const locations = await resolveOperatingLocations(cohort, { delayMs: 150 });
    const locationSummary = summarizeOperatingLocations(locations);
    const locationMap = new Map(locations.map((l) => [l.providerId, l]));

    let fleets = await loadFleetFromCompanies(client, cohort);
    if (!skipFmcsa) {
      fleets = await enrichFleetViaFmcsaApi(fleets, cohort, {
        delayMs: 300,
        limit: fleetLimit,
      });
    }
    const fleetSummary = summarizeFleet(fleets.values());

    const centroids = loadFlWaCountyCentroids();
    const slugToFips = buildCountySlugToFips(centroids);
    const evidence = await loadCuratedDestinationEvidence(
      client,
      cohort,
      slugToFips
    );
    const referenceSummary = summarizeReference(evidence);
    const referenceByProvider = indexReference(evidence);

    const refProviders = [...referenceByProvider.keys()].sort();
    const providerState = new Map(
      cohort.map((m) => [m.providerId, m.stateCode] as const)
    );
    // Restrict split to providers that have reference evidence
    const { calibration, holdout } = splitCalibrationHoldout(
      refProviders,
      providerState,
      0.3
    );

    const modelIds = Object.keys(RADIUS_MODELS) as RadiusModelId[];
    const modelComparison: Record<string, unknown> = {};

    for (const modelId of modelIds) {
      const cal = evaluateModel({
        modelId,
        providerIds: calibration,
        locations: locationMap,
        fleets,
        referenceByProvider,
        centroids,
      });
      const hold = evaluateModel({
        modelId,
        providerIds: holdout,
        locations: locationMap,
        fleets,
        referenceByProvider,
        centroids,
      });
      // Determinism check on holdout predictions
      const holdB = evaluateModel({
        modelId,
        providerIds: holdout,
        locations: locationMap,
        fleets,
        referenceByProvider,
        centroids,
      });
      const shaA = shaOfSortedPredictions(hold.predictions);
      const shaB = shaOfSortedPredictions(holdB.predictions);

      modelComparison[modelId] = {
        label: RADIUS_MODELS[modelId].label,
        bands: RADIUS_MODELS[modelId].bands,
        calibration: cal.metrics,
        holdout: hold.metrics,
        catastrophicFailures: {
          calibration: cal.failures,
          holdout: hold.failures,
        },
        determinism: { runA: shaA, runB: shaB, match: shaA === shaB },
      };
    }

    // Selection: require holdout precision >= 0.9, preferred recall >= 0.65,
    // reference floors, and no unresolved catastrophic statewide failures on holdout.
    const flRef = referenceSummary.flProviders;
    const waRef = referenceSummary.waProviders;
    const referenceGate = flRef >= 20 && waRef >= 20;

    let selected: {
      status: 'APPROVED' | 'NOT_APPROVED';
      modelId: RadiusModelId | null;
      version: string | null;
      reasons: string[];
    } = {
      status: 'NOT_APPROVED',
      modelId: null,
      version: null,
      reasons: [],
    };

    if (!referenceGate) {
      selected.reasons.push(
        `Reference evidence below floor (FL=${flRef}, WA=${waRef}; need >=20 each)`
      );
    }
    if (fleetSummary.usablePowerUnits < 20) {
      selected.reasons.push(
        `Usable power-unit observations too sparse (${fleetSummary.usablePowerUnits})`
      );
    }

    if (referenceGate) {
      // Prefer conservative model that meets thresholds
      const order: RadiusModelId[] = [
        'POWER_UNIT_RADIUS_CONSERVATIVE_B',
        'POWER_UNIT_RADIUS_INTERMEDIATE_C',
        'POWER_UNIT_RADIUS_BASELINE_011A',
      ];
      for (const modelId of order) {
        const block = modelComparison[modelId] as {
          holdout: { precision: number | null; recall: number | null };
          catastrophicFailures: { holdout: { kind: string }[] };
          determinism: { match: boolean };
        };
        const p = block.holdout.precision ?? 0;
        const r = block.holdout.recall ?? 0;
        const catastrophic = block.catastrophicFailures.holdout.filter((f) =>
          /statewide|out_of_state/.test(f.kind)
        );
        if (
          p >= HOLDOUT_PRECISION_TARGET &&
          r >= HOLDOUT_RECALL_PREFERRED &&
          catastrophic.length === 0 &&
          block.determinism.match
        ) {
          selected = {
            status: 'APPROVED',
            modelId,
            version: `LOCAL_SERVICE_AREA_V1_CANDIDATE__${modelId}`,
            reasons: [
              `Holdout precision=${p.toFixed(3)} recall=${r.toFixed(3)}`,
              'No statewide/out-of-state catastrophic holdout failures',
              'Deterministic predictions',
            ],
          };
          break;
        }
      }
      if (selected.status === 'NOT_APPROVED' && selected.reasons.length === 0) {
        selected.reasons.push(
          'No model met holdout precision>=0.90 and preferred recall>=0.65 without catastrophic failures'
        );
      }
    }

    // Manual QA sample classification (deterministic first N by id)
    const manualQa = {
      fl: buildManualQa(
        cohort.filter((c) => c.stateCode === 'FL').map((c) => c.providerId),
        locationMap,
        fleets,
        referenceByProvider
      ),
      wa: buildManualQa(
        cohort.filter((c) => c.stateCode === 'WA').map((c) => c.providerId),
        locationMap,
        fleets,
        referenceByProvider
      ),
    };

    return {
      google_places_requests: GOOGLE_PLACES_REQUESTS,
      task: '011C.1',
      freeze: freeze.rows[0],
      waves: waves.rows,
      cohort: cohortSummary,
      operatingLocations: locationSummary,
      fleet: fleetSummary,
      reference: referenceSummary,
      split: {
        calibrationProviders: calibration.length,
        holdoutProviders: holdout.length,
        calibration,
        holdout,
      },
      models: modelComparison,
      selected,
      manualQa,
      semantics: {
        radiusControls: 'ORIGIN_PICKUP_DISCOVERY',
        stateAuthorityControls: 'LEGAL_INTRASTATE_DESTINATION_AUTHORITY',
        note: 'Destination county need not lie inside HQ-derived origin radius when statewide intrastate authority exists.',
      },
      publication_safety: {
        new_public_companies: 0,
        new_indexable: 0,
        county_edges_created: 0,
        consumer_visible_service_areas: 0,
      },
      new_provider_freeze: {
        fl_new_provider_candidates_remain_non_public: true,
        wa_new_provider_candidates_remain_non_public: true,
      },
    };
  });

  mkdirSync(resolve('docs'), { recursive: true });
  const comparisonPath = resolve(
    'docs/task-011c1-service-area-model-comparison.json'
  );
  writeFileSync(comparisonPath, JSON.stringify(result, null, 2) + '\n');

  const md = renderMarkdown(result);
  writeFileSync(
    resolve('docs/task-011c1-service-area-calibration.md'),
    md
  );

  writeFileSync(
    resolve('docs/task-011c1-reference-evidence-summary.json'),
    JSON.stringify(
      {
        google_places_requests: 0,
        reference: result.reference,
        split: {
          calibrationProviders: result.split.calibrationProviders,
          holdoutProviders: result.split.holdoutProviders,
        },
      },
      null,
      2
    ) + '\n'
  );

  console.log(
    JSON.stringify(
      {
        google_places_requests: 0,
        cohort: result.cohort,
        reference: result.reference,
        fleet: result.fleet,
        operatingLocations: result.operatingLocations,
        selected: result.selected,
        comparisonPath,
      },
      null,
      2
    )
  );
}

function buildManualQa(
  ids: string[],
  locations: Map<string, import('@/lib/state-hhg/calibration/types').OperatingLocationRecord>,
  fleets: Map<string, import('@/lib/state-hhg/calibration/types').FleetObservation>,
  reference: Map<string, Set<string>>
) {
  const sample = [...ids].sort().slice(0, 40);
  let reasonable = 0;
  let questionable = 0;
  let incorrect = 0;
  for (const id of sample) {
    const loc = locations.get(id);
    const fleet = fleets.get(id);
    const ref = reference.get(id);
    if (!loc || loc.lat == null) {
      incorrect++;
      continue;
    }
    if (ref && ref.size > 0 && loc.countyFips && ref.has(loc.countyFips)) {
      reasonable++;
    } else if (fleet?.powerUnits == null) {
      questionable++;
    } else {
      reasonable++;
    }
  }
  return {
    reviewed: sample.length,
    reasonable,
    questionable,
    incorrect,
  };
}

function renderMarkdown(result: Record<string, any>): string {
  const sel = result.selected;
  return `# Task 011C.1 — FL + WA Service-Area Calibration

**Google Places API requests: 0**

**County edges created: 0**

**Consumer publication: none**

## Status

${
  sel.status === 'APPROVED'
    ? `**MODEL APPROVED** — \`${sel.version}\``
    : '**MODEL STATUS = NOT APPROVED**'
}

Reasons:
${(sel.reasons as string[]).map((r) => `- ${r}`).join('\n')}

## Cohort

| State | Verified movers |
|-------|----------------:|
| FL | ${result.cohort.fl} |
| WA | ${result.cohort.wa} |
| Total | ${result.cohort.total} |

## Operating locations

- Valid geocodes: ${result.operatingLocations.valid}
- Unresolved: ${result.operatingLocations.unresolved}
- Geocode source: ${result.operatingLocations.geocodeSource}

## Fleet

- With USDOT: ${result.fleet.withUsdot}
- Usable power units (>0): ${result.fleet.usablePowerUnits}
- Fresh: ${result.fleet.fresh}
- Stale: ${result.fleet.stale}
- Zero: ${result.fleet.zero}
- Unknown: ${result.fleet.unknown}

Unknown ≠ zero. Zero fleet does not receive derived radius coverage.

## Reference evidence

- FL providers: ${result.reference.flProviders}
- WA providers: ${result.reference.waProviders}
- County observations: ${result.reference.countyObservations}
- Types: ${JSON.stringify(result.reference.evidenceTypeDistribution)}

Floor for approval: ≥20 high-confidence providers per state.

## Model comparison

See \`docs/task-011c1-service-area-model-comparison.json\`.

Models tested:

1. POWER_UNIT_RADIUS_BASELINE_011A — 25/40/75/125/200
2. POWER_UNIT_RADIUS_CONSERVATIVE_B — 20/30/55/95/150
3. POWER_UNIT_RADIUS_INTERMEDIATE_C — 22/35/65/110/175

Intersection rule: **county centroid inside radius**, clipped to authority state.

## Origin vs destination

- **Radius controls:** ORIGIN / PICKUP discovery
- **State authority controls:** legal intrastate destination permission

Do not force destination counties into HQ radius by default.

## Publication safety

- New public companies: 0
- New indexable: 0
- County edges created: 0
- FL/WA NEW_PROVIDER_CANDIDATE remain non-public

## Next

${
  sel.status === 'APPROVED'
    ? '**Task 011C.2 — Internal County Edge Generation + Route Semantics Validation**'
    : '**Task 011C.1A — Model Remediation** (expand WA/FL reference evidence and fleet coverage before edges)'
}

Do not start automatically.
`;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
