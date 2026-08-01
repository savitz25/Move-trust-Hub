import { buildCompanySlugBase } from '@/lib/utils/company-slug';
import { preferPublicCompanyName } from '@/lib/companies/public-display-name';

/**
 * Client-safe pending queue row shape.
 * Keep this out of server-only modules so admin client islands never import `server-only`.
 */
export type PendingSuggestion = {
  id: string;
  name: string;
  usdot: string | null;
  mc_number: string | null;
  details: string | null;
  suggested_by_name: string | null;
  suggested_by_email: string | null;
  legal_name: string | null;
  headquarters: string | null;
  phone: string | null;
  authority_status: string | null;
  source_page: string | null;
  fmcsa_preview: Record<string, unknown> | null;
  fmcsa_raw: Record<string, unknown> | null;
  google_data: Record<string, unknown> | null;
  public_scrape_data: Record<string, unknown> | null;
  service_scope?: string | null;
  selected_counties?: unknown;
  created_at: string;
};

/** Client-safe subset used by admin orphan repair UI. */
export type OrphanedApprovedSuggestion = {
  id: string;
  name: string;
  usdot: string | null;
  legal_name: string | null;
  company_id: string | null;
  created_at: string;
  status?: string;
};

export function predictedProfileSlugForSuggestion(
  suggestion: Pick<OrphanedApprovedSuggestion, 'name' | 'legal_name' | 'usdot'>
): string {
  const publicName = preferPublicCompanyName({
    legalName: suggestion.legal_name,
    // name is already the public/DBA-preferred label on new suggestions
    fallback: suggestion.name,
  });
  return buildCompanySlugBase({
    name: publicName || suggestion.name,
    usdot: suggestion.usdot,
  });
}