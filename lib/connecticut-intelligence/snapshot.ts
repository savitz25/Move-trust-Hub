import roster from '@/data/connecticut/ct-move-001/ctdot-hhg-2026.json';
import sources from '@/data/connecticut/ct-move-001/sources.json';

export const CONNECTICUT_MOVE_SNAPSHOT = {
  version: 'ct-move-001-v1',
  regulator: sources.regulator,
  rosterSource: roster.sourcePage,
  rosterWorkbook: roster.sourceUrl,
  rosterYear: roster.rosterYear,
  sourcePublicationDate: roster.sourcePublicationDate,
  sourceFileLastModifiedHttp: roster.sourceLastModifiedHttp,
  retrievedAt: roster.retrievedAt,
  generatedAt: roster.generatedAt,
  elicenseVerifiedAt: null,
  rosterRows: roster.rowCount,
  sourceAnnouncedTotal: roster.sourceAnnouncedTotal,
  distinctCertificates: roster.distinctCertificates,
  duplicateCertificateRows: roster.duplicateCertificateRows,
  printedUsdotRows: roster.rowsWithPrintedUsdot,
  distinctPrintedUsdot: roster.distinctPrintedUsdot,
  printedMcRows: roster.rowsWithPrintedMc,
  rowsWithoutPrintedFederalIdentifier: roster.rowsWithoutPrintedFederalIdentifier,
  rows: roster.rows,
  elicenseUrl: sources.elicense.url,
  elicenseCode: sources.elicense.household_goods_code,
  regulatoryUrl: sources.tariff.url,
  finalDecisionsUrl: sources.enforcement.url,
  graphWrites: sources.graph_writes,
  newCanonicalOrganizations: sources.new_canonical_organizations,
  claimEligibilityChanges: sources.claim_eligibility_changes,
  providerComplaintRows: null,
  providerEnforcementRows: null,
  carrierTariffDocuments: null,
} as const;

export function lookupCtHhgCertificate(raw: string) {
  const match = raw.trim().toUpperCase().match(/^(?:HG)?\s*(\d{1,5})$/);
  if (!match) return [];
  const certificate = `HG${match[1]}`;
  return CONNECTICUT_MOVE_SNAPSHOT.rows.filter((row) => row.ctdotCertificate === certificate);
}
