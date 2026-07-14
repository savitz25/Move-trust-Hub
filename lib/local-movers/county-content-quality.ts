import { hasCitedCountyResearchContent } from '@/lib/local-movers/county-research-citations';
import { getCountyResearch, getRawCountyResearch } from '@/lib/local-movers/county-research';

export const BATCH_FMCSA_TIP =
  'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews';

export type CountyContentTier =
  | 'runtime_programmatic_shell'
  | 'batch_template_research'
  | 'grok_heavy_original';

/** Rigid 5-tip batch structure used across most state research files. */
export function isBatchTemplateCountyResearch(
  stateSlug: string,
  countySlug: string
): boolean {
  const research = getRawCountyResearch(stateSlug, countySlug);
  const tips = research?.tips ?? [];
  if (tips.length < 4) return false;

  const firstVerify = tips[0]?.startsWith('Verify coverage for');
  const lastFmcsa = tips[tips.length - 1]?.startsWith(BATCH_FMCSA_TIP);
  const bookEarly = tips.some((t) => /Book early for peak seasons/i.test(t));
  const insurance = tips.some((t) => /Confirm insurance for/i.test(t));

  return Boolean(firstVerify && lastFmcsa && bookEarly && insurance);
}

export function classifyCountyContentTier(
  stateSlug: string,
  countySlug: string,
  hasResearch: boolean
): CountyContentTier {
  if (!hasResearch) return 'runtime_programmatic_shell';
  const research = getCountyResearch(stateSlug, countySlug);
  if (isBatchTemplateCountyResearch(stateSlug, countySlug)) {
    return 'batch_template_research';
  }
  if (hasCitedCountyResearchContent(research)) {
    return 'grok_heavy_original';
  }
  return 'batch_template_research';
}