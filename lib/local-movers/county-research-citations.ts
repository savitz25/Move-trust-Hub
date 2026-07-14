import {
  containsResearchArtifact,
  sanitizeCountyResearchText,
} from '@/lib/local-movers/county-research-sanitizer';
import { getStateDotCitationList } from '@/lib/local-movers/state-dot-citations';

export const CENSUS_SOURCE = 'U.S. Census Bureau QuickFacts';
export const FMCSA_SOURCE = 'FMCSA licensing database (fmcsa.gov)';

const INLINE_CITATION_MARKERS = [
  /census/i,
  /quickfacts/i,
  /fmcsa/i,
  /bbb/i,
  /move trust hub verified/i,
  /sources:/i,
  /department of transportation/i,
  /\bdot\b/i,
  /fdot/i,
  /caltrans/i,
];

const POPULATION_CLAIM = /\b\d[\d,.]*\s*(?:million|m\+|k\+|residents|population)\b/i;

type CitableResearch = {
  marketNotes?: string;
  tips?: string[];
  costs?: { note?: string };
  faqExtras?: Array<{ question: string; answer: string }>;
};

export function textHasInlineCitation(text: string): boolean {
  return INLINE_CITATION_MARKERS.some((marker) => marker.test(text));
}

/** Population or statistical claims require an explicit Census citation nearby. */
export function stripUncitedPopulationClaims(text: string): string {
  if (!POPULATION_CLAIM.test(text)) return text;
  if (textHasInlineCitation(text)) return text;

  return text
    .replace(
      /[^.]*\b\d[\d,.]*\s*(?:million|m\+|k\+|residents|population)\b[^.]*\./gi,
      ''
    )
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export function appendMandatorySourceBlock(text: string, sources: string[]): string {
  const block = ` Sources: ${sources.join('; ')}.`;
  if (textHasInlineCitation(text) && /sources:/i.test(text)) return text;
  return `${text.replace(/\s+$/, '')}${block}`;
}

export function hasCitedCountyResearchContent(research: CitableResearch | undefined): boolean {
  if (!research?.marketNotes) return false;
  if (containsResearchArtifact(research.marketNotes)) return false;
  if (containsResearchArtifact(research.costs?.note ?? '')) return false;
  if ((research.tips ?? []).some((tip) => containsResearchArtifact(tip))) return false;

  const notes = research.marketNotes;
  if (!textHasInlineCitation(notes) && !/sources:/i.test(notes)) return false;

  if (POPULATION_CLAIM.test(notes) && !/census|quickfacts/i.test(notes)) return false;

  return true;
}

export function buildCitationSources(stateSlug?: string): string[] {
  const sources = [CENSUS_SOURCE, FMCSA_SOURCE, 'Move Trust Hub verified listings'];
  if (stateSlug) {
    for (const dot of getStateDotCitationList(stateSlug)) {
      if (!sources.includes(dot)) sources.push(dot);
    }
  }
  return sources;
}

export function applyCountyResearchCitations<T extends CitableResearch>(
  research: T,
  stateSlug?: string
): T {
  const sources = buildCitationSources(stateSlug);

  const marketNotes = appendMandatorySourceBlock(
    stripUncitedPopulationClaims(sanitizeCountyResearchText(research.marketNotes) ?? ''),
    sources
  );

  const costs = research.costs
    ? {
        ...research.costs,
        note: appendMandatorySourceBlock(
          stripUncitedPopulationClaims(
            sanitizeCountyResearchText(research.costs.note) ??
              'Local pricing varies by inventory, access, and season.'
          ),
          [FMCSA_SOURCE, 'local carrier estimates']
        ),
      }
    : research.costs;

  const tips = research.tips?.map((tip) =>
    appendMandatorySourceBlock(
      stripUncitedPopulationClaims(sanitizeCountyResearchText(tip) ?? ''),
      [FMCSA_SOURCE]
    )
  );

  const faqExtras = research.faqExtras?.map((item) => ({
    ...item,
    answer: appendMandatorySourceBlock(
      stripUncitedPopulationClaims(sanitizeCountyResearchText(item.answer) ?? ''),
      sources
    ),
  }));

  return {
    ...research,
    marketNotes,
    costs,
    tips,
    faqExtras,
  };
}