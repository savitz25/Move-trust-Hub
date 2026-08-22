/**
 * FL-011E — read-only canonicalization QA and coverage recompute.
 * Production writes: 0. Google Places: 0.
 */
import { isAnonymousCompanyNotFound } from '@/lib/provider/anonymous-company-route';
import { isConsumerVisibleCompany, isSeoIndexableCompany } from '@/lib/provider/publication';
import { shouldRenderFloridaStateWaveChrome } from '@/lib/state-hhg/fl/wave-1';
import {
  FL_011C_DRAFT_HASH,
  FL_011D_EXPECTED_INSERT,
  FL_011D_EXPECTED_LINK,
  FL_011D_EXPECTED_TOTAL,
  FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1,
  hashFinalManifest,
  type FinalCanonicalizationOp,
} from '@/lib/state-hhg/fl/wave-011d';

export const FL_011E_GOOGLE_PLACES_REQUESTS = 0 as const;
export const FL_011E_PRODUCTION_WRITES = 0 as const;
export const FL_011E_TASK = 'FL-011E' as const;
export const FL_011D_MANIFEST_HASH = '85a137ecd1a86d6f' as const;
export const FL_011B_WAVE2_DRAFT_HASH = 'a5d15f3dca32a59a' as const;
export const FL_011B_READY_POOL_HISTORICAL = 720 as const;
export const FL_011C_GAP_HISTORICAL = 281 as const;
export const FL_011C_WITHHELD_HISTORICAL = 168 as const;

export const AUDIT_STATES = [
  'PASS',
  'IDENTITY_DRIFT',
  'STATUS_DRIFT',
  'AUTHORITY_DRIFT',
  'CANONICAL_DRIFT',
  'REVIEW_REQUIRED',
] as const;
export type AuditState = (typeof AUDIT_STATES)[number];

export const COVERAGE_CLASSES = [
  'WAVE1_PUBLISHABLE',
  'KEEP80',
  'NEW_FL011D_INTERNAL',
  'WAVE2_READY_INTERNAL',
  'PUBLIC_CANONICAL_WITH_FDACS',
  'INTERNAL_CANONICAL_WITH_FDACS',
  'CORPORATE_FAMILY_REVIEW',
  'POSSIBLE_DUPLICATE',
  'CONFLICT',
  'STATUS_BLOCKED',
  'OTHER_UNRESOLVED',
] as const;
export type CoverageClass = (typeof COVERAGE_CLASSES)[number];

export const RESOLVED_WAVE2_CLASSES = [
  'ALREADY_PUBLIC_NO_WAVE_NEEDED',
  'NEWLY_WAVE2_READY',
  'INTERNAL_BUT_NOT_WAVE2_READY',
  'OTHER',
] as const;
export type ResolvedWave2Class = (typeof RESOLVED_WAVE2_CLASSES)[number];

export type CoverageAssignmentInput = {
  fdacsIm: string;
  wave1Im: boolean;
  keep80Company: boolean;
  fl011dInsert: boolean;
  hasCurrentPsaOnCompany: boolean;
  consumerVisible: boolean;
  ingested: boolean;
  wave2Ready: boolean;
  gapClass:
    | 'CORPORATE_FAMILY_REVIEW'
    | 'POSSIBLE_DUPLICATE'
    | 'CONFLICT'
    | 'SOURCE_STATUS_BLOCKED'
    | 'REVIEW_REQUIRED'
    | 'EXISTING_CANONICAL_LINK_READY'
    | 'NEW_CANONICAL_COMPANY_READY'
    | null;
};

export function assignPrimaryCoverage(input: CoverageAssignmentInput): CoverageClass {
  if (input.wave1Im) return 'WAVE1_PUBLISHABLE';
  if (input.keep80Company && input.hasCurrentPsaOnCompany) return 'KEEP80';
  if (input.fl011dInsert && input.hasCurrentPsaOnCompany) return 'NEW_FL011D_INTERNAL';
  if (input.hasCurrentPsaOnCompany && input.consumerVisible) return 'PUBLIC_CANONICAL_WITH_FDACS';
  if (input.hasCurrentPsaOnCompany && input.ingested && input.wave2Ready) return 'WAVE2_READY_INTERNAL';
  if (input.hasCurrentPsaOnCompany) return 'INTERNAL_CANONICAL_WITH_FDACS';
  if (input.gapClass === 'CORPORATE_FAMILY_REVIEW') return 'CORPORATE_FAMILY_REVIEW';
  if (input.gapClass === 'POSSIBLE_DUPLICATE') return 'POSSIBLE_DUPLICATE';
  if (input.gapClass === 'CONFLICT') return 'CONFLICT';
  if (input.gapClass === 'SOURCE_STATUS_BLOCKED') return 'STATUS_BLOCKED';
  return 'OTHER_UNRESOLVED';
}

export function isSafelyRepresented(cls: CoverageClass): boolean {
  return (
    cls === 'WAVE1_PUBLISHABLE' ||
    cls === 'KEEP80' ||
    cls === 'NEW_FL011D_INTERNAL' ||
    cls === 'WAVE2_READY_INTERNAL' ||
    cls === 'PUBLIC_CANONICAL_WITH_FDACS' ||
    cls === 'INTERNAL_CANONICAL_WITH_FDACS'
  );
}

export function classifyResolvedForWave2(input: {
  op: 'LINK_EXISTING_CANONICAL' | 'INSERT_NEW_CANONICAL';
  consumerVisible: boolean;
  wave2Ready: boolean;
}): ResolvedWave2Class {
  if (input.consumerVisible) return 'ALREADY_PUBLIC_NO_WAVE_NEEDED';
  if (input.wave2Ready) return 'NEWLY_WAVE2_READY';
  if (input.op === 'INSERT_NEW_CANONICAL') return 'INTERNAL_BUT_NOT_WAVE2_READY';
  return 'OTHER';
}

export function assertFl011dManifest(ops: readonly FinalCanonicalizationOp[], hash: string): {
  link: number;
  insert: number;
  total: number;
} {
  const link = ops.filter((o) => o.op === 'LINK_EXISTING_CANONICAL').length;
  const insert = ops.filter((o) => o.op === 'INSERT_NEW_CANONICAL').length;
  if (ops.length !== FL_011D_EXPECTED_TOTAL) {
    throw new Error(`REFUSAL — manifest total ${ops.length} != ${FL_011D_EXPECTED_TOTAL}`);
  }
  if (link !== FL_011D_EXPECTED_LINK || insert !== FL_011D_EXPECTED_INSERT) {
    throw new Error(`REFUSAL — split ${link}/${insert}`);
  }
  if (hash !== FL_011D_MANIFEST_HASH) {
    throw new Error(`REFUSAL — manifest hash ${hash} != ${FL_011D_MANIFEST_HASH}`);
  }
  if (hashFinalManifest(ops) !== hash) {
    throw new Error('REFUSAL — recomputed hash mismatch');
  }
  return { link, insert, total: ops.length };
}

export function coverageMetric(active: number, represented: number): {
  represented: number;
  unresolved: number;
  percentage: number;
} {
  const unresolved = active - represented;
  const percentage = active === 0 ? 0 : Math.round((represented / active) * 1000) / 10;
  return { represented, unresolved, percentage };
}

export function newCompanyInternalContract(company: {
  publicationState: string | null;
  indexable: boolean;
}): { ingested: boolean; indexableFalse: boolean; anonymous404: boolean; directoryHidden: boolean } {
  const ingested = company.publicationState === 'INGESTED';
  const indexableFalse = company.indexable === false;
  const row = { publicationState: company.publicationState as 'INGESTED', indexable: company.indexable };
  return {
    ingested,
    indexableFalse,
    anonymous404: isAnonymousCompanyNotFound(row),
    directoryHidden: !isConsumerVisibleCompany(row) && !isSeoIndexableCompany(row),
  };
}

export function publicFdacsDisplayAllowed(company: {
  id: string;
  publicationState?: string | null;
}): boolean {
  return shouldRenderFloridaStateWaveChrome({
    id: company.id,
    publicationState: company.publicationState,
  });
}

export function doNotUseArithmeticShortcut(historicalReady: number, resolved113: number): number {
  return historicalReady + resolved113;
}

export {
  FL_011C_DRAFT_HASH,
  FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1,
};
