import type { CountyCostGuide } from '@/lib/local-movers/county-seo';
import { getStateDotSource } from '@/lib/local-movers/state-dot-citations';
import type { DeepCountyFaqItem, DeepCountyResearch } from '@/data/deep-county-research/types';

export type BaseCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

const CENSUS_MIGRATION_NOTE =
  ' U.S. Census Bureau domestic migration and housing-turnover data inform seasonal demand in this market.';

const INDEPENDENT_DIRECTORY_NOTE =
  ' Move Trust Hub is an independent directory — compare FMCSA-licensed carriers and verify quotes directly.';

/** Build optional metro FAQ for Phase 3 deep guides. */
export function buildMetroFaq(
  stateSlug: string,
  countySlug: string,
  countyLabel: string
): DeepCountyFaqItem[] {
  const dot = getStateDotSource(stateSlug);
  return [
    {
      question: `What should I verify before hiring movers in ${countyLabel}?`,
      answer: `Confirm active FMCSA authority, current insurance certificates, and written binding or non-binding estimates. ${dot ? `${dot} may apply for certain truck routes. ` : ''}Use multiple independent quotes — directory listings are not endorsements.`,
    },
  ];
}

export function enrichStateResearchToDeep(
  base: BaseCountyResearch,
  stateSlug: string,
  options?: { faqExtras?: DeepCountyFaqItem[] }
): DeepCountyResearch {
  const dot = getStateDotSource(stateSlug);
  const dotNote = dot ? ` ${dot} may apply for oversize trucks and certain intrastate corridors.` : '';

  const tips = [...base.tips];
  const fmcsaTip =
    'Re-verify FMCSA authority, insurance limits, and BBB complaints at booking — cited cost ranges are market estimates, not quotes.';
  if (!tips.some((t) => /fmcsa/i.test(t))) {
    tips.push(fmcsaTip);
  }

  return {
    marketNotes: `${base.marketNotes}${CENSUS_MIGRATION_NOTE}${dotNote}${INDEPENDENT_DIRECTORY_NOTE}`,
    costs: {
      ...base.costs,
      note: `${base.costs.note} Ranges reflect FMCSA-licensed carrier market data — obtain written estimates for your inventory.`,
    },
    tips,
    faqExtras: options?.faqExtras,
  };
}

/** Promote all entries from a state research map into deep research records. */
export function promoteStateResearchMap(
  stateSlug: string,
  researchMap: Record<string, BaseCountyResearch>,
  metroSlugs: ReadonlySet<string> = new Set(),
  countyLabels: Record<string, string> = {}
): Record<string, DeepCountyResearch> {
  return Object.fromEntries(
    Object.entries(researchMap).map(([countySlug, research]) => [
      countySlug,
      enrichStateResearchToDeep(research, stateSlug, {
        faqExtras: metroSlugs.has(countySlug)
          ? buildMetroFaq(
              stateSlug,
              countySlug,
              countyLabels[countySlug] ?? countySlug.replace(/-/g, ' ')
            )
          : undefined,
      }),
    ])
  );
}