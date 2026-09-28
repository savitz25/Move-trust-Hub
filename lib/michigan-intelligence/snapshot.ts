import roster from '@/data/michigan/mi-move-001/active-hhg-authorities.json';

export const MICHIGAN_MOVE_SNAPSHOT = {
  version: 'move-mi-state-intel-v1',
  regulator: 'Michigan State Police Commercial Vehicle Enforcement Division (CVED)',
  authoritySearch: roster.source,
  regulatoryPage: 'https://www.michigan.gov/msp/divisions/cved/regulatory',
  consumerGuide: 'https://www.michigan.gov/msp/divisions/cved/regulatory/key-tips-to-protecting-your-household-goods-move',
  investigationPage: 'https://www.michigan.gov/msp/divisions/cved/investigation-unit',
  retrievedAt: roster.retrieved_at,
  sourceAsOf: roster.source_as_of,
  activeHhgAuthorityRows: roster.rows.length,
  distinctCvedNumbers: new Set(roster.rows.map((row) => row.cvedNumber)).size,
  printedUsdotBridges: roster.rows.filter((row) => row.usDotNumber).length,
  distinctPrintedUsdot: new Set(roster.rows.map((row) => row.usDotNumber).filter(Boolean)).size,
  printedFederalMotorCarrierBridges: roster.rows.filter((row) => row.federalMotorCarrierNumber).length,
  rows: roster.rows,
  graphWrites: 0,
  newCanonicalOrganizations: 0,
  providerComplaintRows: null,
  providerEnforcementOutcomes: null,
  tariffDocuments: null,
} as const;
