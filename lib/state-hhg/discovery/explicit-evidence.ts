/**
 * Load positive-only explicit service-area evidence from 011C artifacts.
 * Unmentioned counties remain UNKNOWN — no negative edges.
 */
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import type { ProviderLocalDiscoveryEvidence } from '@/lib/state-hhg/discovery/types';

type ExpandedProvider = {
  providerId: string;
  stateCode: 'FL' | 'WA';
  positiveCountyFips?: string[];
  evidenceQuality?: string;
  identityConfidence?: string;
  franchiseSafetyHold?: boolean;
  sourceUrl?: string | null;
  sourceType?: string;
  retrievedAt?: string;
  evidenceCompleteness?: string;
};

type ExhaustiveRecord = {
  providerId: string;
  stateCode: 'FL' | 'WA';
  positiveCountyFips?: string[];
  completenessClass?: string;
  secondCheckPass?: boolean;
  franchiseSafetyHold?: boolean;
  sourceUrl?: string;
  retrievedAt?: string;
};

export function loadExplicitPositiveDiscoveryEvidence(retrievedAt?: string): {
  evidence: ProviderLocalDiscoveryEvidence[];
  summary: {
    flProviders: number;
    waProviders: number;
    positiveCountyRelationships: number;
    byCompleteness: Record<string, number>;
  };
} {
  const at = retrievedAt ?? new Date().toISOString();
  const evidence: ProviderLocalDiscoveryEvidence[] = [];
  const byCompleteness: Record<string, number> = {};
  const providers = new Map<string, Set<string>>();

  const expandedPath = resolve(
    'docs/task-011c1a-reference-evidence-expanded.json'
  );
  if (existsSync(expandedPath)) {
    const json = JSON.parse(readFileSync(expandedPath, 'utf8')) as {
      providers?: ExpandedProvider[];
    };
    for (const p of json.providers ?? []) {
      if (p.franchiseSafetyHold) continue;
      if (p.evidenceQuality !== 'HIGH') continue;
      if (p.identityConfidence === 'UNRESOLVED') continue;
      // Home/operating-point rows are VERIFIED_HOME_COUNTY, not explicit service claims
      if (
        p.sourceType === 'home_county_operating_point' ||
        p.sourceType === 'regulator_physical'
      ) {
        continue;
      }
      const completeness = p.evidenceCompleteness ?? 'UNKNOWN';
      const basis =
        p.sourceType === 'curated_destination_assignment'
          ? ('CURATED_VERIFIED' as const)
          : ('EXPLICIT_SERVICE_AREA' as const);
      byCompleteness[completeness] = (byCompleteness[completeness] ?? 0) + 1;
      for (const fips of p.positiveCountyFips ?? []) {
        evidence.push({
          providerId: p.providerId,
          stateCode: p.stateCode,
          countyFips: fips,
          basis,
          evidenceSource: p.sourceType ?? '011c1a_expanded_reference',
          sourceUrl: p.sourceUrl ?? null,
          observedAt: p.retrievedAt ?? at,
          confidence: 'HIGH',
          verificationState: 'VERIFIED',
          consumerEligible: true,
          notes: [
            `completeness=${completeness}`,
            'PARTIAL/REGION positives prove mentioned counties only',
            'Unmentioned counties remain UNKNOWN',
          ],
        });
        const set = providers.get(`${p.stateCode}:${p.providerId}`) ?? new Set();
        set.add(fips);
        providers.set(`${p.stateCode}:${p.providerId}`, set);
      }
    }
  }

  const exhaustivePath = resolve(
    'docs/task-011c1b-exhaustive-evidence-summary.json'
  );
  if (existsSync(exhaustivePath)) {
    const json = JSON.parse(readFileSync(exhaustivePath, 'utf8')) as {
      records?: ExhaustiveRecord[];
    };
    for (const r of json.records ?? []) {
      if (!r.secondCheckPass || r.franchiseSafetyHold) continue;
      if (
        r.completenessClass !== 'EXHAUSTIVE_LIST' &&
        r.completenessClass !== 'RADIUS_EXPLICIT' &&
        r.completenessClass !== 'EXPLICIT_STATEWIDE'
      ) {
        // Still allow PARTIAL positives from 011C.1B manual set
        if (r.completenessClass !== 'PARTIAL' && r.completenessClass !== 'REGION_EXPLICIT') {
          continue;
        }
      }
      byCompleteness[r.completenessClass ?? 'UNKNOWN'] =
        (byCompleteness[r.completenessClass ?? 'UNKNOWN'] ?? 0) + 1;
      for (const fips of r.positiveCountyFips ?? []) {
        // Avoid duplicate provider/county pairs
        if (
          evidence.some(
            (e) =>
              e.providerId === r.providerId &&
              e.countyFips === fips &&
              e.basis === 'EXPLICIT_SERVICE_AREA'
          )
        ) {
          continue;
        }
        evidence.push({
          providerId: r.providerId,
          stateCode: r.stateCode,
          countyFips: fips,
          basis: 'EXPLICIT_SERVICE_AREA',
          evidenceSource: '011c1b_exhaustive_or_partial_positive',
          sourceUrl: r.sourceUrl ?? null,
          observedAt: r.retrievedAt ?? at,
          confidence: 'HIGH',
          verificationState: 'VERIFIED',
          consumerEligible: true,
          notes: [`completeness=${r.completenessClass}`],
        });
        const set = providers.get(`${r.stateCode}:${r.providerId}`) ?? new Set();
        set.add(fips);
        providers.set(`${r.stateCode}:${r.providerId}`, set);
      }
    }
  }

  const flProviders = [...providers.keys()].filter((k) => k.startsWith('FL:'))
    .length;
  const waProviders = [...providers.keys()].filter((k) => k.startsWith('WA:'))
    .length;

  return {
    evidence,
    summary: {
      flProviders,
      waProviders,
      positiveCountyRelationships: evidence.length,
      byCompleteness,
    },
  };
}
