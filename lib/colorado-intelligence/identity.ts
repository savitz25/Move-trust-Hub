import { assertColoradoMoveSnapshot } from './snapshot';

export type CoProfileMatch = 'EXACT' | 'HIGH_CONFIDENCE' | 'REVIEW_REQUIRED' | 'UNRESOLVED' | 'NONE';

export type CoProfileEvidence = {
  match: CoProfileMatch;
  render: boolean;
  pucAuthorizedBadge: false;
  coloradoUnlicensedBadge: false;
};

export function selectCoMoveProfileEvidence(input: {
  usdot?: string | null;
  hhgPermit?: string | null;
  legalName?: string | null;
  city?: string | null;
}): CoProfileEvidence {
  assertColoradoMoveSnapshot();
  const empty: CoProfileEvidence = {
    match: 'NONE',
    render: false,
    pucAuthorizedBadge: false,
    coloradoUnlicensedBadge: false,
  };
  if (input.hhgPermit && input.usdot) {
    return { ...empty, match: 'REVIEW_REQUIRED' };
  }
  if (input.legalName && input.city) {
    return { ...empty, match: 'REVIEW_REQUIRED' };
  }
  if (input.legalName) {
    return { ...empty, match: 'UNRESOLVED' };
  }
  return empty;
}

export function hhgPermitImpliesFmcsaInterstate(): boolean {
  return false;
}

export function fmcsaActiveImpliesColoradoIntrastateAuthorized(): boolean {
  return false;
}

export function usdotImpliesInterstateOperatingAuthority(): boolean {
  return false;
}

export function usdotImpliesColoradoHhgPermit(): boolean {
  return false;
}

export function mcPresenceImpliesActiveAuthority(): boolean {
  return false;
}
