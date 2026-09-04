import { assertWashingtonMoveSnapshot } from './snapshot';

export type WaProfileMatch = 'EXACT' | 'HIGH_CONFIDENCE' | 'REVIEW_REQUIRED' | 'UNRESOLVED' | 'NONE';

export type WaProfileEvidence = {
  match: WaProfileMatch;
  render: boolean;
  utcAuthorizedBadge: false;
  washingtonUnlicensedBadge: false;
};

export function selectWaMoveProfileEvidence(input: {
  usdot?: string | null;
  utcId?: string | null;
  legalName?: string | null;
  city?: string | null;
}): WaProfileEvidence {
  assertWashingtonMoveSnapshot();
  const empty: WaProfileEvidence = {
    match: 'NONE',
    render: false,
    utcAuthorizedBadge: false,
    washingtonUnlicensedBadge: false,
  };
  if (input.legalName && input.city) {
    return { ...empty, match: 'REVIEW_REQUIRED' };
  }
  if (input.legalName) {
    return { ...empty, match: 'UNRESOLVED' };
  }
  return empty;
}

export function utcPermitImpliesFmcsaInterstate(): boolean {
  return false;
}

export function fmcsaActiveImpliesUtcIntrastateAuthorized(): boolean {
  return false;
}

export function usdotImpliesInterstateOperatingAuthority(): boolean {
  return false;
}

export function ubiImpliesMoverAuthority(): boolean {
  return false;
}
