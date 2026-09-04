import { assertTexasMoveSnapshot } from './snapshot';

export type TxProfileMatch = 'EXACT' | 'HIGH_CONFIDENCE' | 'REVIEW_REQUIRED' | 'UNRESOLVED' | 'NONE';

export type TxProfileEvidence = {
  match: TxProfileMatch;
  render: boolean;
  txdmvLicensedBadge: false;
  texasUnlicensedBadge: false;
};

export function selectTxMoveProfileEvidence(input: {
  usdot?: string | null;
  txdmvNumber?: string | null;
  legalName?: string | null;
  city?: string | null;
}): TxProfileEvidence {
  assertTexasMoveSnapshot();
  const empty: TxProfileEvidence = {
    match: 'NONE',
    render: false,
    txdmvLicensedBadge: false,
    texasUnlicensedBadge: false,
  };
  if (input.legalName && input.city) {
    return { ...empty, match: 'REVIEW_REQUIRED' };
  }
  if (input.legalName) {
    return { ...empty, match: 'UNRESOLVED' };
  }
  return empty;
}

export function txdmvCertificateImpliesFmcsaInterstate(): boolean {
  return false;
}

export function fmcsaActiveImpliesTexasIntrastateAuthorized(): boolean {
  return false;
}

export function usdotImpliesInterstateOperatingAuthority(): boolean {
  return false;
}
