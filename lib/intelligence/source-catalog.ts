import type { IntelligenceEvidenceSource } from './payload-types';

export const FLORIDA_MOVE_SOURCE_CATALOG: IntelligenceEvidenceSource[] = [
  {
    id: 'fdacs_im',
    agency: 'Florida Department of Agriculture and Consumer Services',
    label: 'FDACS intrastate mover registrations',
    whatItContains:
      'Intrastate household-goods mover registrations (IM), status, and business identity fields as exported from the official lookup.',
    coveragePeriod: 'Current registry snapshot (historical applications not fully acquired)',
    observationCount: null,
    attributionStatus: 'Registration rows stored; company linkage only when VERIFIED',
    limitation:
      'Not a complaint or enforcement census. Not every registration has a public MoveTrustHub profile.',
    lastExtractedAt: null,
    sourceUrl: 'https://csapp.fdacs.gov/cspublicapp/businesssearch/businesssearch.aspx',
    cadence: 'Controlled extracts; FL-012 ingest freeze until 2026-09-05',
  },
  {
    id: 'fdacs_mb',
    agency: 'Florida Department of Agriculture and Consumer Services',
    label: 'FDACS moving-broker registrations',
    whatItContains: 'Moving broker (MB) registration rows distinct from IM carrier registrations.',
    coveragePeriod: 'Current registry snapshot',
    observationCount: null,
    attributionStatus: 'Registration rows stored; public broker chrome not claimed',
    limitation: 'Small population. Unresolved rows are not published as companies.',
    lastExtractedAt: null,
    sourceUrl: 'https://csapp.fdacs.gov/cspublicapp/businesssearch/businesssearch.aspx',
    cadence: 'Controlled extracts',
  },
  {
    id: 'fmcsa',
    agency: 'Federal Motor Carrier Safety Administration',
    label: 'FMCSA directory identity & authority flags',
    whatItContains:
      'USDOT / MC identifiers, allowed-to-operate / authority_active flags, and safety-rating field on directory companies.',
    coveragePeriod: 'As refreshed on company rows (fmcsa_last_checked)',
    observationCount: null,
    attributionStatus: 'Attached to the directory company, not to FDACS IM by default',
    limitation:
      'Safety rating is currently Not Rated for the live directory census. Inspection and crash censuses are not published as Florida Intelligence metrics. Inspection volume is not quality.',
    lastExtractedAt: null,
    sourceUrl: 'https://safer.fmcsa.dot.gov/',
    cadence: 'Company-level FMCSA refresh jobs',
  },
  {
    id: 'fdot',
    agency: 'Florida Department of Transportation',
    label: 'FDOT',
    whatItContains: 'No mover-specific bulk dataset is currently contributing to this page.',
    coveragePeriod: 'n/a',
    observationCount: 0,
    attributionStatus: 'Not loaded',
    limitation:
      'USDOT existence is not a reason to ingest unrelated trucking data. FDOT is listed for transparency.',
    lastExtractedAt: null,
    sourceUrl: 'https://www.fdot.gov/',
    cadence: 'Not contributing',
  },
];
