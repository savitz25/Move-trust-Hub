import rows from '../../data/nebraska/ne-move-001/psc-hhg-licensees.json';

export type NebraskaHhgLicensee = {
  name: string;
  dba: string;
  location: string;
  effectiveDate: string;
  license: string;
};

export const NEBRASKA_HHG_LICENSEES = rows as readonly NebraskaHhgLicensee[];

export function lookupNeHhgLicense(raw: string): NebraskaHhgLicensee | null {
  const match = raw.toUpperCase().match(/ML-0*(\d{1,3})\b/);
  if (!match) return null;
  const license = `ML-${String(Number(match[1])).padStart(2, '0')}`;
  return NEBRASKA_HHG_LICENSEES.find((row) => row.license === license) ?? null;
}

/** NE-MOVE-001. The PSC licensee table is current household-goods authority evidence. */
export const NEBRASKA_MOVE_SNAPSHOT = {
  regulator: 'Nebraska Public Service Commission',
  licenseesUrl: 'https://psc.nebraska.gov/household-goods-movers-licensees',
  applicationUrl: 'https://psc.nebraska.gov/sites/psc.nebraska.gov/files/doc/HGM%20Carrier%20Application%20Packet-%20July%202021.pdf',
  renewalUrl: 'https://psc.nebraska.gov/sites/psc.nebraska.gov/files/doc/License%20Renewal%20Application.pdf',
  statuteUrl: 'https://nebraskalegislature.gov/laws/statutes.php?statute=75-301',
  pageSha256: 'e185c07b54ac2a938738f96b6513f31278dc3943fb788dc02a616f9f9150a3cb',
  pageBytes: 76534,
  httpLastModified: '2026-10-06T15:35:45Z',
  retrievedAt: '2026-10-06',
  generatedAt: '2026-10-06T16:10:00Z',
  listingRows: NEBRASKA_HHG_LICENSEES.length,
  distinctLicenses: new Set(NEBRASKA_HHG_LICENSEES.map((row) => row.license)).size,
  licenseFeeUsd: 250,
  feeIsAuthority: false,
  licenseTerm: 'one year from the effective date',
  expirationColumn: 'NOT_PRINTED',
  rateSettingEnded: '2021-07-01',
  tariffCorpus: 'NOT_ACQUIRED',
  providerInsuranceStatus: 'NOT_ACQUIRED',
  orderCorpus: 'NOT_ACQUIRED',
  singlePublishedOrder: {
    docket: 'MCC-3199',
    dated: '2023-02-22',
    subject: 'Unlicensed intrastate household-goods service by an out-of-state mover',
    joinedToLicenseeRow: false,
  },
  usdotBridges: null,
  fmcsaIsStateAuthority: false,
  newCanonicalOrganizations: 0,
  graphWrites: 0,
  claimEligibilityChanges: 0,
  rows: NEBRASKA_HHG_LICENSEES,
} as const;
