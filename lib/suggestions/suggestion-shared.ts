import { buildCompanySlugBase } from '@/lib/utils/company-slug';

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
  return buildCompanySlugBase({
    name: suggestion.legal_name || suggestion.name,
    usdot: suggestion.usdot,
  });
}