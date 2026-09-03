import { assertCaliforniaMoveSnapshot } from './snapshot';

export type CaProfileMatch = 'EXACT' | 'HIGH_CONFIDENCE' | 'REVIEW_REQUIRED' | 'UNRESOLVED' | 'NONE';

export type CaProfileEvidence = {
  match: CaProfileMatch;
  render: boolean;
  calTLicensedBadge: false;
  californiaUnlicensedBadge: false;
};

export function selectCaMoveProfileEvidence(input: {
  usdot?: string | null;
  calT?: string | null;
  legalName?: string | null;
  city?: string | null;
}): CaProfileEvidence {
  assertCaliforniaMoveSnapshot();
  const empty: CaProfileEvidence = {
    match: 'NONE',
    render: false,
    calTLicensedBadge: false,
    californiaUnlicensedBadge: false,
  };
  if (input.legalName && input.city) {
    return { ...empty, match: 'REVIEW_REQUIRED' };
  }
  if (input.legalName) {
    return { ...empty, match: 'UNRESOLVED' };
  }
  return empty;
}

export function calTImpliesFmcsaInterstate(): boolean {
  return false;
}

export function fmcsaActiveImpliesCaliforniaLicensed(): boolean {
  return false;
}
