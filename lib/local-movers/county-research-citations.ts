import {
  containsResearchArtifact,
  sanitizeCountyResearchText,
} from '@/lib/local-movers/county-research-sanitizer';
import { getStateDotCitationList } from '@/lib/local-movers/state-dot-citations';

export const CENSUS_SOURCE = 'U.S. Census Bureau QuickFacts';
export const FMCSA_SOURCE = 'FMCSA licensing database (fmcsa.gov)';
export const DIRECTORY_RESEARCH_SOURCE = 'Move Trust Hub independent directory research';

const INLINE_CITATION_MARKERS = [
  /census/i,
  /quickfacts/i,
  /fmcsa/i,
  /bbb/i,
  /move trust hub verified/i,
  /move trust hub independent/i,
  /sources:/i,
  /department of transportation/i,
  /\bdot\b/i,
  /fdot/i,
  /caltrans/i,
  /consumer affairs/i,
];

const POPULATION_CLAIM = /\b\d[\d,.]*\s*(?:million|m\+|k\+|residents|population)\b/i;
const LICENSING_CLAIM =
  /\b(fmcsa|usdot|mc\s*#|operating authority|licensed carrier|authority status)\b/i;

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
  if (!text.trim() || sources.length === 0) return text;
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

/** Market / logistics research — Census, state DOT, directory notes. Not FMCSA by default. */
export function buildMarketResearchSources(stateSlug?: string): string[] {
  const sources = [CENSUS_SOURCE, DIRECTORY_RESEARCH_SOURCE];
  if (stateSlug) {
    for (const dot of getStateDotCitationList(stateSlug)) {
      if (!sources.includes(dot)) sources.push(dot);
    }
  }
  return sources;
}

export function buildCitationSources(stateSlug?: string): string[] {
  // Backward-compatible name — market research sources (no blanket FMCSA).
  return buildMarketResearchSources(stateSlug);
}

function sourcesForTip(tip: string): string[] {
  if (LICENSING_CLAIM.test(tip)) return [FMCSA_SOURCE];
  return [DIRECTORY_RESEARCH_SOURCE];
}

function sourcesForCostNote(note: string): string[] {
  if (LICENSING_CLAIM.test(note)) return [FMCSA_SOURCE, 'local carrier estimates'];
  return ['local carrier estimates', DIRECTORY_RESEARCH_SOURCE];
}

export function applyCountyResearchCitations<T extends CitableResearch>(
  research: T,
  stateSlug?: string
): T {
  const marketSources = buildMarketResearchSources(stateSlug);

  const marketNotes = appendMandatorySourceBlock(
    stripUncitedPopulationClaims(sanitizeCountyResearchText(research.marketNotes) ?? ''),
    marketSources
  );

  const costs = research.costs
    ? {
        ...research.costs,
        note: appendMandatorySourceBlock(
          stripUncitedPopulationClaims(
            sanitizeCountyResearchText(research.costs.note) ??
              'Local pricing varies by inventory, access, and season.'
          ),
          sourcesForCostNote(research.costs.note ?? '')
        ),
      }
    : research.costs;

  const tips = research.tips?.map((tip) => {
    const cleaned =
      stripUncitedPopulationClaims(sanitizeCountyResearchText(tip) ?? '') ?? '';
    return appendMandatorySourceBlock(cleaned, sourcesForTip(cleaned));
  });

  const faqExtras = research.faqExtras?.map((item) => {
    const cleaned =
      stripUncitedPopulationClaims(sanitizeCountyResearchText(item.answer) ?? '') ?? '';
    const sources = LICENSING_CLAIM.test(cleaned)
      ? [FMCSA_SOURCE, ...marketSources.filter((s) => s !== FMCSA_SOURCE)]
      : marketSources;
    return {
      ...item,
      answer: appendMandatorySourceBlock(cleaned, sources),
    };
  });

  return {
    ...research,
    marketNotes,
    costs,
    tips,
    faqExtras,
  };
}
