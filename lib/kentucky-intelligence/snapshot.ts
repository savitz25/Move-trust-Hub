/** KY-MOVE-001: KYTC intrastate household-goods certificate listing. */
import roster from './roster.json';

export type KentuckyHhgCertificateRow = {
  certificateNumber: string;
  phone: string;
  email: string;
  legalName: string;
  dba: string;
  physicalAddress: string;
  mailingAddress: string;
};

const rows = roster as KentuckyHhgCertificateRow[];

function addressState(address: string): string | null {
  return address.match(/,\s*([A-Z]{2})\s+\d{5}\b/)?.[1] ?? null;
}

function countStates(field: 'physicalAddress' | 'mailingAddress'): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const row of rows) {
    const state = addressState(row[field]) ?? 'UNKNOWN';
    counts[state] = (counts[state] ?? 0) + 1;
  }
  return counts;
}

const physicalAddressStates = countStates('physicalAddress');
const distinctCertificates = new Set(rows.map((row) => row.certificateNumber));

export const KENTUCKY_HHG_ROSTER = rows;

export const KENTUCKY_MOVE_SNAPSHOT = {
  regulator: 'Kentucky Transportation Cabinet, Department of Vehicle Regulation, Division of Motor Carriers',
  householdGoodsUrl: 'https://drive.ky.gov/Motor-Carriers/Pages/Household-Goods.aspx',
  listingUrl: 'https://drive.ky.gov/Motor-Carriers/Documents/HHGCarrierListing-09-26.pdf',
  portalUrl: 'https://apps.transportation.ky.gov/MotorCarrierPortal/',
  annualReportFormUrl: 'https://transportation.ky.gov/Organizational-Resources/Forms/TC%2095-44.pdf',
  complaintFormUrl: 'https://transportation.ky.gov/Organizational-Resources/Forms/TC%2095-622.pdf',
  complaintEmail: 'kytc.mccomplaints@ky.gov',
  statuteCertificate: 'KRS 281.630',
  statuteStandards: 'KRS 281.624',
  statuteLiability: 'KRS 281.655',
  listingTitle: 'HHG Carrier Listing',
  listingFooterDate: '2026-09-01',
  pdfSha256: '2c6be1bafd1019b621675f38ee3054496a66f8ad21d8fa1b8e7ddc51300aa0da',
  priorListingUrl: 'https://drive.ky.gov/Motor-Carriers/Documents/HouseholdGoodsCarriers11-1-23.pdf',
  priorListingDate: '2023-11-01',
  priorListingUsedAsPopulation: false,
  retrievedAt: '2026-10-05',
  generatedAt: '2026-10-05T22:40:00Z',
  hhgAuthorityVerification: 'KNOWN',
  hhgRoster: 'ACQUIRED',
  listingRows: rows.length,
  distinctCertificateNumbers: distinctCertificates.size,
  statusPrinted: false,
  dmtOrDvrFieldPrinted: false,
  usdotPrinted: false,
  mcPrinted: false,
  physicalAddressInKentucky: physicalAddressStates.KY ?? 0,
  physicalAddressOutsideKentucky: rows.length - (physicalAddressStates.KY ?? 0),
  physicalAddressStates,
  mailingAddressStates: countStates('mailingAddress'),
  rowsWithPrintedUsdot: null,
  distinctPrintedUsdots: null,
  rowsWithPrintedMc: null,
  distinctPrintedMcs: null,
  exactFederalBridges: null,
  providerInsuranceStatus: 'NOT_ACQUIRED',
  cargoMinimumUsd: null,
  declaredValueBaseRate: 'FAQ $.60 per pound per article; source says this is not insurance',
  tariffRequirement: 'KNOWN',
  tariffCorpus: 'NOT_ACQUIRED',
  annualReportForm: 'TC 95-44',
  annualReportFilings: 'NOT_ACQUIRED',
  complaintIntake: 'KNOWN',
  providerComplaintRows: 'NOT_ACQUIRED',
  complaintOutcomes: 'NOT_ACQUIRED',
  enforcementCorpus: 'NOT_ACQUIRED',
  otherMotorCarrierRosters: 'NOT_ACQUIRED',
  ucrRoster: 'NOT_ACQUIRED',
  newCanonicalOrganizations: 0,
  graphWrites: 0,
  claimEligibilityChanges: 0,
} as const;

export function lookupKyHhgCertificate(raw: string): KentuckyHhgCertificateRow | null {
  const certificate = raw.toUpperCase().replace(/\s+/g, '');
  if (!/^C\d{5}$/.test(certificate)) return null;
  return rows.find((row) => row.certificateNumber === certificate) ?? null;
}
