/**
 * Task 011C.1B — exhaustive service-area evidence + model rescore.
 * No Google Places. No county-edge writes. No publication.
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
  discoverWebsiteViaDdg,
  harvestExhaustiveEvidence,
} from '@/lib/state-hhg/calibration/exhaustive-harvest';
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
import { isFranchiseOrNetworkBrandName } from '@/lib/state-hhg/normalize';

function toExpanded(rec: ExhaustiveEvidenceRecord): ExpandedReferenceProvider {
  return {
    providerId: rec.providerId,
    stateCode: rec.stateCode,
    canonicalName: null,
    legalName: null,
    sourceUrl: rec.sourceUrl,
    sourceType: 'provider_website',
    retrievedAt: rec.retrievedAt,
    evidenceCompleteness:
      rec.completenessClass === 'EXHAUSTIVE_LIST'
        ? 'EXHAUSTIVE'
        : rec.completenessClass === 'EXPLICIT_STATEWIDE'
          ? 'EXHAUSTIVE'
          : rec.completenessClass === 'RADIUS_EXPLICIT'
            ? 'RADIUS_EXPLICIT'
            : rec.completenessClass === 'REGION_EXPLICIT'
              ? 'REGION_EXPLICIT'
              : rec.completenessClass === 'PARTIAL'
                ? 'PARTIAL'
                : 'UNKNOWN_COMPLETENESS',
    positiveCountyFips: rec.positiveCountyFips,
    negativeCountyFips: rec.negativeCountyFips,
    unknownCountyFips: rec.unknownCountyFips,
    originalPlaceStatements: [
      rec.quotedStatement,
      ...rec.positiveGeographyText,
    ],
    explicitRadiusMiles: rec.explicitRadiusMiles,
    explicitRegionText: null,
    identityConfidence: rec.identityConfidence,
    evidenceQuality: rec.confidence === 'HIGH' ? 'HIGH' : 'MEDIUM',
    multiLocation: false,
    franchiseSafetyHold: rec.franchiseSafetyHold,
    reviewNotes: rec.reviewNotes,
    scorableForPrecision: rec.scorableForPrecision,
  };
}

async function main() {
  loadEnvFiles();
  const discover = !process.argv.includes('--skip-discovery');
  const maxDiscover = Number(
    process.argv.find((a) => a.startsWith('--discover-limit='))?.split('=')[1] ??
      40
  );

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
    const locations = await resolveOperatingLocations(cohort, { delayMs: 0 });
    const locationMap = new Map(locations.map((l) => [l.providerId, l]));
    let fleets = await loadFleetFromCompanies(client, cohort);
    fleets = await enrichFleetViaFmcsaApi(fleets, cohort, { delayMs: 200, limit: 3 });

    const siteRows = await client.query(
      `SELECT id, website, phone, name FROM companies WHERE id = ANY($1::text[])`,
      [cohort.map((c) => c.providerId)]
    );
    const websites = new Map(
      siteRows.rows.map((r) => [
        String(r.id),
        {
          website: r.website ? String(r.website).trim() : null,
          phone: r.phone ? String(r.phone) : null,
          name: r.name ? String(r.name) : null,
        },
      ])
    );

    // Discover missing official websites (non-Google)
    let discovered = 0;
    if (discover) {
      const missing = cohort
        .filter((m) => !websites.get(m.providerId)?.website)
        .filter(
          (m) =>
            !isFranchiseOrNetworkBrandName(m.legalName) &&
            !isFranchiseOrNetworkBrandName(m.canonicalName)
        )
        .sort((a, b) => a.stateCode.localeCompare(b.stateCode) || a.providerId.localeCompare(b.providerId));

      for (const m of missing.slice(0, maxDiscover)) {
        const q = `"${m.canonicalName || m.legalName}" ${m.stateCode === 'FL' ? 'Florida' : 'Washington'} moving company`;
        const url = await discoverWebsiteViaDdg(q);
        await new Promise((r) => setTimeout(r, 400));
        if (url) {
          const cur = websites.get(m.providerId) ?? {
            website: null,
            phone: null,
            name: null,
          };
          cur.website = url;
          websites.set(m.providerId, cur);
          discovered++;
          console.log(JSON.stringify({ discovered: m.providerId, url, google_places_requests: 0 }));
        }
      }
    }

    console.log(
      JSON.stringify({
        phase: 'harvest',
        websitesKnown: [...websites.values()].filter((w) => w.website).length,
        discovered,
        google_places_requests: 0,
      })
    );

    const harvest = await harvestExhaustiveEvidence({
      cohort,
      locations,
      websites,
      options: { delayMs: 180, maxProviders: 160 },
    });

    const scorable = harvest.records.filter((r) => r.scorableForPrecision);
    const scorableWithNegatives = scorable.filter(
      (r) => r.negativeCountyFips.length > 0
    );
    const flScorable = scorable.filter((r) => r.stateCode === 'FL');
    const waScorable = scorable.filter((r) => r.stateCode === 'WA');
    const flNeg = scorableWithNegatives.filter((r) => r.stateCode === 'FL');
    const waNeg = scorableWithNegatives.filter((r) => r.stateCode === 'WA');

    const evidenceSummary = {
      providersReviewed: harvest.providersReviewed,
      pagesReviewed: harvest.pagesReviewed,
      yieldByClass: harvest.yieldStats,
      scorableProviders: {
        fl: flScorable.length,
        wa: waScorable.length,
        total: scorable.length,
        withNegativesFl: flNeg.length,
        withNegativesWa: waNeg.length,
        withNegativesTotal: scorableWithNegatives.length,
      },
      positiveCountyObservations: scorable.reduce(
        (n, r) => n + r.positiveCountyFips.length,
        0
      ),
      negativeCountyObservations: scorable.reduce(
        (n, r) => n + r.negativeCountyFips.length,
        0
      ),
      sourceTypes: countBy(scorable.map((r) => r.sourceType)),
      franchiseExclusions: harvest.records.filter((r) => r.franchiseSafetyHold)
        .length,
      identityUnresolved: harvest.records.filter(
        (r) => r.identityConfidence === 'UNRESOLVED'
      ).length,
    };

    // Build refs for scoring — only scorableWithNegatives for precision gate;
    // include EXPLICIT_STATEWIDE in recall population via Expanded refs
    const refMap = new Map<string, ExpandedReferenceProvider>();
    for (const r of scorable) {
      // Prefer record with negatives if multiple
      const prev = refMap.get(r.providerId);
      if (!prev || r.negativeCountyFips.length > prev.negativeCountyFips.length) {
        refMap.set(r.providerId, toExpanded(r));
      }
    }

    const centroids = loadFlWaCountyCentroids();
    const fleetCorr = describeFleetCorrelation({
      refs: [...refMap.values()],
      fleets,
      locations: locationMap,
      centroids,
    });

    const precisionIds = [...refMap.entries()]
      .filter(([, r]) => r.scorableForPrecision && r.negativeCountyFips.length > 0)
      .map(([id]) => id)
      .sort();
    const allScorableIds = [...refMap.keys()].sort();

    const providerState = new Map(
      cohort.map((c) => [c.providerId, c.stateCode] as const)
    );

    // Prefer split on providers with negatives; fall back to all scorable
    const splitIds =
      precisionIds.length >= 10 ? precisionIds : allScorableIds;
    const { calibration, holdout } = splitCalibrationHoldout(
      splitIds,
      providerState,
      0.3
    );

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
      const flH = holdout.filter((id) => providerState.get(id) === 'FL');
      const waH = holdout.filter((id) => providerState.get(id) === 'WA');
      const hold = run(holdout);
      const holdB = run(holdout);
      const { predictions: _p, ...holdClean } = hold;
      const { predictions: _p2, ...flClean } = run(flH);
      const { predictions: _p3, ...waClean } = run(waH);
      models[spec.id] = {
        holdout: { combined: holdClean, FL: flClean, WA: waClean },
        determinism: {
          runA: shaPredictions(hold.predictions),
          runB: shaPredictions(holdB.predictions),
          match:
            shaPredictions(hold.predictions) ===
            shaPredictions(holdB.predictions),
        },
      };
    }

    // Hybrid architecture evaluation (explicit wins conceptually; score fallback only)
    const hybridNote =
      'HYBRID_EXPLICIT_PLUS_DERIVED: explicit/exhaustive evidence wins; derived fallback candidate is FIXED_40 based on 011C.1A — not auto-approved without precision gate.';

    const gate = {
      flScorable: flNeg.length,
      waScorable: waNeg.length,
      minFl: 15,
      minWa: 15,
      preferredFl: 20,
      preferredWa: 20,
    };

    let selected: {
      status: 'APPROVED' | 'NOT_APPROVED';
      model: string | null;
      hybrid: 'APPROVED' | 'NOT_APPROVED';
      fleetTheory: 'YES' | 'NO' | 'INCONCLUSIVE';
      reasons: string[];
    } = {
      status: 'NOT_APPROVED',
      model: null,
      hybrid: 'NOT_APPROVED',
      fleetTheory: 'INCONCLUSIVE',
      reasons: [],
    };

    if (flNeg.length < 15 || waNeg.length < 15) {
      selected.reasons.push(
        `Precision-scorable providers with negatives below floor (FL=${flNeg.length}, WA=${waNeg.length}; need >=15 each)`
      );
    }

    // Fleet theory: compare POWER_A vs FIXED_40 on holdout when scorable
    const powerA = models.POWER_A as any;
    const fixed40 = models.FIXED_40 as any;
    if (
      powerA?.holdout?.combined?.precision != null &&
      fixed40?.holdout?.combined?.precision != null
    ) {
      const pImprove =
        (powerA.holdout.combined.precision ?? 0) -
        (fixed40.holdout.combined.precision ?? 0);
      const rImprove =
        (powerA.holdout.combined.recall ?? 0) -
        (fixed40.holdout.combined.recall ?? 0);
      selected.fleetTheory =
        pImprove > 0.03 || rImprove > 0.05
          ? 'YES'
          : pImprove < -0.02 && rImprove < 0
            ? 'NO'
            : 'INCONCLUSIVE';
    } else if (/WEAK/.test(fleetCorr.interpretation)) {
      selected.fleetTheory = 'NO';
    }

    if (flNeg.length >= 15 && waNeg.length >= 15) {
      const order = ['FIXED_40', 'FIXED_25', 'FIXED_50', 'POWER_B', 'POWER_C', 'POWER_A'];
      for (const id of order) {
        const block = models[id] as any;
        const p = block?.holdout?.combined?.precision;
        const r = block?.holdout?.combined?.recall ?? 0;
        const exh = block?.holdout?.combined?.exhaustivePopulation ?? 0;
        if (
          exh >= 8 &&
          p != null &&
          p >= 0.9 &&
          r >= 0.65 &&
          block.determinism.match
        ) {
          selected.status = 'APPROVED';
          selected.model = id;
          selected.hybrid =
            id.startsWith('FIXED_') ? 'APPROVED' : 'NOT_APPROVED';
          selected.reasons.push(
            `Holdout precision=${p.toFixed(3)} recall=${r.toFixed(3)} exhaustiveN=${exh}`
          );
          break;
        }
      }
      if (selected.status === 'NOT_APPROVED') {
        selected.reasons.push(
          'No model met precision>=0.90 and recall>=0.65 on precision-scorable holdout'
        );
      }
    }

    return {
      google_places_requests: GOOGLE_PLACES_REQUESTS,
      task: '011C.1B',
      freeze: freeze.rows[0],
      waves: waves.rows,
      cohort: cohortSummary,
      operatingLocations: summarizeOperatingLocations(locations),
      fleet: summarizeFleet(fleets.values()),
      discovery: { discoveredWebsiteCount: discovered, nonGoogle: true },
      evidence: evidenceSummary,
      fleetCorrelation: fleetCorr,
      gate,
      split: {
        calibration: calibration.length,
        holdout: holdout.length,
        splitUniverse: splitIds.length,
      },
      models,
      hybridNote,
      selected,
      semantics: {
        radiusControls: 'ORIGIN_PICKUP_DISCOVERY',
        stateAuthorityControls: 'LEGAL_INTRASTATE_DESTINATION_AUTHORITY',
        noCircularLabels: true,
        partialAbsenceIsUnknown: true,
      },
      publication_safety: {
        new_public_companies: 0,
        new_indexable: 0,
        county_edges_created: 0,
      },
      evidenceRecords: harvest.records,
    };
  });

  mkdirSync(resolve('docs'), { recursive: true });
  writeFileSync(
    resolve('docs/task-011c1b-exhaustive-evidence-summary.json'),
    JSON.stringify(
      {
        google_places_requests: 0,
        cohort: result.cohort,
        evidence: result.evidence,
        discovery: result.discovery,
        records: result.evidenceRecords.filter(
          (r) =>
            r.scorableForPrecision ||
            ['EXHAUSTIVE_LIST', 'RADIUS_EXPLICIT', 'EXPLICIT_STATEWIDE', 'EXPLICIT_EXCLUSION'].includes(
              r.completenessClass
            )
        ),
      },
      null,
      2
    ) + '\n'
  );

  const { evidenceRecords: _e, ...rescore } = result;
  writeFileSync(
    resolve('docs/task-011c1b-model-rescore.json'),
    JSON.stringify(rescore, null, 2) + '\n'
  );
  writeFileSync(
    resolve('docs/task-011c1b-exhaustive-service-area-evidence.md'),
    renderMd(result)
  );

  console.log(
    JSON.stringify(
      {
        google_places_requests: 0,
        evidence: result.evidence,
        selected: result.selected,
        split: result.split,
        fleetTheory: result.selected.fleetTheory,
      },
      null,
      2
    )
  );
}

function countBy(arr: string[]): Record<string, number> {
  const o: Record<string, number> = {};
  for (const x of arr) o[x] = (o[x] ?? 0) + 1;
  return o;
}

function renderMd(r: any): string {
  const e = r.evidence;
  const s = r.selected;
  return `# Task 011C.1B — Exhaustive Service-Area Evidence

**Google Places API requests: 0**

**County edges created: 0**

## Status

**${s.status === 'APPROVED' ? 'MODEL APPROVED' : 'MODEL STILL NOT APPROVED'}**

${(s.reasons as string[]).map((x: string) => `- ${x}`).join('\n')}

Fleet theory improves over fixed radius: **${s.fleetTheory}**

Hybrid explicit+derived: **${s.hybrid}**

## Research cohort

| State | Providers |
|-------|----------:|
| FL | ${r.cohort.fl} |
| WA | ${r.cohort.wa} |
| Total | ${r.cohort.total} |

## Evidence yield

- Providers reviewed: ${e.providersReviewed}
- Pages/documents reviewed: ${e.pagesReviewed}
- Class counts: ${JSON.stringify(e.yieldByClass)}

### Precision-scorable (with negatives)

| State | Scorable w/ negatives |
|-------|----------------------:|
| FL | ${e.scorableProviders.withNegativesFl} |
| WA | ${e.scorableProviders.withNegativesWa} |
| Total | ${e.scorableProviders.withNegativesTotal} |

- Positive county observations (scorable): ${e.positiveCountyObservations}
- Negative county observations (scorable): ${e.negativeCountyObservations}

## Semantics

- Unmentioned on PARTIAL = UNKNOWN (not negative)
- Ground truth never from POWER_*/FIXED_* predictions
- Radius controls ORIGIN/PICKUP; state authority controls legal destination

## Next

${
  s.status === 'APPROVED'
    ? 'Task 011C.2 is UNBLOCKED — do not start automatically.'
    : 'Do **not** keep endlessly tuning radius bands. Prefer explicit-evidence-first local discovery; optional narrow home-county/adjacent fallback only after product decision. 011C.2 remains BLOCKED.'
}
`;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
