import { buildCompanySlugBase } from '@/lib/utils/company-slug';
import { preferPublicCompanyName } from '@/lib/companies/public-display-name';

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