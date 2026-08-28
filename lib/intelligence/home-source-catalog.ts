import type { MoveHomeSource } from './home-types';

export const MOVE_HOME_SOURCE_CATALOG: MoveHomeSource[] = [
  {
    id: 'mth_directory',
    agency: 'MoveTrustHub',
    label: 'Research directory (consumer-visible profiles)',
    whatItContains:
      'Published mover profiles on MoveTrustHub. Consumer-visible rows are those not in fail-closed internal publication states (REVIEW_REQUIRED, INACTIVE, INGESTED, CLASSIFIED). Legacy rows with a null publication_state remain visible.',
    coveragePeriod: 'Current directory rows; clocked by latest fmcsa_last_checked on the cohort when present',
    limitation:
      'Not the complete FMCSA universe. Not “all movers in America.” Publication is a research-directory grain, not a national census.',
    sourceUrl: 'https://www.movetrusthub.com/companies',
  },
  {
    id: 'fmcsa_directory_flags',
    agency: 'Federal Motor Carrier Safety Administration',
    label: 'FMCSA identity and authority flags on directory profiles',
    whatItContains:
      'USDOT / MC identifiers, entity type, and authority_active as stored on directory companies from FMCSA refresh. Null authority_active is unknown, not inactive.',
    coveragePeriod: 'As refreshed on company rows (fmcsa_last_checked)',
    limitation:
      'Attached to the directory cohort, not a full FMCSA census. Active authority is a regulatory fact, not a TrustHub endorsement. Inspection, crash, complaint-trend, and insurance-on-file censuses are not published on the national homepage.',
    sourceUrl: 'https://safer.fmcsa.dot.gov/',
  },
  {
    id: 'site_state_landings',
    agency: 'MoveTrustHub',
    label: 'State research landings',
    whatItContains:
      'Editorial local-movers landing pages for U.S. states and Washington, D.C.',
    coveragePeriod: 'Current site inventory (code)',
    limitation:
      'A landing page is not a mover count and is not a quality or safety score. Color on the browse map does not mean quality.',
    sourceUrl: 'https://www.movetrusthub.com/local-movers',
  },
];
