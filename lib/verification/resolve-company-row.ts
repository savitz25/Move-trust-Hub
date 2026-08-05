/**
 * DB-row → enrichment resolvers used by companies.mapRow.
 * Implementation lives in display-enrichment (single source of truth).
 */
export {
  resolveGoogleDataFromRow,
  resolvePublicScrapeFromRow,
  sanitizeGooglePlacesForDisplay,
  isDisplayableGoogleForUi,
} from '@/lib/verification/display-enrichment';
