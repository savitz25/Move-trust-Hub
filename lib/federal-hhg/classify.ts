import { docketPrefix, normalizeMc, normalizeUsdot } from '@/lib/federal-hhg/normalize';

export const FEDERAL_HHG_CLASSIFICATIONS = [
  'HHG_CARRIER',
  'HHG_BROKER',
  'HHG_CARRIER_BROKER',
  'NOT_HHG',
  'INACTIVE',
  'REVIEW_REQUIRED',
] as const;

export type FederalHhgClassification = (typeof FEDERAL_HHG_CLASSIFICATIONS)[number];

export type LiAuthorityRow = {
  dotNumber: string;
  docketNumber: string;
  legalName: string;
  dbaName: string | null;
  hhgChk: string;
  propertyChk: string;
  commonStat: string;
  contractStat: string;
  brokerStat: string;
};

export type FederalHhgClassificationResult = {
  classification: FederalHhgClassification;
  hhgCarrierVerified: boolean;
  hhgBrokerVerified: boolean;
  usdot: string;
  mc: string | null;
};

function flag(value: string | null | undefined): string {
  return (value ?? 'N').trim().toUpperCase();
}

function isActive(value: string | null | undefined): boolean {
  return flag(value) === 'A';
}

function isInactive(value: string | null | undefined): boolean {
  return flag(value) === 'I';
}

/**
 * L&I semantics (FMCSA Licensing & Insurance carrier file):
 * - hhg_chk=Y means the docket is authorized for household goods, not merely cargo self-report.
 * - common_stat/contract_stat A = active motor-carrier operating authority.
 * - broker_stat A = active broker authority.
 * - property_chk=Y without hhg_chk=Y is generic freight, not consumer HHG.
 * - Status I = inactive/historical; N = none.
 */
export function classifyFederalHhg(row: LiAuthorityRow): FederalHhgClassificationResult {
  const usdot = normalizeUsdot(row.dotNumber);
  const mc = docketPrefix(row.docketNumber) === 'MC' ? normalizeMc(row.docketNumber) : null;
  const hhg = flag(row.hhgChk) === 'Y';
  const carrier = isActive(row.commonStat) || isActive(row.contractStat);
  const broker = isActive(row.brokerStat);

  if (!hhg) {
    return {
      classification: 'NOT_HHG',
      hhgCarrierVerified: false,
      hhgBrokerVerified: false,
      usdot,
      mc,
    };
  }

  if (carrier && broker) {
    return {
      classification: 'HHG_CARRIER_BROKER',
      hhgCarrierVerified: true,
      hhgBrokerVerified: true,
      usdot,
      mc,
    };
  }
  if (carrier) {
    return {
      classification: 'HHG_CARRIER',
      hhgCarrierVerified: true,
      hhgBrokerVerified: false,
      usdot,
      mc,
    };
  }
  if (broker) {
    return {
      classification: 'HHG_BROKER',
      hhgCarrierVerified: false,
      hhgBrokerVerified: true,
      usdot,
      mc,
    };
  }
  if (isInactive(row.commonStat) || isInactive(row.contractStat) || isInactive(row.brokerStat)) {
    return {
      classification: 'INACTIVE',
      hhgCarrierVerified: false,
      hhgBrokerVerified: false,
      usdot,
      mc,
    };
  }
  return {
    classification: 'INACTIVE',
    hhgCarrierVerified: false,
    hhgBrokerVerified: false,
    usdot,
    mc,
  };
}

/** Collapse multiple L&I dockets for one USDOT. MC HHG dockets win over FF. */
export function classifyFederalHhgDockets(
  rows: readonly LiAuthorityRow[]
): FederalHhgClassificationResult {
  if (!rows.length) {
    return {
      classification: 'REVIEW_REQUIRED',
      hhgCarrierVerified: false,
      hhgBrokerVerified: false,
      usdot: '',
      mc: null,
    };
  }
  const usdot = normalizeUsdot(rows[0]!.dotNumber);
  const mcRows = rows.filter((row) => docketPrefix(row.docketNumber) === 'MC');
  const considered = mcRows.length ? mcRows : rows;
  let hhgCarrier = false;
  let hhgBroker = false;
  let anyHhg = false;
  let anyInactiveHhg = false;
  let mc: string | null = null;

  for (const row of considered) {
    const classified = classifyFederalHhg(row);
    if (classified.mc && !mc) mc = classified.mc;
    if (flag(row.hhgChk) !== 'Y') continue;
    anyHhg = true;
    if (classified.hhgCarrierVerified) hhgCarrier = true;
    if (classified.hhgBrokerVerified) hhgBroker = true;
    if (classified.classification === 'INACTIVE') anyInactiveHhg = true;
  }

  if (hhgCarrier && hhgBroker) {
    return {
      classification: 'HHG_CARRIER_BROKER',
      hhgCarrierVerified: true,
      hhgBrokerVerified: true,
      usdot,
      mc,
    };
  }
  if (hhgCarrier) {
    return {
      classification: 'HHG_CARRIER',
      hhgCarrierVerified: true,
      hhgBrokerVerified: false,
      usdot,
      mc,
    };
  }
  if (hhgBroker) {
    return {
      classification: 'HHG_BROKER',
      hhgCarrierVerified: false,
      hhgBrokerVerified: true,
      usdot,
      mc,
    };
  }
  if (anyHhg && anyInactiveHhg) {
    return {
      classification: 'INACTIVE',
      hhgCarrierVerified: false,
      hhgBrokerVerified: false,
      usdot,
      mc,
    };
  }
  if (anyHhg) {
    return {
      classification: 'INACTIVE',
      hhgCarrierVerified: false,
      hhgBrokerVerified: false,
      usdot,
      mc,
    };
  }
  return {
    classification: 'NOT_HHG',
    hhgCarrierVerified: false,
    hhgBrokerVerified: false,
    usdot,
    mc,
  };
}
