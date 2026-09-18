export const SEARCH_QUERY_MAX_LENGTH = 80;
export const SEARCH_SUGGESTION_COMPANY_LIMIT = 8;
export const SEARCH_SUGGESTION_PLACE_LIMIT = 2;
export const SEARCH_ALL_CANDIDATE_LIMIT = 250;
export const SEARCH_TEXT_THRESHOLD = 2;
export const SEARCH_NUMERIC_THRESHOLD = 3;

export type SearchIntentKind =
  | 'REGULATORY_IDENTIFIER'
  | 'COMPANY_IDENTITY'
  | 'PLACE'
  | 'UNKNOWN';

export type IdentifierNamespace = 'DOT' | 'MC' | 'BARE';

export type SearchMatchType =
  | 'exact_usdot'
  | 'exact_mc'
  | 'exact_display_name'
  | 'exact_legal_name'
  | 'exact_alias'
  | 'display_prefix'
  | 'legal_prefix'
  | 'token_prefix'
  | 'similar_name'
  | 'substring'
  | 'headquarters_hint'
  | 'local_research'
  | 'recorded_hq_city'
  | 'recorded_hq_state_broader';

export type SearchMatchTier = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type ClassifiedSearchQuery = {
  raw: string;
  normalized: string;
  intent: SearchIntentKind;
  identifier: {
    namespace: IdentifierNamespace;
    digits: string;
    display: string;
  } | null;
  companyQuery: string;
  locationHint: {
    city: string | null;
    stateCode: string | null;
    label: string;
  } | null;
  /**
   * TH-DISCOVERY-PARITY-001A: true when companyQuery is PURELY generic
   * mover-category vocabulary ("movers", "moving companies", "long distance
   * mover", "relocation company", ...) with no distinguishing brand-like
   * token left over -- a DISCOVERY request ("find movers near X"), not a
   * search for one specific company that happens to have a category word in
   * its name. Used to require genuine recorded-headquarters geography
   * agreement instead of letting incidental company-NAME text collisions
   * with the place name (e.g. a company literally named "Denver Moving"
   * headquartered in Plano, TX) blend into a place-scoped result set.
   */
  categoryOnly: boolean;
};

export type SearchCompanyHit = {
  companyId: string;
  slug: string;
  displayName: string;
  legalName: string | null;
  headquarters: string;
  usdot: string;
  mc: string;
  role: string;
  authorityStatus: string | null;
  matchType: SearchMatchType;
  matchTier: SearchMatchTier;
  matchExplanation: string;
  /** Public FMCSA source clock already shown on company research profiles. */
  sourceLastChecked?: string | null;
};

export type SearchPlaceHit = {
  kind: 'city' | 'county' | 'state';
  label: string;
  href: string;
  explanation: string;
};

export type SearchVerificationAction = {
  href: string;
  label: string;
  identifierDisplay: string;
} | null;

export type MoverSearchResponse = {
  query: string;
  intent: SearchIntentKind;
  results: SearchCompanyHit[];
  placeResults: SearchPlaceHit[];
  verificationAction: SearchVerificationAction;
  exactNameGroupSize: number;
  directJumpSlug: string | null;
  ambiguity: boolean;
  resultCount: number;
  latencyMs: number;
  dbMs: number;
  candidateCount: number;
  searchPath: string;
};
