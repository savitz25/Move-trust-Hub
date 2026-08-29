export { classifySearchQuery } from '@/lib/search/classify-intent';
export {
  SEARCH_STOPWORDS,
  authorityStatusLabel,
  compareIdentityCompanies,
  explainMatch,
  matchCompanyIdentity,
  roleLabel,
  textualIdentityScore,
  uniqueExactIdentity,
} from '@/lib/search/match';
export { boundSearchQuery, digitsOnly, normalizeSearchText } from '@/lib/search/normalize';
export { placeResultsForQuery } from '@/lib/search/place-results';
export type {
  ClassifiedSearchQuery,
  MoverSearchResponse,
  SearchCompanyHit,
  SearchIntentKind,
} from '@/lib/search/types';
export {
  SEARCH_QUERY_MAX_LENGTH,
  SEARCH_SUGGESTION_COMPANY_LIMIT,
  SEARCH_TEXT_THRESHOLD,
  SEARCH_NUMERIC_THRESHOLD,
} from '@/lib/search/types';
