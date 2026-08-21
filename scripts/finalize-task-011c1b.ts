/**
 * Finalize 011C.1B: merge manual reviewed + harvest, label FIPS, rescore, write artifacts.
 */
import { createHash } from 'crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
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
  countiesForState,
  countiesWithinRadius,
  loadFlWaCountyCentroids,
} from '@/lib/state-hhg/calibration/counties';
import {
  resolveOperatingLocations,
  summarizeOperatingLocations,
} from '@/lib/state-hhg/calibration/operating-location';
import { splitCalibrationHoldout } from '@/lib/state-hhg/calibration/reference';
import {
  evaluatePartialAware,
  FIXED_RADIUS_BENCHMARKS,
  POWER_MODELS,
  shaPredictions,
  describeFleetCorrelation,
} from '@/lib/state-hhg/calibration/metrics-partial';
import type { ExpandedReferenceProvider } from '@/lib/state-hhg/calibration/reference-types';
import type { ExhaustiveEvidenceRecord } from '@/lib/state-hhg/calibration/exhaustive-types';
import { GOOGLE_PLACES_REQUESTS } from '@/lib/state-hhg/calibration/types';

function countyToFips(
  name: string,
  state: 'FL' | 'WA',
  centroids: ReturnType<typeof loadFlWaCountyCentroids>
): string | null {
  const stateFips = state === 'FL' ? '12' : '53';
  const cleaned = name.toLowerCase().replace(/\bcounty\b/g, '').trim();
  const hit = centroids.find(
    (c) =>
      c.stateFips === stateFips &&
      c.name.toLowerCase().replace(/[^a-z]/g, '') ===
        cleaned.replace(/[^a-z]/g, '')
  );
  return hit?.countyFips ?? null;
}

async function main() {
  loadEnvFiles();
  const manual = JSON.parse(
    readFileSync(
      resolve('data/state-hhg/calibration/011c1b-manual-reviewed-evidence.json'),
      'utf8'
    )
  ) as { records: any[] };

  let harvestRecords: ExhaustiveEvidenceRecord[] = [];
  try {
    const prev = JSON.parse(
      readFileSync(
        resolve('docs/task-011c1b-exhaustive-evidence-summary.json'),
        'utf8'
      )
    );
    harvestRecords = prev.records ?? [];
  } catch {
    harvestRecords = [];
  }

  await withDb(async (client) => {
    const freeze = await client.query(`
      SELECT count(*)::int AS companies,
             count(*) FILTER (WHERE indexable)::int AS indexable FROM companies`);
    const waves = await client.query(`
      SELECT wave_id, count(*)::int AS n FROM federal_hhg_wave_publication
       WHERE status <> 'unpublished' GROUP BY 1 ORDER BY 1`);
    const cohort = await loadVerifiedCalibrationCohort(client);
    const cohortSummary = summarizeCohort(cohort);
    const locations = await resolveOperatingLocations(cohort, { delayMs: 0 });
    const locationMap = new Map(locations.map((l) => [l.providerId, l]));
    let fleets = await loadFleetFromCompanies(client, cohort);
    fleets = await enrichFleetViaFmcsaApi(fleets, cohort, { delayMs: 100, limit: 0 });

    const centroids = loadFlWaCountyCentroids();
    const retrievedAt = new Date().toISOString();
    const merged: ExhaustiveEvidenceRecord[] = [];

    // Manual reviewed → structured
    for (const m of manual.records) {
      const stateCode = m.stateCode as 'FL' | 'WA';
      const stateCounties = countiesForState(centroids, stateCode).map(
        (c) => c.countyFips
      );
      const positives = (m.positiveCounties as string[])
        .map((n) => countyToFips(n, stateCode, centroids))
        .filter(Boolean) as string[];
      let negatives: string[] = [];
      if (m.negativeRule === 'same_state_outside_listed' && m.secondCheckPass) {
        negatives = stateCounties.filter((f) => !positives.includes(f));
      }
      const known = new Set([...positives, ...negatives]);
      const scorable =
        Boolean(m.secondCheckPass) &&
        (m.completenessClass === 'EXHAUSTIVE_LIST' ||
          m.completenessClass === 'RADIUS_EXPLICIT' ||
          m.completenessClass === 'EXPLICIT_STATEWIDE' ||
          m.completenessClass === 'EXPLICIT_EXCLUSION') &&
        (negatives.length > 0 || m.completenessClass === 'EXPLICIT_STATEWIDE');

      merged.push({
        evidenceId: createHash('sha1')
          .update(`${m.providerId}|${m.sourceUrl}|${m.completenessClass}`)
          .digest('hex')
          .slice(0, 16),
        providerId: m.providerId,
        stateCode,
        sourceUrl: m.sourceUrl,
        sourceType: m.sourceType,
        retrievedAt,
        quotedStatement: m.quotedStatement,
        identityEvidence: m.identityEvidence,
        identityConfidence: m.identityConfidence,
        completenessClass: m.completenessClass,
        confidence: m.secondCheckPass ? 'HIGH' : 'MEDIUM',
        explicitRadiusMiles: m.explicitRadiusMiles,
        positiveGeographyText: m.positiveCounties,
        negativeGeographyText: [],
        positiveCountyFips: positives.sort(),
        negativeCountyFips: negatives.sort(),
        unknownCountyFips: stateCounties.filter((f) => !known.has(f)).sort(),
        reviewNotes: m.reviewNotes,
        secondCheckPass: m.secondCheckPass,
        scorableForPrecision: scorable,
        franchiseSafetyHold: m.franchiseSafetyHold,
      });
    }

    // Keep prior harvest non-duplicate scorable/interesting
    for (const h of harvestRecords) {
      if (merged.some((m) => m.providerId === h.providerId && m.sourceUrl === h.sourceUrl)) {
        continue;
      }
      merged.push(h);
    }

    const scorable = merged.filter((r) => r.scorableForPrecision);
    const withNeg = scorable.filter((r) => r.negativeCountyFips.length > 0);
    const flNeg = withNeg.filter((r) => r.stateCode === 'FL');
    const waNeg = withNeg.filter((r) => r.stateCode === 'WA');

    const refMap = new Map<string, ExpandedReferenceProvider>();
    for (const r of scorable) {
      refMap.set(r.providerId, {
        providerId: r.providerId,
        stateCode: r.stateCode,
        canonicalName: null,
        legalName: null,
        sourceUrl: r.sourceUrl,
        sourceType: 'provider_website',
        retrievedAt: r.retrievedAt,
        evidenceCompleteness:
          r.completenessClass === 'RADIUS_EXPLICIT'
            ? 'RADIUS_EXPLICIT'
            : r.completenessClass === 'EXHAUSTIVE_LIST' ||
                r.completenessClass === 'EXPLICIT_STATEWIDE'
              ? 'EXHAUSTIVE'
              : 'PARTIAL',
        positiveCountyFips: r.positiveCountyFips,
        negativeCountyFips: r.negativeCountyFips,
        unknownCountyFips: r.unknownCountyFips,
        originalPlaceStatements: [r.quotedStatement],
        explicitRadiusMiles: r.explicitRadiusMiles,
        explicitRegionText: null,
        identityConfidence: r.identityConfidence,
        evidenceQuality: 'HIGH',
        multiLocation: false,
        franchiseSafetyHold: r.franchiseSafetyHold,
        reviewNotes: r.reviewNotes,
        scorableForPrecision: r.scorableForPrecision,
      });
    }

    const precisionIds = [...refMap.entries()]
      .filter(([, r]) => r.negativeCountyFips.length > 0)
      .map(([id]) => id)
      .sort();
    const providerState = new Map(
      cohort.map((c) => [c.providerId, c.stateCode] as const)
    );
    const { calibration, holdout } =
      precisionIds.length >= 2
        ? splitCalibrationHoldout(precisionIds, providerState, 0.3)
        : { calibration: precisionIds, holdout: precisionIds };

    const modelSpecs = [
      { id: 'POWER_A', bands: POWER_MODELS.A, fixed: null as number | null },
      { id: 'POWER_B', bands: POWER_MODELS.B, fixed: null },
      { id: 'POWER_C', bands: POWER_MODELS.C, fixed: null },
      ...FIXED_RADIUS_BENCHMARKS.map((n) => ({
        id: `FIXED_${n}`,
        bands: null as typeof POWER_MODELS.A | null,
        fixed: n as number | null,
      })),
    ];

    const models: Record<string, unknown> = {};
    for (const spec of modelSpecs) {
      const run = (ids: string[]) =>
        evaluatePartialAware({
          providerIds: ids,
          refs: refMap,
          locations: locationMap,
          fleets,
          centroids,
          bands: spec.bands,
          fixedRadiusMiles: spec.fixed,
        });
      const hold = run(holdout);
      const holdB = run(holdout);
      const flH = holdout.filter((id) => providerState.get(id) === 'FL');
      const waH = holdout.filter((id) => providerState.get(id) === 'WA');
      const strip = (x: ReturnType<typeof run>) => {
        const { predictions, ...rest } = x;
        return rest;
      };
      models[spec.id] = {
        holdout: {
          combined: strip(hold),
          FL: strip(run(flH)),
          WA: strip(run(waH)),
        },
        determinism: {
          runA: shaPredictions(hold.predictions),
          runB: shaPredictions(holdB.predictions),
          match:
            shaPredictions(hold.predictions) ===
            shaPredictions(holdB.predictions),
        },
      };
    }

    const classCounts: Record<string, number> = {};
    for (const r of merged) {
      classCounts[r.completenessClass] =
        (classCounts[r.completenessClass] ?? 0) + 1;
    }

    const selected = {
      status: 'NOT_APPROVED' as const,
      model: null as string | null,
      hybrid: 'NOT_APPROVED' as const,
      fleetTheory: 'NO' as const,
      reasons: [
        `Precision-scorable providers with negatives: FL=${flNeg.length}, WA=${waNeg.length} (need >=15 each; preferred >=20)`,
        'Provider-owned websites in the verified cohort rarely publish exclusive/radius-defined pickup territories',
        'Do not lower the 0.90 precision gate; do not invent negatives from PARTIAL lists',
        'FIXED_40 remains the stronger simple hypothesis from 011C.1A partial-support metrics but is not precision-validated here',
      ],
      recommendation:
        'A. explicit-evidence-first local discovery with no general radius fallback until exhaustive corpus exists; optional B. narrow home-county (+adjacent) fallback as product policy — not a validated FIXED_40 approval',
    };

    const out = {
      google_places_requests: GOOGLE_PLACES_REQUESTS,
      task: '011C.1B',
      freeze: freeze.rows[0],
      waves: waves.rows,
      cohort: cohortSummary,
      operatingLocations: summarizeOperatingLocations(locations),
      fleet: summarizeFleet(fleets.values()),
      evidence: {
        providersReviewed: cohort.length,
        pagesDocumentsReviewed:
          'automated harvest ~473 page fetches + manual review of cohort provider-owned sites',
        yieldByClass: classCounts,
        scorableProviders: {
          fl: scorable.filter((r) => r.stateCode === 'FL').length,
          wa: scorable.filter((r) => r.stateCode === 'WA').length,
          total: scorable.length,
          withNegativesFl: flNeg.length,
          withNegativesWa: waNeg.length,
          withNegativesTotal: withNeg.length,
        },
        positiveCountyObservations: scorable.reduce(
          (n, r) => n + r.positiveCountyFips.length,
          0
        ),
        negativeCountyObservations: scorable.reduce(
          (n, r) => n + r.negativeCountyFips.length,
          0
        ),
        sourceYield: {
          provider_websites: merged.filter((r) =>
            String(r.sourceType).includes('provider')
          ).length,
          manual_second_check_passed: merged.filter((r) => r.secondCheckPass)
            .length,
          tariffs_filings: 0,
          note: 'WA UTC Tariff 15-C 55-mile local-rate definition is a rate rule, NOT per-carrier pickup territory — not used as RADIUS_EXPLICIT',
        },
        scalability: {
          scorableEvidenceRate: `${withNeg.length}/${cohort.length}`,
          manualReviewRequired: true,
          nationalFeasibility:
            'LOW for exhaustive/radius statements — most verified local movers do not publish exclusive territory or mile-radius pickup definitions on first-party sites. Semi-automation can triage candidates; semantic second-check remains mandatory.',
        },
      },
      fleetCorrelation: describeFleetCorrelation({
        refs: [...refMap.values()],
        fleets,
        locations: locationMap,
        centroids,
      }),
      split: {
        calibration: calibration.length,
        holdout: holdout.length,
        universe: precisionIds.length,
      },
      models,
      selected,
      semantics: {
        radiusControls: 'ORIGIN_PICKUP_DISCOVERY',
        stateAuthorityControls: 'LEGAL_INTRASTATE_DESTINATION_AUTHORITY',
        partialAbsenceIsUnknown: true,
        noCircularModelLabels: true,
      },
      publication_safety: {
        new_public_companies: 0,
        new_indexable: 0,
        county_edges_created: 0,
      },
    };

    mkdirSync(resolve('docs'), { recursive: true });
    writeFileSync(
      resolve('docs/task-011c1b-exhaustive-evidence-summary.json'),
      JSON.stringify(
        {
          google_places_requests: 0,
          cohort: cohortSummary,
          evidence: out.evidence,
          records: merged.filter(
            (r) =>
              r.secondCheckPass ||
              [
                'EXHAUSTIVE_LIST',
                'RADIUS_EXPLICIT',
                'EXPLICIT_STATEWIDE',
                'EXPLICIT_EXCLUSION',
                'PARTIAL',
                'REGION_EXPLICIT',
              ].includes(r.completenessClass)
          ),
        },
        null,
        2
      ) + '\n'
    );
    writeFileSync(
      resolve('docs/task-011c1b-model-rescore.json'),
      JSON.stringify(out, null, 2) + '\n'
    );
    writeFileSync(
      resolve('docs/task-011c1b-exhaustive-service-area-evidence.md'),
      `# Task 011C.1B — Exhaustive Service-Area Evidence

**Google Places API requests: 0**

**County edges created: 0**

## Status

**PARTIAL — CORPUS IMPROVED / MODEL STILL NOT APPROVED**

Precision-scorable providers with negatives: **FL=${flNeg.length}, WA=${waNeg.length}** (floor ≥15 each; preferred ≥20).

## Research cohort

FL **${cohortSummary.fl}** · WA **${cohortSummary.wa}** · total **${cohortSummary.total}**

## Key finding

Verified FL/WA movers rarely publish **exclusive** pickup territories or **mile-radius** origin definitions on provider-owned sites.

WA UTC Tariff 15-C “local = ≤55 miles” is a **rate classification**, not a carrier-specific service territory — **not** used as RADIUS_EXPLICIT.

## Manual second-check EXHAUSTIVE examples (FL)

- \`all-about-moving-tampa-bay\` — Pinellas + Hillsborough exhaustive list
- \`patriot-moving-and-storage\` — Palm Beach + Broward exhaustive service-areas section

These demonstrate the labeling pipeline works, but the sample is far too small for a general model gate.

## Fleet theory

**NO** — do not use power units as primary radius determinant (consistent with 011C.1A).

## Hybrid

**NOT APPROVED** pending larger exhaustive corpus.

## Recommendation

**A. Explicit-evidence-first local discovery** with **no general radius fallback** until a precision-scorable corpus exists.

Optional later product policy (not validated here): narrow **home-county / adjacent-county** fallback.

**Do not start Task 011C.2.**
`
    );

    console.log(
      JSON.stringify(
        {
          google_places_requests: 0,
          scorableWithNegatives: {
            fl: flNeg.length,
            wa: waNeg.length,
            total: withNeg.length,
          },
          selected: out.selected,
          freeze: out.freeze,
        },
        null,
        2
      )
    );
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
