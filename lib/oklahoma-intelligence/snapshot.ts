/** OK-MOVE-001: OCC intrastate household-goods certificate. The posted list is not a current census. */
import roster from './roster.json';

export type OklahomaHhgRow = {
  pin: string;
  legalName: string;
  dba: string;
  usdotPrinted: string;
};

const rows = roster as OklahomaHhgRow[];

export function lookupOkHhgPin(pin: string): OklahomaHhgRow | null {
  return rows.find((row) => row.pin === pin) ?? null;
}

export const OKLAHOMA_MOVE_SNAPSHOT = {
  regulator: 'Oklahoma Corporation Commission, Transportation Division',
  listUrl: 'https://oklahoma.gov/content/dam/ok/en/occ/documents/tr/motor-carrier-lists/household-goods-mc.pdf',
  faqUrl: 'https://oklahoma.gov/occ/divisions/transportation/household-goods-movers.html',
  listSha256: '4c76993c1255cda10e899be7042fff9519e69c45487a2547622129d7b613e450',
  listDated: '2023-11-27',
  retrievedAt: '2026-10-06',
  generatedAt: '2026-10-06T16:20:00Z',
  faqPageLastModified: '2026-07-29',
  hhgAuthorityVerification: 'KNOWN',
  currentRoster: 'NOT_ACQUIRED',
  postedListRows: rows.length,
  distinctPins: new Set(rows.map((row) => row.pin)).size,
  rowsWithPrintedUsdot: rows.filter((row) => row.usdotPrinted).length,
  distinctPrintedUsdots: new Set(rows.map((row) => row.usdotPrinted)).size,
  rowsWithPrintedMc: null,
  exactFederalBridges: null,
  postedListIsCurrentCensus: false,
  certificateTerm: 'ONE_YEAR_INITIAL',
  identificationStampUsd: 7,
  insuranceDollarMinima: 'NOT_ACQUIRED',
  providerInsuranceStatus: 'NOT_ACQUIRED',
  tariffCorpus: 'NOT_ACQUIRED',
  providerComplaintRows: 'NOT_ACQUIRED',
  providerEnforcementRows: 'NOT_ACQUIRED',
  otherMotorCarrierLists: 'NOT_PARSED',
  newCanonicalOrganizations: 0,
  graphWrites: 0,
  claimEligibilityChanges: 0,
} as const;
