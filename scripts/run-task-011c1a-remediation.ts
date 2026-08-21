/**
 * Task 011C.1A — reference expansion + model remediation.
 * No Google Places. No provider_county_coverage writes. No publication.
 */
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
import { loadFlWaCountyCentroids } from '@/lib/state-hhg/calibration/counties';
import {
  resolveOperatingLocations,
  summarizeOperatingLocations,
} from '@/lib/state-hhg/calibration/operating-location';
import { splitCalibrationHoldout } from '@/lib/state-hhg/calibration/reference';
import {
  buildExpandedReferenceCorpus,
  summarizeExpandedReference,
} from '@/lib/state-hhg/calibration/reference-expand';
import {
  describeFleetCorrelation,
  evaluatePartialAware,
  FIXED_RADIUS_BENCHMARKS,
  POWER_MODELS,
  shaPredictions,
} from '@/lib/state-hhg/calibration/metrics-partial';
import { GOOGLE_PLACES_REQUESTS } from '@/lib/state-hhg/calibration/types';
import type { ExpandedReferenceProvider } from '@/lib/state-hhg/calibration/reference-types';

async function main() {
  loadEnvFiles();
  const skipScrape = process.argv.includes('--skip-website-scrape');
  const websiteLimit = process.argv.find((a) => a.startsWith('--website-limit='))
    ? Number(process.argv.find((a) => a.startsWith('--website-limit='))!.split('=')[1])
    : 90;

  const out = await withDb(async (client) => {
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

    const locations = await resolveOperatingLocations(cohort, { delayMs: 0 });
    const locationSummary = summarizeOperatingLocations(locations);
    const locationMap = new Map(locations.map((l) => [l.providerId, l]));

    let fleets = await loadFleetFromCompanies(client, cohort);
    fleets = await enrichFleetViaFmcsaApi(fleets, cohort, {
      delayMs: 250,
      limit: 5, // mostly cached from 011C.1
    });
    const fleetSummary = summarizeFleet(fleets.values());

    const siteRows = await client.query(
      `SELECT id, website, phone, name FROM companies WHERE id = ANY($1::text[])`,
      [cohort.map((c) => c.providerId)]
    );
    const websites = new Map(
      siteRows.rows.map((r) => [
        String(r.id),
        {
          website: r.website ? String(r.website) : null,
          phone: r.phone ? String(r.phone) : null,
          name: r.name ? String(r.name) : null,
        },
      ])
    );

    console.log(
      JSON.stringify({
        phase: 'building_reference',
        scrape: !skipScrape,
        websiteLimit,
        google_places_requests: 0,
      })
    );

    const expanded = await buildExpandedReferenceCorpus({
      client,
      cohort,
      locations,
      websites,
      options: {
        scrapeWebsites: !skipScrape,
        delayMs: 200,
        websiteLimit,
      },
    });
    const refSummary = summarizeExpandedReference(expanded);
    const refMap = new Map(expanded.map((r) => [r.providerId, r]));

    const centroids = loadFlWaCountyCentroids();
    const fleetCorr = describeFleetCorrelation({
      refs: expanded.filter((r) => r.evidenceQuality === 'HIGH'),
      fleets,
      locations: locationMap,
      centroids,
    });

    // High-confidence providers for split/scoring
    const highIds = expanded
      .filter(
        (r) =>
          r.evidenceQuality === 'HIGH' &&
          r.positiveCountyFips.length > 0 &&
          r.identityConfidence !== 'UNRESOLVED' &&
          !r.franchiseSafetyHold
      )
      .map((r) => r.providerId)
      .sort();
    const providerState = new Map(
      expanded.map((r) => [r.providerId, r.stateCode] as const)
    );
    const { calibration, holdout } = splitCalibrationHoldout(
      highIds,
      providerState,
      0.3
    );

    const modelSpecs: Array<{
      id: string;
      bands: readonly import('@/lib/state-hhg/calibration/types').RadiusBand[] | null;
      fixedRadiusMiles: number | null;
    }> = [
      { id: 'POWER_A', bands: POWER_MODELS.A, fixedRadiusMiles: null },
      { id: 'POWER_B', bands: POWER_MODELS.B, fixedRadiusMiles: null },
      { id: 'POWER_C', bands: POWER_MODELS.C, fixedRadiusMiles: null },
      ...FIXED_RADIUS_BENCHMARKS.map((n) => ({
        id: `FIXED_${n}`,
        bands: null,
        fixedRadiusMiles: n,
      })),
    ];

    const models: Record<string, unknown> = {};
    for (const spec of modelSpecs) {
      const flCal = filterState(calibration, providerState, 'FL');
      const waCal = filterState(calibration, providerState, 'WA');
      const flHold = filterState(holdout, providerState, 'FL');
      const waHold = filterState(holdout, providerState, 'WA');

      const evalBlock = (ids: string[]) =>
        evaluatePartialAware({
          providerIds: ids,
          refs: refMap,
          locations: locationMap,
          fleets,
          centroids,
          bands: spec.bands,
          fixedRadiusMiles: spec.fixedRadiusMiles,
        });

      const calAll = evalBlock(calibration);
      const holdAll = evalBlock(holdout);
      const holdAllB = evalBlock(holdout);
      const flHoldM = evalBlock(flHold);
      const waHoldM = evalBlock(waHold);
      const flCalM = evalBlock(flCal);
      const waCalM = evalBlock(waCal);

      models[spec.id] = {
        bands: spec.bands,
        fixedRadiusMiles: spec.fixedRadiusMiles,
        calibration: {
          combined: stripPred(calAll),
          FL: stripPred(flCalM),
          WA: stripPred(waCalM),
        },
        holdout: {
          combined: stripPred(holdAll),
          FL: stripPred(flHoldM),
          WA: stripPred(waHoldM),
        },
        determinism: {
          runA: shaPredictions(holdAll.predictions),
          runB: shaPredictions(holdAllB.predictions),
          match:
            shaPredictions(holdAll.predictions) ===
            shaPredictions(holdAllB.predictions),
        },
      };
    }

    // Approval decision
    const flOk = refSummary.flHighConfidence >= 30;
    const waOk = refSummary.waHighConfidence >= 30;
    const preferred = refSummary.flHighConfidence >= 50 && refSummary.waHighConfidence >= 50;

    let selected: {
      status:
        | 'APPROVED_POWER_UNIT_RADIUS'
        | 'APPROVED_SIMPLE_FIXED_RADIUS'
        | 'APPROVED_HYBRID_EXPLICIT_PLUS_DERIVED'
        | 'NOT_APPROVED';
      modelId: string | null;
      version: string | null;
      parameters: unknown;
      reasons: string[];
    } = {
      status: 'NOT_APPROVED',
      modelId: null,
      version: null,
      parameters: null,
      reasons: [],
    };

    if (!flOk || !waOk) {
      selected.reasons.push(
        `Reference floor unmet (FL=${refSummary.flHighConfidence}, WA=${refSummary.waHighConfidence}; need >=30 each)`
      );
    }

    if (flOk && waOk) {
      // Prefer fixed-radius if fleet correlation weak; else power model B (conservative)
      const preferFixed = /WEAK/.test(fleetCorr.interpretation);
      const order = preferFixed
        ? ['FIXED_40', 'FIXED_25', 'FIXED_50', 'POWER_B', 'POWER_C', 'POWER_A']
        : ['POWER_B', 'POWER_C', 'POWER_A', 'FIXED_40', 'FIXED_25', 'FIXED_50'];

      for (const id of order) {
        const block = models[id] as {
          holdout: {
            combined: { precision: number | null; recall: number | null; exhaustivePopulation: number };
            FL: { precision: number | null; recall: number | null };
            WA: { precision: number | null; recall: number | null };
          };
          determinism: { match: boolean };
          bands: unknown;
          fixedRadiusMiles: number | null;
        };
        const p = block.holdout.combined.precision;
        const r = block.holdout.combined.recall ?? 0;
        // If no exhaustive set, precision may be null — require exhaustive population or use home-county + partial recall carefully
        const precisionOk =
          block.holdout.combined.exhaustivePopulation === 0
            ? false
            : (p ?? 0) >= 0.9;
        const recallOk = r >= 0.65;
        if (precisionOk && recallOk && block.determinism.match) {
          const isFixed = id.startsWith('FIXED_');
          selected = {
            status: isFixed
              ? 'APPROVED_SIMPLE_FIXED_RADIUS'
              : preferFixed
                ? 'APPROVED_HYBRID_EXPLICIT_PLUS_DERIVED'
                : 'APPROVED_POWER_UNIT_RADIUS',
            modelId: id,
            version: `LOCAL_SERVICE_AREA_V1_CANDIDATE__${id}`,
            parameters: {
              bands: block.bands,
              fixedRadiusMiles: block.fixedRadiusMiles,
              intersection: 'county_centroid_inside_radius',
              stateClipping: true,
              partialUnmentionedIsUnknown: true,
            },
            reasons: [
              `Holdout precision=${p?.toFixed(3)} recall=${r.toFixed(3)}`,
              `FL high-confidence refs=${refSummary.flHighConfidence} WA=${refSummary.waHighConfidence}`,
              preferred ? 'Preferred 50+ each met or not required for gate' : 'Floor 30+ each met',
              fleetCorr.interpretation,
            ],
          };
          break;
        }
      }
      if (selected.status === 'NOT_APPROVED' && selected.reasons.length <= 1) {
        selected.reasons.push(
          'No model met holdout precision>=0.90 (exhaustive/scorable) and recall>=0.65'
        );
      }
    }

    // Hybrid recommendation note when refs exist but precision set thin
    if (
      selected.status === 'NOT_APPROVED' &&
      flOk &&
      waOk &&
      refSummary.scorableForPrecision < 10
    ) {
      selected.reasons.push(
        'Too few EXHAUSTIVE/RADIUS_EXPLICIT providers to score precision safely — prefer HYBRID explicit+conservative fallback after more exhaustive labels'
      );
    }

    return {
      google_places_requests: GOOGLE_PLACES_REQUESTS,
      task: '011C.1A',
      freeze: freeze.rows[0],
      waves: waves.rows,
      cohort: cohortSummary,
      operatingLocations: locationSummary,
      fleet: fleetSummary,
      reference: refSummary,
      fleetCorrelation: fleetCorr,
      split: {
        highConfidenceProviders: highIds.length,
        calibration: calibration.length,
        holdout: holdout.length,
      },
      models,
      selected,
      semantics: {
        radiusControls: 'ORIGIN_PICKUP_DISCOVERY',
        stateAuthorityControls: 'LEGAL_INTRASTATE_DESTINATION_AUTHORITY',
        partialUnmentionedCounties: 'UNKNOWN_NOT_NEGATIVE',
      },
      publication_safety: {
        new_public_companies: 0,
        new_indexable: 0,
        county_edges_created: 0,
      },
      expandedReference: expanded,
    };
  });

  mkdirSync(resolve('docs'), { recursive: true });
  writeFileSync(
    resolve('docs/task-011c1a-reference-evidence-expanded.json'),
    JSON.stringify(
      {
        google_places_requests: 0,
        summary: out.reference,
        providers: out.expandedReference,
      },
      null,
      2
    ) + '\n'
  );

  const { expandedReference: _drop, ...comparison } = out;
  writeFileSync(
    resolve('docs/task-011c1a-model-comparison.json'),
    JSON.stringify(comparison, null, 2) + '\n'
  );

  writeFileSync(
    resolve('docs/task-011c1a-model-remediation.md'),
    renderMd(out)
  );

  console.log(
    JSON.stringify(
      {
        google_places_requests: 0,
        reference: out.reference,
        selected: out.selected,
        fleetCorrelation: out.fleetCorrelation.interpretation,
        split: out.split,
      },
      null,
      2
    )
  );
}

function filterState(
  ids: string[],
  states: Map<string, string>,
  state: string
): string[] {
  return ids.filter((id) => states.get(id) === state);
}

function stripPred<T extends { predictions?: unknown }>(m: T) {
  const { predictions: _p, ...rest } = m as T & { predictions?: unknown };
  return rest;
}

function renderMd(out: Record<string, any>): string {
  const sel = out.selected;
  return `# Task 011C.1A — Reference Expansion & Model Remediation

**Google Places API requests: 0**

**County edges created: 0**

## Status

**${sel.status}**

${(sel.reasons as string[]).map((r: string) => `- ${r}`).join('\n')}

${sel.version ? `Version: \`${sel.version}\`` : ''}

## Reference corpus

| State | Before | After (HIGH) |
|-------|-------:|-------------:|
| FL | 20 | ${out.reference.flHighConfidence} |
| WA | 0 | ${out.reference.waHighConfidence} |

- Positive county observations: ${out.reference.positiveCountyObservations}
- Negative county observations: ${out.reference.negativeCountyObservations}
- Completeness: ${JSON.stringify(out.reference.completeness)}
- Scorable for precision (EXHAUSTIVE/RADIUS): ${out.reference.scorableForPrecision}

**PARTIAL rule:** unmentioned counties are UNKNOWN, never automatic negatives.

## Fleet ↔ area relationship

${out.fleetCorrelation.interpretation}

${(out.fleetCorrelation.byBand as Array<any>)
  .map(
    (b) =>
      `- Band ${b.band}: n=${b.n}, median positive counties=${b.medianPositiveCounties}, median max distance=${b.medianMaxDistanceMiles ?? 'n/a'} mi`
  )
  .join('\n')}

## Models tested

Power A/B/C and fixed-radius benchmarks 25/40/50. See \`docs/task-011c1a-model-comparison.json\`.

## Origin / destination

- Radius controls: **ORIGIN / PICKUP discovery**
- State authority controls: **legal intrastate destination permission**

## Next

${
  String(sel.status).startsWith('APPROVED')
    ? '**Task 011C.2 is UNBLOCKED** — do not start automatically.'
    : '**Remain on remediation** — expand EXHAUSTIVE/RADIUS_EXPLICIT WA+FL labels (provider websites / curated territories) before edge generation. Consider hybrid explicit+conservative fallback rather than forcing fleet-radius theory.'
}

Do not start Task 011C.2 automatically.
`;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
