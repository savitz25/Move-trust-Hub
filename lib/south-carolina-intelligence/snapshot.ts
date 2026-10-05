/** SC-MOVE-001: ORS Class E household-goods certificate workbook. */
import roster from './roster.json';

export type SouthCarolinaHhgCertificateRow = {
  crmGuid: string;
  providerCompany: string;
  dba: string;
  utilityType: string;
  filingType: string;
  filingStatus: string;
  certificateNumber: string;
  modifiedOn: string;
};

const rows = roster as SouthCarolinaHhgCertificateRow[];
const distinctCertificates = new Set(rows.map((row) => row.certificateNumber));
const distinctNames = new Set(rows.map((row) => row.providerCompany));

export const SOUTH_CAROLINA_HHG_ROSTER = rows;

export const SOUTH_CAROLINA_MOVE_SNAPSHOT = {
  regulator: 'South Carolina Office of Regulatory Staff and Public Service Commission',
  classEUrl: 'https://ors.sc.gov/regulated-utilities/transportation/class-e',
  workbookUrl: 'https://ors.sc.gov/sites/scors/files/Documents/Regulatory/transportation/Class%20E/Active_HHG_Certificates_20260804.xlsx',
  workbookFileName: 'Active_HHG_Certificates_20260804.xlsx',
  workbookSha256: 'e70dd08e3e5c61f65e2f791dc0f46c2c49248b34aa03b704508dd0ac4140c50b',
  workbookBytes: 34981,
  filenameDateToken: '2026-08-04',
  sheetName: 'Active HHG Certificates',
  sheetDataRows: 153,
  hiddenSheetCounted: false,
  hazWorkbookUrl: 'https://ors.sc.gov/sites/scors/files/Documents/Regulatory/transportation/Regulated%20HAZ%20Carriers%209-13-2024%204-30-33%20PM.xlsx',
  hazWorkbookParsed: false,
  classEHazRowsInThisWorkbook: 3,
  classEHazCertificates: ['8208', '9245', '8603'] as const,
  statute: 'S.C. Code Ann. § 58-23-10 et seq.',
  classRegulation: 'S.C. Code Ann. Regs. 103-114',
  tariffRegulation: 'S.C. Code Ann. Regs. 103-190',
  insuranceRegulation: 'S.C. Code Ann. Regs. 103-178',
  applicationUrl: 'https://www.psc.sc.gov/sites/psc/files/Documents/Forms/transprtation/Class%20E%20New-Amend-Reinstate%20Amended%202022-06-23.pdf',
  tariffSampleUrl: 'https://ors.sc.gov/sites/scors/files/Documents/Regulatory/transportation/Class%20E/Small%20Company%20Tariff%20Sample.pdf',
  pscUrl: 'https://www.psc.sc.gov/',
  docketUrl: 'https://dms.psc.sc.gov/',
  retrievedAt: '2026-10-05',
  generatedAt: '2026-10-05T18:40:00Z',
  hhgRoster: 'ACQUIRED',
  listingRows: rows.length,
  distinctCertificateNumbers: distinctCertificates.size,
  distinctCrmRecords: new Set(rows.map((row) => row.crmGuid)).size,
  distinctPrintedProviderNames: distinctNames.size,
  rowsPrintingDba: rows.filter((row) => row.dba.length > 0).length,
  filingStatusActive: rows.filter((row) => row.filingStatus === 'Active').length,
  crmModifiedOnMin: rows.reduce((min, row) => (row.modifiedOn < min ? row.modifiedOn : min), rows[0]?.modifiedOn ?? ''),
  crmModifiedOnMax: rows.reduce((max, row) => (row.modifiedOn > max ? row.modifiedOn : max), rows[0]?.modifiedOn ?? ''),
  repeatedCertificateNumber: '9774-A',
  addressPrinted: false,
  phonePrinted: false,
  usdotPrinted: false,
  mcPrinted: false,
  rowsWithPrintedUsdot: null,
  exactFederalBridges: null,
  providerInsuranceStatus: 'NOT_ACQUIRED',
  insuranceMinimumUsd: null,
  tariffCorpus: 'NOT_ACQUIRED',
  tariffSampleIsCarrierTariff: false,
  complaintCorpus: 'NOT_ACQUIRED',
  enforcementCorpus: 'NOT_ACQUIRED',
  docketCorpusUsedAsRoster: false,
  otherClassRosters: 'NOT_ACQUIRED',
  ucrRoster: 'NOT_ACQUIRED',
  newCanonicalOrganizations: 0,
  graphWrites: 0,
  claimEligibilityChanges: 0,
} as const;

export function lookupScHhgCertificate(raw: string): SouthCarolinaHhgCertificateRow[] {
  const certificate = raw.toUpperCase().replace(/\s+/g, '');
  if (!/^\d{3,5}(?:-[A-Z])?$/.test(certificate)) return [];
  return rows.filter((row) => row.certificateNumber.toUpperCase() === certificate);
}
